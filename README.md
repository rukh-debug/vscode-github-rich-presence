# vscode-github-rich-presence

## What

A small webserver to generate a richprecence like this. 

- When VSCode is offline
![dark theme when offline](https://raw.githubusercontent.com/rubenkharel/vscode-github-rich-presence/main/repoAsset/darkmode.jpeg)

- When VScode is working
![white theme when online](https://raw.githubusercontent.com/rubenkharel/vscode-github-rich-presence/main/repoAsset/whitemode.jpeg)


[this vscode extension](https://marketplace.visualstudio.com/items?itemName=rubenkharel.github-vscode-richpresence) to work.

## What it does?

It compiles the data received from the extension into image like this 
<br />
[![Demo!](http://161.97.66.38:9998/img.jpeg)](http://161.97.66.38:9998/img.jpeg)
<br />
If its not showing up, then server must be down. [Here](https://i.imgur.com/PFrs5wZ.png) is the demo.

## How to use it?

```
$ git clone https://github.com/rubenkharel/github-vscode-rich-presence
$ cd github-vscode-rich-presence
$ npm install
$ node server2.js
```

to enable a corn job I reccomend installing [pm2](https://www.npmjs.com/package/pm2)]

after installing pm2 start the server with.
```
$ pm2 start server2.js
```

After that install the [extension](https://marketplace.visualstudio.com/items?itemName=rubenkharel.github-vscode-richpresence)
and add your `http://(serverIP/Domain):9998` in extension settings. 

The image endpoint will be available on `http://(serverIP/domain):9998/img.jpeg`.

Althought it was made for github's readme, The banner can be used anywhere.

## I NEED HELP

- Create an issue.
