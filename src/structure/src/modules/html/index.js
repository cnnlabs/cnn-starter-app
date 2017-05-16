import React from 'react';

function HTML({ html, assets }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href={assets.main.css} />
            </head>
            <body>
                <div id="mount" dangerouslySetInnerHTML={{ __html: html }} />
                <noscript>
                    <p>Please enable JavaScript for a better experience.</p>
                </noscript>
                <script type="text/javascript" src={assets.manifest.js} />
                <script type="text/javascript" src={assets.vendor.js} />
                <script type="text/javascript" src={assets.main.js} />
            </body>
        </html>
    );
}

export default HTML;
