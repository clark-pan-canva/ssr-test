const http = require('http');
const express = require('express');
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const btoa = (str) => Buffer.from(String(str)).toString('base64');

const initialData = {
  header: {
    key: 'header',
    state: 'success',
    data: {
      items: ['Link A', 'Link B', 'Link C']
    }
  },
  sidebar: {
    key: 'sidebar',
    state: 'pending',
  },
  content: {
    key: 'content',
    state: 'pending',
  }
}
const server = express();

server.use(async (req, res, next) => {
  if (req.url.endsWith('.js')) {
    await delay(0);
  }
  next();
});

server.use(express.static('build'));
server.use(express.static('public'));

server.get('/', async (req, res) => {
  console.log('hello world client');
  const serverReq = http.request({
    port: 8001,
    host: '127.0.0.1',
    method: 'POST'
  });
  serverReq.on('response', (serverRes) => {
    console.log('server-response');
    serverRes.pipe(res);
  });

  console.log('initialChunk');
  serverReq.write(JSON.stringify(initialData));
  await delay(1000);
  console.log('contentChunk');
  serverReq.write(JSON.stringify({
    key: 'content',
    state: 'success',
    data: {
      body: `This is the main content ${btoa(Math.random())}`
    }
  }));
  await delay(5000);
  console.log('sidebarChunk');
  serverReq.write(JSON.stringify({
    key: 'sidebar',
    state: 'success',
    data: {
      items: [
        `Item - ${btoa(Math.random()).substring(3, 6)}`,
        `Item - ${btoa(Math.random()).substring(3, 6)}`,
        `Item - ${btoa(Math.random()).substring(3, 6)}`,
      ]
    }
  }));
  serverReq.end();
});

server.listen({ 
  port: 8000
});