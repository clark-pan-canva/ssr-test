import * as React from "react";
// import {renderToString} from 'react-dom/server';
import { renderToPipeableStream } from "react-dom/server";
import App from "../app/App";
import { makeController, DataProvider } from '../app/ServerData';

const assets = {
  "main.js": "/main.js",
  "main.css": "/main.css"
};

export const render = (req, res) => {
  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });
  let didError = false;
  let dataController;
  req.on('data', (data) => {
    const chunk = JSON.parse(data);
    if (!dataController) {
      // initial chunk
      dataController = makeController(chunk);

      const { pipe, abort } = renderToPipeableStream(
        <DataProvider controller={dataController}>
          <App assets={assets} store={chunk} />
        </DataProvider>,
        {
          bootstrapScripts: [assets['main.js']],
          onCompleteShell() {
            // If something errored before we started streaming, we set the error code appropriately.
            res.statusCode = didError ? 500 : 200;
            res.setHeader("Content-type", "text/html");
            pipe(res);
            res.write(`<script>if (!window.dataController) { window.dataController = { updateChunk(data) { this.queue.push(data); }, queue: [] } }</script>`);
          },
          onError(x) {
            didError = true;
            console.error(x);
          }
        }
      );
    } else {
      console.log('updateChunk', chunk);
      dataController.updateChunk(chunk);
      res.write(`<script>window.dataController.updateChunk(${JSON.stringify(chunk)})</script>`);
    }
  });
}