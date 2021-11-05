import {hydrateRoot} from 'react-dom';
import React from 'react';
import App from './App';
import { makeController, DataProvider } from './ServerData';

const store = window.store;
const controller = makeController(store);

if (window.dataController) {
  window.dataController.queue.forEach((data) => {
    controller.updateChunk(data);
  });
}

window.dataController = controller;

hydrateRoot(document,
  <DataProvider controller={controller}>
    <App assets={window.assetManifest} store={store} />
  </DataProvider>
);
