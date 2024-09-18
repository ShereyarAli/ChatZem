const users = require('./routes/routes')
const appFunctionality = require('./routes/appRoutes')
const connectDB = require('./db/connect')
const auth = require('./middleware/auth')
const {server, app, express} = require('./utils/socketConnection')
const{Server} = require('socket.io')
const cors = require('cors')

require('dotenv').config()

app.use(express.json())

app.use('/api/user',users)
app.use('/api/chat', appFunctionality);

let corsOptions = {
  origin:'http://localhost:5173',
  methods:"GET,POST,PATCH,DELETE",
  Credentials:true
}
app.use(cors(corsOptions))

app.get('/',(req, res)=>{
  res.send('hi')
  
  console.log(req.params)
})

// socket io server


const port = 5000;

const io = new Server(server)

const start = async() => {
  try{
    await connectDB(process.env.MONGO_URI)
    server.listen(port,()=>{
      console.log(`Server is listening ${port}`)
    })
    io.on('connection',(socket)=>{
      console.log('a user is on the server')
      socket.on('message',(msg)=>{
        console.log(msg)
      })
    })
  }
  catch(error){
    console.log(error)
  }
}
start();

module.exports = server