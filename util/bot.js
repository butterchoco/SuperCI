const puppeteer = require("puppeteer");
const { performance } = require("perf_hooks");

class PuppeteerManager {
  constructor(browser, page, secret) {
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

  startBot = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.login();
        await this.attackIRSPage();
        resolve(this.message);
      } catch (e) {
        console.log(e);
        console.log("BOT FAILED");
        reject("Gagal karena alasan yang tidak menentu.");
      }
    });
  };

  login = async () => {
    console.log("GOTO: Login");
    await this.loginGoto();
    await this.deleteCookie();
    let cookies = { siakng_cc: null };
    while (cookies["siakng_cc"] === null) {
      await this.reload();
      cookies = await this.getCredential();
    }
  };

  loginGoto = async () => {
    let LoginPage = await this.goto(
      "https://academic.ui.ac.id/main/Authentication/"
    );
    while (!LoginPage.includes("NextGeneration")) {
      console.log("Reloading Login Page....");
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
    return await this.getCookie();
  };

  isNeedRelogin = (IRSPage, count) => {
    return (
      IRSPage.includes("Term 3") ||
      IRSPage.includes("No role") ||
      count % 100 === 0
    );
  };

  attackIRSPage = async () => {
    console.log("GOTO: Ubah IRS");
    let IRSPage = await this.goto(
      "https://academic.ui.ac.id/main/CoursePlan/CoursePlanEdit"
    );
    let count = 0;
    while (!IRSPage.includes("Daftar Mata Kuliah yang Ditawarkan")) {
      console.log("Reloading IRS Page....");
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
        console.log("NOT FOUND: " + subject);
        SubjectNotFound += `<li>${subject}</li>`;
      }
      console.log("FINISHED CHECKING: " + subject);
    }
    return SubjectNotFound;
  };

  isiIRS = async () => {
    const t0 = performance.now();
    console.log("CHECKING: Subject");
    const SubjectNotFound = await this.checkingSubject();

    console.log("SUBMITING: Subject");
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
      console.log("BOT FINISHED");
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
      console.log(e);
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
      console.log(e);
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

  getCookie = async () => {
    const cookies = await this.page.cookies();
    return JSON.stringify(cookies);
  };

  deleteCookie = async () => {
    const client = await this.page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
  };
}

const bot = (secret) => {
  return new Promise(async (resolve, reject) => {
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
    const pupMan = new PuppeteerManager(browser, page, secret);
    pupMan
      .startBot()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = bot;
