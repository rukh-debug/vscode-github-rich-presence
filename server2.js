const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const index = require('./index')

let lastTime;

let getTime = () => {
  var date = new Date();
  var time = date.getTime();
  return time
}

io.on('connection', function (socket) {
  socket.on('update', async (data) => {
    lastTime = getTime()
    let compare = await index.compareData(data)
    console.log(data)
	if (compare){
      await index.justBake(data.filename, data.wspace, data.time)
    }
    else{
      await index.changeData(data)
      await index.justBake(data.filename, data.wspace, data.time)
    }
  })
})

let minutepassed = (current, past) => {
  let diff = current - past
  if (diff > 59999){
    index.die(diff)
  }
}

setInterval(() => {
  let currentTime = getTime()
  minutepassed(lastTime, currentTime)
}, 10000)

console.log(__dirname)
app.use(express.static(`${__dirname}/public`));
app.listen(9999)
server.listen(9998);
