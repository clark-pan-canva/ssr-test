const babelRegister = require('@babel/register');
babelRegister({
  ignore: [/[\\\/](build|sidecar\/sidecar|node_modules)[\\\/]/],
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
});

const express = require('express');
const { render } = require('./render.js');

const app = express();

app.post('/', (req, res) => {
  render(req, res);
});

app.listen(8001);