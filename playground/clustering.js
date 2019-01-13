process.env.UV_THREADPOOL_SIZE = 1 // to make understanding benchmark results easier
const cluster = require('cluster')

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // cause index.js to be executed again but in child mode
  // The number of forks determine the number of servers 
  cluster.fork()
  cluster.fork()
} else {
  // I'm a child, I'm going to act as server and do nothing else 
  const crypto = require('crypto')
  const express = require('express')
  const app = express()
  
  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there')  
    })
  })

  app.get('/fast', (req, res) => {
    res.send('This was fast!')
  })

  app.listen(3000)

}


// function doWork(duration) {
//   const start = Date.now()
//   while(Date.now() - start < duration) { }
// }


// Standard server set up with pm2 enabled:

process.env.UV_THREADPOOL_SIZE = 1 // to make understanding benchmark results easier
const cluster = require('cluster')


// I'm a child, I'm going to act as server and do nothing else 
const crypto = require('crypto')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('Hi there')  
  })
})

app.get('/fast', (req, res) => {
  res.send('This was fast!')
})

app.listen(3000)
