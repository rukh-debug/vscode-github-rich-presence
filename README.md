# vscode-github-rich-presence

## What

A server which generates 

[this vscode extension](https://marketplace.visualstudio.com/items?itemName=rubenkharel.github-vscode-richpresence) to work.

## What it does?

It compiles the data received from the extension into image like this 
[![Demo!](http://161.97.66.38:9998/img.jpeg)](http://161.97.66.38:9998/img.jpeg)

If its not showing up, then understand my server is down.

## How to use it?

just 

```
$ git clone https://github.com/rubenkharel/github-vscode-rich-presence-extension
$ cd github-vscode-rich-presence
$ npm install
$ node server2.js
```

to enable a corn job I reccomend installing [pm2](https://www.npmjs.com/package/pm2)]

after installing pm2 you can just
```
$ pm2 start server2.js
```

After that install the [extension](https://marketplace.visualstudio.com/items?itemName=rubenkharel.github-vscode-richpresence)
and add your `http://(serverIP/Domain):9998` in extension settings. 

The image endpoint will be available on `http://(serverIP):9998/img.jpeg` endpoint. The banner can be used anywhere to show live vscode update.

## I NEED HELP

- Create an issue. 

:)
