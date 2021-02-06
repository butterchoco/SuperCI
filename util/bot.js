const puppeteer = require("puppeteer");
const { performance } = require("perf_hooks");

class PuppeteerManager {
  constructor(browser, page, socket, secret) {
    this.socket = socket;
    this.message = "";
    this.secret = secret;
    this.browser = browser;
    this.page = page;
    this.init();
  }

  init = async () => {
    const blockedResourceTypes = [
      "image",
      "media",
      "font",
      "texttrack",
      "object",
      "beacon",
      "csp_report",
      "imageset",
      "stylesheet",
      "font",
    ];

    const skippedResources = [
      "quantserve",
      "adzerk",
      "doubleclick",
      "adition",
      "exelator",
      "sharethrough",
      "cdn.api.twitter",
      "google-analytics",
      "googletagmanager",
      "google",
      "fontawesome",
      "facebook",
      "analytics",
      "optimizely",
      "clicktale",
      "mixpanel",
      "zedo",
      "clicksor",
      "tiqcdn",
    ];

    await this.page.setRequestInterception(true);
    this.page.on("request", (request) => {
      const requestUrl = request._url.split("?")[0].split("#")[0];
      if (
        blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
        skippedResources.some((resource) => requestUrl.indexOf(resource) !== -1)
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });
  };

  startBot = async () => {
    try {
      await this.login();
      await this.attackIRSPage();
      this.socket.emit("bot.message", {
        title: "Progress",
        content: this.message,
      });
    } catch (e) {
      console.log(e);
      this.socket.emit("bot.message", {
        title: "Finished",
        content: "BOT FAILED",
      });
    }
  };

  login = async () => {
    this.socket.emit("bot.message", {
      title: "Progress...",
      content: "GOTO: Login",
    });
    await this.loginGoto();
    cookies = await this.getCredential();
  };

  loginGoto = async () => {
    let LoginPage = await this.goto(
      "https://academic.ui.ac.id/main/Authentication/"
    );
    while (!LoginPage.includes("NextGeneration")) {
      this.socket.emit("bot.message", {
        title: "Progress...",
        content: "Reloading Login Page....",
      });
      LoginPage = await this.reload();
      this.page.waitForSelector("div");
    }
  };

  getCredential = async () => {
    await this.page.evaluate((Secret) => {
      document.querySelector("input[name=u]").value = Secret.username;
      document.querySelector("input[name=p]").value = Secret.password;
      document.querySelector("[type=submit][value=Login]").click();
    }, this.secret);
    await this.page.waitForSelector("div");
    const pageSource = await this.getPageSource();
    if (pageSource.includes("Login Failed")) {
      this.message = "FIX YOUR USERNAME AND PASSWORD";
      this.browser.close();
    }
  };

  isNeedRelogin = (IRSPage, count) => {
    return (
      IRSPage.includes("Term 3") ||
      IRSPage.includes("No role") ||
      count % 100 === 0
    );
  };

  attackIRSPage = async () => {
    this.socket.emit("bot.message", {
      title: "Progress...",
      content: "GOTO: Ubah IRS",
    });
    let IRSPage = await this.goto(
      "https://academic.ui.ac.id/main/CoursePlan/CoursePlanEdit"
    );
    let count = 0;
    while (!IRSPage.includes("Daftar Mata Kuliah yang Ditawarkan")) {
      this.socket.emit("bot.message", {
        title: "Progress...",
        content: "Reloading IRS Page....",
      });
      if (isNeedRelogin(IRSPage, count)) {
        this.login();
      }
      IRSPage = await this.reload();
      this.page.waitForSelector("div");
      count++;
    }
    await this.isiIRS();
  };

  checkingSubject = async () => {
    var SubjectNotFound = "";
    for (const subject of this.secret.subject) {
      const isSubjectExist = await this.page.evaluate((subject) => {
        const labelSubject = document.evaluate(
          "//a[contains(text(), '" + subject + "')]/..",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (labelSubject === null) return false;

        const id = labelSubject.getAttribute("for");
        const inputSubject = document.getElementById(id);
        inputSubject.checked = true;
        return true;
      }, subject);
      if (!isSubjectExist) {
        this.socket.emit("bot.message", {
          title: "Progress...",
          content: "NOT FOUND: " + subject,
        });
        SubjectNotFound += `<li>${subject}</li>`;
      }
      this.socket.emit("bot.message", {
        title: "Progress...",
        content: "FINISHED CHECKING: " + subject,
      });
    }
    return SubjectNotFound;
  };

  isiIRS = async () => {
    const t0 = performance.now();
    this.socket.emit("bot.message", {
      title: "Progress...",
      content: "CHECKING: Subject",
    });
    const SubjectNotFound = await this.checkingSubject();

    this.socket.emit("bot.message", {
      title: "Progress...",
      content: "SUBMITING: Subject",
    });
    await this.page.click("[name='submit']");
    await this.page.waitForSelector("#ti_h", { timeout: 0 });

    const isFinish = await this.page.evaluate((SubjectNotFound) => {
      const pageSource = document.body.innerHTML;
      if (!pageSource.includes("IRS berhasil tersimpan!")) return false;
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.width = "100%";
      modal.style.background = "green";
      modal.style.color = "white";
      modal.style.padding = "10px";
      modal.innerHTML = `<strong>BOT SELESAI!!!</strong>${
        SubjectNotFound != ""
          ? "<p>Beberapa kelas tidak ditemukan:</p><ul>" +
            SubjectNotFound +
            "</ul>"
          : ""
      } <p>Cek kembali apakah kelas yang dipilih sudah benar!</p><p>AUTHOR: Chupasups</p>`;
      document.body.append(modal);
      return true;
    }, SubjectNotFound);

    if (isFinish) {
      const t1 = performance.now();
      this.socket.emit("bot.message", {
        title: "Progress...",
        content: "BOT FINISHED",
      });
      this.message =
        "Pengisian IRS berhasil diisi dalam waktu " +
        (t1 - t0) +
        " milliseconds.";
      this.browser.close();
    } else {
      await this.attackIRSPage();
    }
  };

  goto = async (path) => {
    let pageSource = "";
    try {
      const pagePromise = await this.page.goto(path, {
        waitUntil: "domcontentloaded",
        timeout: 0,
      });
      pageSource = await pagePromise.text();
    } catch (e) {
      this.socket.emit("bot.message", {
        title: "Progress...",
        content: "Reloading...",
      });
      await goto(path);
    } finally {
      return pageSource;
    }
  };

  reload = async () => {
    let pageSource = "";
    try {
      const pagePromise = await this.page.reload({
        waitUntil: "networkidle0",
        timeout: 0,
      });
      pageSource = await pagePromise.text();
    } catch (e) {
      this.socket.emit("bot.message", {
        title: "Progress...",
        content: "Reloading...",
      });
      await reload();
    } finally {
      return pageSource;
    }
  };

  getPageSource = async () => {
    return await this.page.evaluate(() => {
      return document.body.innerHTML;
    });
  };
}

const bot = async (socket, secret) => {
  const options = {
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--proxy-server='direct://'",
      "--proxy-bypass-list=*",
      "--window-size=1196x932",
    ],
    headless: !secret.gui,
  };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  const pupMan = new PuppeteerManager(browser, page, socket, secret);
  pupMan.startBot();
};

module.exports = bot;
