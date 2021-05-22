# vscode-github-rich-presence

## What

A small webserver to generate a richprecence like this. 

- When VSCode is offline


![dark theme when offline](https://raw.githubusercontent.com/rubenkharel/vscode-github-rich-presence/main/repoAsset/darkmode.jpeg)

- When VScode is working


![white theme when online](https://raw.githubusercontent.com/rubenkharel/vscode-github-rich-presence/main/repoAsset/whitemode.jpeg)


## Why?

For fun, inspired from [Discord Rich Presence](https://discord.com/rich-presence)


## How?

Since, this data is being sent from vscode, we need a extension. [Here](https://marketplace.visualstudio.com/items?itemName=rubenkharel.github-vscode-richpresence) is the extension specifically built for this task.

#### Install the extension

`Ctrl+P` on vscode and paste `https://marketplace.visualstudio.com/items?itemName=rubenkharel.github-vscode-richpresence` then press enter. 

After installing is successful, `Ctrl+Shift+x` on vscode to visit extension settings. Then paste `@ext:rubenkharel.github-vscode-richpresence` on search setting.


Then, configure it like this. 

1. Enter the endpoint of the socket. By default the server will have 9998 port. eg. `https://yourdomain:9998/`
2. The update frequency (in sec). Set it to less then a minute to nearly have a live update. 

![Configure your extension](https://i.imgur.com/YKuou1Y.png)


#### Setup the server

Hope you have a VPS. Install 
```
$ git clone https://github.com/rubenkharel/vscode-github-rich-presence
$ cd github-vscode-rich-presence
$ npm install
$ node server2.js
```

To enable a corn job I reccomend installing pm2 [pm2](https://www.npmjs.com/package/pm2) after installing pm2 start the server with.
```
$ pm2 start server2.js
```

## HELP I AM STUCK.

- Create an issue.
