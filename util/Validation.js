function minCharLength(data, len) {
  return data.length >= len;
}

function minValLength(data, len) {
  return data >= len;
}

function isRequired(data) {
  return data !== null && data !== undefined && data !== "";
}

function isEmail(data) {
  return data.includes("@") && data.split("@")[1].includes(".");
}

function hasLowerCase(data) {
  const lowercaseCharPassword = new RegExp("^(?=.*[a-z])");
  return lowercaseCharPassword.test(data);
}

function hasUpperCase(data) {
  const uppercaseCharPassword = new RegExp("^(?=.*[A-Z])");
  return uppercaseCharPassword.test(data);
}

function hasNumericCase(data) {
  const numericCharPassword = new RegExp("^(?=.*[0-9])");
  return numericCharPassword.test(data);
}

function hasSpecialCase(data) {
  const specialCharPassword = new RegExp("^(?=.*[!@#$%^&*()])");
  return specialCharPassword.test(data);
}

function isSameAs(data, dataCompare) {
  return data === dataCompare;
}

class Validation {
  constructor(data, language = "id") {
    this.allData = data;
    for (const field in data) {
      this[field] = data[field];
      this[field].name = field;
      this[field].error = "";
      this[field].allData = Object.keys(this.allData).map((data) => {
        return { name: data, value: this.allData[data].value };
      });
      this[field].touch = function () {
        for (const node of this.validate) {
          const validation = node.split("-");
          if (validation[0] === "required") this.checkIsRequired();
          else if (validation[0] === "isEmail") this.checkIsEmail();
          else if (validation[0] === "minCharLength")
            this.checkMinCharLength(validation[1]);
          else if (validation[0] === "minValLength")
            this.checkMinValLength(validation[1]);
          else if (validation[0] === "hasLowerCase")
            this.checkHasLowerCase(validation[1]);
          else if (validation[0] === "hasUpperCase")
            this.checkHasUpperCase(validation[1]);
          else if (validation[0] === "hasNumericCase")
            this.checkHasNumericCase(validation[1]);
          else if (validation[0] === "hasSpecialCase")
            this.checkHasSpecialCase(validation[1]);
          else if (validation[0] === "sameAs") {
            const data = this.allData.find(
              ({ name }) => name === validation[1]
            );
            this.checkIsSameAs(data);
          }
        }
      };
      this[field].checkIsRequired = function () {
        if (!isRequired(this.value)) {
          const message = `Field ${this.name} harus diisi terlebih dahulu`;
          if (this.error === "") {
            this.error = message;
          }
        }
      };

      this[field].checkMinCharLength = function (len) {
        if (!minCharLength(this.value, len)) {
          const message = `Field ${this.name} setidaknya memiliki ${len} karakter`;
          if (this.error === "") {
            this.error = message;
          }
        }
      };

      this[field].checkMinValLength = function (len) {
        if (!minValLength(this.value, len)) {
          const message = `Field ${this.name} setidaknya memiliki nilai sebanyak ${len}`;
          if (this.error === "") {
            this.error = message;
          }
        }
      };

      this[field].checkIsEmail = function () {
        if (!isEmail(this.value)) {
          const message = `Field ${this.name} harus memiliki format yang valid`;
          if (this.error === "") {
            this.error = message;
          }
        }
      };

      this[field].checkHasLowerCase = function () {
        if (!hasLowerCase(this.value)) {
          const message = `Field ${this.name} setidaknya memiliki satu huruf kecil`;
          if (this.error === "") {
            this.error = message;
          }
        }
      };

      this[field].checkHasUpperCase = function () {
        if (!hasUpperCase(this.value)) {
          const message = `Field ${this.name} setidaknya memiliki satu huruf kapital`;
          if (this.error === "") {
            this.error = message;
          }
        }
      };

      this[field].checkHasNumericCase = function () {
        if (!hasNumericCase(this.value)) {
          const message = `Field ${this.name} setidaknya memiliki satu angka`;
          if (this.error === "") {
            this.error = message;
          }
        }
      };

      this[field].checkHasSpecialCase = function () {
        if (!hasSpecialCase(this.value)) {
          const message = `Field ${this.name} setidaknya memiliki satu simbol`;
          if (this.error === "") {
            this.error = message;
          }
        }
      };

      this[field].checkIsSameAs = function (data) {
        if (!isSameAs(this.value, data.value)) {
          const message = `Pastikan field ${data.name} harus sama dengan field ${this.name}`;
          if (this.error === "") {
            this.error = message;
          }
        }
      };
    }
  }

  touch() {
    return new Promise((resolve, reject) => {
      const error = {};
      for (const field in this.allData) {
        this[field].touch();
        error[field] = this[field].error;
      }
      if (Object.values(error).length > 0) reject(error);
      else resolve("Sukses");
    });
  }
}

module.exports = {
  Validation,
  minCharLength,
  minValLength,
  isEmail,
  hasLowerCase,
  hasUpperCase,
  hasNumericCase,
  hasSpecialCase,
  isSameAs,
};
