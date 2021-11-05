This is a POC for using React SSR as a sidebar, but still having progressive hydration working.

# Getting started

```
yarn install
// In separate terminals
yarn bundle
yarn frontend
yarn sidecar
```

Then visit localhost:8000

You should see a basic react app that progressively hydrates as the server gets more data.

The frontend is written in node, but it can be substituted for any of our FE servers