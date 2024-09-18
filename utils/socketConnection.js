const {createServer} = require('http')
const {Server} = require('socket.io')
const express = require('express')
const app = express()

const server = createServer(app)

module.exports = {server,app,express}