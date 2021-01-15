const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const index = require('./index')

io.on('connection', function (socket) {
  socket.on('update', async (data) => {
    let compare = await index.compareData(data)
    if (compare){
      await index.justBake(data.filename, data.wspace, data.time)
    }
    else{
      await index.changeData(data)
      await index.justBake(data.filename, data.wspace, data.time)
    }
    
  })
})
console.log(__dirname)
app.use(express.static(`${__dirname}/public`));
app.listen(9999)
server.listen(9998);
