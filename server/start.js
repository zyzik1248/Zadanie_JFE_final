const path = require("path");
const Koa = require("koa");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const getPort = require("get-port");
const Router = require("koa-router");
const channels = require("./../static/channels.json");

function sortList(list, type, direction) {
  const l = list.slice();

  switch (type) {
    case 0:
      l.sort((a, b) =>
        direction == 1
          ? a.title < b.title
            ? -1
            : 1
          : a.title > b.title
          ? -1
          : 1
      );
      break;
    case 1:
      l.sort((a, b) => {
        let c1 = parseInt(a.statistics.subscriberCount.replace(/[^0-9]/g, ""));
        let c2 = parseInt(b.statistics.subscriberCount.replace(/[^0-9]/g, ""));
        return direction == 1 ? c2 - c1 : c1 - c2;
      });
      break;
    case 2:
      l.sort((a, b) => {
        let c1 = parseInt(a.statistics.videoCount.replace(/[^0-9]/g, ""));
        let c2 = parseInt(b.statistics.videoCount.replace(/[^0-9]/g, ""));
        return direction == 1 ? c2 - c1 : c1 - c2;
      });
      break;
    case 3:
      l.sort((a, b) => {
        let c1 = parseInt(a.statistics.viewCount.replace(/[^0-9]/g, ""));
        let c2 = parseInt(b.statistics.viewCount.replace(/[^0-9]/g, ""));
        return direction == 1 ? c2 - c1 : c1 - c2;
      });
      break;
  }

  return l;
}

function numberPatterns(value) {
  const numbers = value.replace(/[^0-9]/g, "");
  return numbers
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)
    .join(",")
    .split("")
    .reverse()
    .join("");
}

async function runServer() {
  const port = await getPort({ port: 3000 });
  const router = new Router();
  const app = new Koa();

  router.get("/channels", (ctx) => {
    let list = channels.slice();
    const sort = parseInt(ctx.query.sort);
    const direction = ctx.query.direction == -1 ? -1 : 1;
    const title = ctx.query.title;

    list = sortList(list, sort, direction);

    list = list.filter((el) => el.title.match(title));

    list = list.map((el) => {
      el.statistics.subscriberCount = numberPatterns(
        el.statistics.subscriberCount
      );
      el.statistics.videoCount = numberPatterns(el.statistics.videoCount);
      el.statistics.viewCount = numberPatterns(el.statistics.viewCount);

      return el;
    });

    ctx.body = list;
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
