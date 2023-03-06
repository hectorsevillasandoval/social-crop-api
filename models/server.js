const express = require('express')
const cors = require('cors')
const http = require('http')
const uploadsRouter = require('../routes/uploads.router')
const fileUpload = require('express-fileupload')

class Server {
  constructor () {
    this.app = express()
    this.PORT = process.env.PORT || 8000
    this.server = http.createServer(this.app)
    this.paths = {
      uploads: '/api/v1/upload/'
    }

    this.middleware()
    this.routes()
  }

  routes () {
    this.app.use('/home', (req, res) => {
      return res.json({
        msg: 'success'
      })
    })
    this.app.use(this.paths.uploads, uploadsRouter)
  }

  middleware () {
    this.app.use(cors())
    this.app.use(express.json())

    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }))
  }

  listen () {
    this.server.listen(this.PORT, () => console.log('listening on port ', this.PORT))
  }
}

module.exports = Server
