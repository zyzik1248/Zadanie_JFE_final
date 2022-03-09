const path = require("path");
const Koa = require("koa");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const getPort = require("get-port");
const Router = require("koa-router");
const channels = require('./../static/channels.json')

async function runServer() {
  const port = await getPort({ port: 3000 });
  const router = new Router();
  const app = new Koa();

  router.get("/channels", (ctx) => {
    ctx.body = channels;
  });

  app
    .use(router.allowedMethods())
    .use(router.routes())
    .use(koaBody())
    .use(koaStatic(path.join(__dirname, "..", "static")));

  app.listen(port);

  console.log(`server started at http://localhost:${port}/`);
}

runServer().catch(console.error);
