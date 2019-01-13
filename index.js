//WEBWORKER SETUP
const crypto = require('crypto')
const express = require('express')
const app = express()
const Worker = require('webworker-threads').Worker

app.get('/', (req, res) => {
  
  // worker interface:
  // created a function which gets stringified and utilised in
  // another part of computer, so cannot access any variable outside 
  // function callback, henc ewhy we use postMessage/onmessage setup
  const worker = new Worker(function() {
    // this = object which represents the thread
    this.onmessage = function() {
      let counter = 0
      while (counter < 1e9) {
        counter++
      }
      postMessage(counter) // communicates result back to Node app
    }
  })

  // what happens when postMessage from interface is called:
  worker.onmessage = function(message) {
    console.log(message.data)
    res.send('' + message.data)
  }

  // we are now calling onmessage in worker thread
  worker.postMessage()
})

app.get('/fast', (req, res) => {
  res.send('This was fast!')
})

app.listen(3000)
