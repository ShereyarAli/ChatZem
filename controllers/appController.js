const {join} = require('path')
const {Server} = require('socket.io')
const server = require('../utils/socketConnection')

// const server = createServer()
// const io = new Server(server,{path:'/api/chat/room'})


const deleteDocument = async(req,res)=>{
  // const{email:userEmail} = req.body
  // const user = await User.deleteMany({email:userEmail})
  // const showAllUser = await User.find({})
  try {
    res.status(201).json({user:req.user})
    console.log(req.user)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({messgae:'something went wrong'})
  }

}
const io = new Server(server,{path:'/api/chat/room'})

const room = async(req,res) => {
  try {
    res.sendFile(join(__dirname,'../index.html'))   
  }
  catch (error) {
   console.log(error) 
  }
}

module.exports = {deleteDocument, room}