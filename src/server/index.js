import express from "express";
import cors from "cors";
import ReactDOM from "react-dom/server";
import * as React from "react";
import App from "../shared/App";
import serialize from "serialize-javascript";
import { matchPath } from "react-router-dom";
import routes from "../shared/routes";
import { StaticRouter } from "react-router-dom/server";

const app = express();

app.use(cors());
app.use(express.static("dist"));

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(
    (route) => matchPath(route.path, req.url) || {}
  );

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise
    .then((data) => {
      const markup = ReactDOM.renderToString(<App serverData={data} />);

      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with React Router</title>
          <script src="/bundle.js" defer></script>
          <link href="/main.css" rel="stylesheet">
          <script>
            window.__INITIAL_DATA__ = ${serialize(data)}
          </script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `);
    })
    .catch(next);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
