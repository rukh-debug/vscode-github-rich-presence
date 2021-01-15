const h2i = require("node-html-to-image")
const fs = require('fs')
const humanize = require('humanize-duration')

const shortEnglishHumanizer = humanize.humanizer({
  language: "shortEn",
  maxDecimalPoints: 0,
  languages: {
    shortEn: {
      y: () => "yr",
      mo: () => "mth",
      w: () => "wk",
      d: () => "day",
      h: () => "hrs",
      m: () => "min",
      s: () => "sec",
      ms: () => "ms",
    },
  },
});

let calculateDuration = (now) => {
  return new Promise((res, rej) => {
    fs.readFile('info.json', 'utf8', (err, infoFile) => {
      if (err) {
        console.log(err)
      }
      else {
        let object = JSON.parse(infoFile)
        let difference = now - object[`time`]
        let humanRead = shortEnglishHumanizer(difference)
        res(humanRead)
      }
    })
  })
}

let lineFiexr = (file, wspace) => {
  if (file !== null){
  if (file.length > 30) {
    file = `${file.slice(0, 29)}...`
  }
  }
  if(wspace !== null){
  if (wspace.length > 25) {
    wspace = `${wspace.slice(0, 24)}...`
  }
  }
  return {
    filename: file,
    workspace: wspace
  }
}

let justBake = async (file, wspace, time) => {
  let fixedData = lineFiexr(file, wspace)
  let duration = await calculateDuration(time)
  let vscodeImg = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBmaWxsPSJub25lIj4NCjxtYXNrIGlkPSJtYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xODEuNTM0IDI1NC4yNTJDMTg1LjU2NiAyNTUuODIzIDE5MC4xNjQgMjU1LjcyMiAxOTQuMjM0IDI1My43NjRMMjQ2Ljk0IDIyOC40MDNDMjUyLjQ3OCAyMjUuNzM4IDI1NiAyMjAuMTMyIDI1NiAyMTMuOTgzVjQyLjAxODFDMjU2IDM1Ljg2ODkgMjUyLjQ3OCAzMC4yNjM4IDI0Ni45NCAyNy41OTg4TDE5NC4yMzQgMi4yMzY4MUMxODguODkzIC0wLjMzMzEzMiAxODIuNjQyIDAuMjk2MzQ0IDE3Ny45NTUgMy43MDQxOEMxNzcuMjg1IDQuMTkxIDE3Ni42NDcgNC43MzQ1NCAxNzYuMDQ5IDUuMzMzNTRMNzUuMTQ5IDk3LjM4NjJMMzEuMTk5MiA2NC4wMjQ3QzI3LjEwNzkgNjAuOTE5MSAyMS4zODUzIDYxLjE3MzUgMTcuNTg1NSA2NC42M0wzLjQ4OTM2IDc3LjQ1MjVDLTEuMTU4NTMgODEuNjgwNSAtMS4xNjM4NiA4OC45OTI2IDMuNDc3ODUgOTMuMjI3NEw0MS41OTI2IDEyOEwzLjQ3Nzg1IDE2Mi43NzNDLTEuMTYzODYgMTY3LjAwOCAtMS4xNTg1MyAxNzQuMzIgMy40ODkzNiAxNzguNTQ4TDE3LjU4NTUgMTkxLjM3QzIxLjM4NTMgMTk0LjgyNyAyNy4xMDc5IDE5NS4wODEgMzEuMTk5MiAxOTEuOTc2TDc1LjE0OSAxNTguNjE0TDE3Ni4wNDkgMjUwLjY2N0MxNzcuNjQ1IDI1Mi4yNjQgMTc5LjUxOSAyNTMuNDY3IDE4MS41MzQgMjU0LjI1MlpNMTkyLjAzOSA2OS44ODUzTDExNS40NzkgMTI4TDE5Mi4wMzkgMTg2LjExNVY2OS44ODUzWiIgZmlsbD0id2hpdGUiLz4NCjwvbWFzaz4NCjxnIG1hc2s9InVybCgjbWFzazApIj4NCjxwYXRoIGQ9Ik0yNDYuOTQgMjcuNjM4M0wxOTQuMTkzIDIuMjQxMzhDMTg4LjA4OCAtMC42OTgzMDIgMTgwLjc5MSAwLjU0MTcyMSAxNzUuOTk5IDUuMzMzMzJMMy4zMjM3MSAxNjIuNzczQy0xLjMyMDgyIDE2Ny4wMDggLTEuMzE1NDggMTc0LjMyIDMuMzM1MjMgMTc4LjU0OEwxNy40Mzk5IDE5MS4zN0MyMS4yNDIxIDE5NC44MjcgMjYuOTY4MiAxOTUuMDgxIDMxLjA2MTkgMTkxLjk3NkwyMzkuMDAzIDM0LjIyNjlDMjQ1Ljk3OSAyOC45MzQ3IDI1NS45OTkgMzMuOTEwMyAyNTUuOTk5IDQyLjY2NjdWNDIuMDU0M0MyNTUuOTk5IDM1LjkwNzggMjUyLjQ3OCAzMC4zMDQ3IDI0Ni45NCAyNy42MzgzWiIgZmlsbD0iIzAwNjVBOSIvPg0KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPg0KPHBhdGggZD0iTTI0Ni45NCAyMjguMzYyTDE5NC4xOTMgMjUzLjc1OUMxODguMDg4IDI1Ni42OTggMTgwLjc5MSAyNTUuNDU4IDE3NS45OTkgMjUwLjY2N0wzLjMyMzcxIDkzLjIyNzJDLTEuMzIwODIgODguOTkyNSAtMS4zMTU0OCA4MS42ODAyIDMuMzM1MjMgNzcuNDUyM0wxNy40Mzk5IDY0LjYyOThDMjEuMjQyMSA2MS4xNzMzIDI2Ljk2ODIgNjAuOTE4OCAzMS4wNjE5IDY0LjAyNDVMMjM5LjAwMyAyMjEuNzczQzI0NS45NzkgMjI3LjA2NSAyNTUuOTk5IDIyMi4wOSAyNTUuOTk5IDIxMy4zMzNWMjEzLjk0NkMyNTUuOTk5IDIyMC4wOTIgMjUyLjQ3OCAyMjUuNjk1IDI0Ni45NCAyMjguMzYyWiIgZmlsbD0iIzAwN0FDQyIvPg0KPC9nPg0KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjFfZCkiPg0KPHBhdGggZD0iTTE5NC4xOTYgMjUzLjc2M0MxODguMDg5IDI1Ni43IDE4MC43OTIgMjU1LjQ1OSAxNzYgMjUwLjY2N0MxODEuOTA0IDI1Ni41NzEgMTkyIDI1Mi4zODkgMTkyIDI0NC4wMzlWMTEuOTYwNkMxOTIgMy42MTA1NyAxODEuOTA0IC0wLjU3MTE3NSAxNzYgNS4zMzMyMUMxODAuNzkyIDAuNTQxMTY2IDE4OC4wODkgLTAuNzAwNjA3IDE5NC4xOTYgMi4yMzY0OEwyNDYuOTM0IDI3LjU5ODVDMjUyLjQ3NiAzMC4yNjM1IDI1NiAzNS44Njg2IDI1NiA0Mi4wMTc4VjIxMy45ODNDMjU2IDIyMC4xMzIgMjUyLjQ3NiAyMjUuNzM3IDI0Ni45MzQgMjI4LjQwMkwxOTQuMTk2IDI1My43NjNaIiBmaWxsPSIjMUY5Q0YwIi8+DQo8L2c+DQo8ZyBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6b3ZlcmxheSIgb3BhY2l0eT0iMC4yNSI+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE4MS4zNzggMjU0LjI1MkMxODUuNDEgMjU1LjgyMiAxOTAuMDA4IDI1NS43MjIgMTk0LjA3NyAyNTMuNzY0TDI0Ni43ODMgMjI4LjQwMkMyNTIuMzIyIDIyNS43MzcgMjU1Ljg0NCAyMjAuMTMyIDI1NS44NDQgMjEzLjk4M1Y0Mi4wMTc5QzI1NS44NDQgMzUuODY4NyAyNTIuMzIyIDMwLjI2MzYgMjQ2Ljc4NCAyNy41OTg2TDE5NC4wNzcgMi4yMzY2NUMxODguNzM3IC0wLjMzMzI5OSAxODIuNDg2IDAuMjk2MTc3IDE3Ny43OTggMy43MDQwMUMxNzcuMTI5IDQuMTkwODMgMTc2LjQ5MSA0LjczNDM3IDE3NS44OTIgNS4zMzMzN0w3NC45OTI3IDk3LjM4NkwzMS4wNDI5IDY0LjAyNDVDMjYuOTUxNyA2MC45MTg5IDIxLjIyOSA2MS4xNzM0IDE3LjQyOTIgNjQuNjI5OEwzLjMzMzExIDc3LjQ1MjNDLTEuMzE0NzggODEuNjgwMyAtMS4zMjAxMSA4OC45OTI1IDMuMzIxNiA5My4yMjczTDQxLjQzNjQgMTI4TDMuMzIxNiAxNjIuNzczQy0xLjMyMDExIDE2Ny4wMDggLTEuMzE0NzggMTc0LjMyIDMuMzMzMTEgMTc4LjU0OEwxNy40MjkyIDE5MS4zN0MyMS4yMjkgMTk0LjgyNyAyNi45NTE3IDE5NS4wODEgMzEuMDQyOSAxOTEuOTc2TDc0Ljk5MjcgMTU4LjYxNEwxNzUuODkyIDI1MC42NjdDMTc3LjQ4OCAyNTIuMjY0IDE3OS4zNjMgMjUzLjQ2NyAxODEuMzc4IDI1NC4yNTJaTTE5MS44ODMgNjkuODg1MUwxMTUuMzIzIDEyOEwxOTEuODgzIDE4Ni4xMTVWNjkuODg1MVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcikiLz4NCjwvZz4NCjwvZz4NCjxkZWZzPg0KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSItMjEuNDg5NiIgeT0iNDAuNTIyNSIgd2lkdGg9IjI5OC44MjIiIGhlaWdodD0iMjM2LjE0OSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPg0KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4NCjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+DQo8ZmVPZmZzZXQvPg0KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTAuNjY2NyIvPg0KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPg0KPGZlQmxlbmQgbW9kZT0ib3ZlcmxheSIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+DQo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPg0KPC9maWx0ZXI+DQo8ZmlsdGVyIGlkPSJmaWx0ZXIxX2QiIHg9IjE1NC42NjciIHk9Ii0yMC42NzM1IiB3aWR0aD0iMTIyLjY2NyIgaGVpZ2h0PSIyOTcuMzQ3IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+DQo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPg0KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4NCjxmZU9mZnNldC8+DQo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMC42NjY3Ii8+DQo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+DQo8ZmVCbGVuZCBtb2RlPSJvdmVybGF5IiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4NCjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+DQo8L2ZpbHRlcj4NCjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjEyNy44NDQiIHkxPSIwLjY1OTk4OCIgeDI9IjEyNy44NDQiIHkyPSIyNTUuMzQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4NCjxzdG9wIHN0b3AtY29sb3I9IndoaXRlIi8+DQo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiLz4NCjwvbGluZWFyR3JhZGllbnQ+DQo8L2RlZnM+DQo8L3N2Zz4=`

  let data = `<html lang="en">
               <head>
               <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap" rel="stylesheet">
                 <style>
               
               .box{
                 border: 2px solid #666;
                 border-radius: 7px;
                 box-sizing: border-box;
                 font-family: Open Sans Condensed;
                 font-size: 18px;
                 letter-spacing: -0.02em;
                 height: 120px;
                 width: 400px;
                 background-color: #faf6f6;
                 padding: 15px;
                 display: flex;
                 flex-direction: row;
               }
               
               .text-container{
                 margin: 7px 0px 7px 10px;
                 display: flex;
                 flex-direction: column;
               }
               .text-item{
                 margin-bottom: 4px;
               }
               
               .icon{
                 border-radius: 7px;
               }
               
                 </style>
               </head>
               <body>
                 <div class='box'>
                   <img class='icon' src='${vscodeImg}' width='85' hight='85' />
                   <div class='text-container'>
                     <div class='text-item'>Editing: ${fixedData.filename} </div>
                     <div class='text-item'>Workspace: ${fixedData.workspace} </div>
                     <div class='text-item'>Since: ${duration} </div>
                   </div>
                 </div>
               </body>
               </html>`

  h2i({
    output: './public/img.jpeg',
    type: 'jpeg',
    quality: 100,
    html: data,
    transparent: true,
    puppeteerArgs: { defaultViewport: { width: 416, height: 120 } }
  })
}

let shakeAndBake = async (data) => {
  return new Promise((res, rej) => {
    //let difference = await calculateDuration(data.time)
    justBake(data.filename, data.wspace, data.time)
  })
}

let compareFile = async (data) => {
  return new Promise((res, rej) => {
    let object;
    fs.readFile('info.json', 'utf8', (err, infoFile) => {
      if (err) {
        console.log(err)
      }
      else {
        object = JSON.parse(infoFile)
        if (data.filename === object.filename && data.wspace === object.wspace) {
          res(true)
        }
        else {
          res(false)
        }
      }
    })
  })
}

let changeData = async (data) => {
  return new Promise(() => {
    fs.writeFileSync('info.json', JSON.stringify(data));
  })
}

exports.justBake = justBake;
exports.shakeAndBake = shakeAndBake;
exports.compareData = compareFile;
exports.changeData = changeData;
