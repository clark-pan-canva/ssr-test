import React from 'react';

export default function Html({ assets, store, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={assets["main.css"]} />
        <title></title>
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `assetManifest = ${JSON.stringify(assets)}; store = ${JSON.stringify(store)};`
          }}
        />
      </body>
    </html>
  );
}
