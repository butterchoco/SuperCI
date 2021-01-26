class AppHandler {
    constructor(req, res, basePath) {
      this.path = req.url;
      this.method = req.method;
      this.req = req;
      this.handle = res;
      this.basePath = basePath;
    }
    
    get(path, controller) {
      this.path === this.basePath + path && this.method === "GET" ? controller(this.handle) : null
    }
    
    post(path, controller) {
      if (this.path === this.basePath + path && this.method === "POST") {
        const body = [];
        this.req.on("data", (chunk) => {
          body.push(chunk);
        });
        return this.req.on("end", () => {
          const buffer = Buffer.concat(body).toString()
          const response = JSON.parse(buffer)
          controller(this.handle, response)
        })
      }
    }

}

module.exports = AppHandler;