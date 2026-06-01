const bcrypt = require("bcryptjs/dist/bcrypt")
 
async function pass() {
  const password = 'sheri'
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(password, salt)
          console.log(hashPassword)

}
pass()