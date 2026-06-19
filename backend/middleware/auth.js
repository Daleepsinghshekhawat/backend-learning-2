const jwt = require("jsonwebtoken");
const secretkey = "mysecretkey";
const signupModel = require('../model/userModel')




module.exports = async (req, res, next) => {

  const authToken = req.headers.authorization;
  console.log(authToken);

  if(!authToken){
    return res.status(404).json({message:"token not found"})
  }

  const token = authToken.split(" ")[1]
  console.log(token);

  if(!token){
    return res.status(404).json({ message: "token value is empty" });
  }

const decode = jwt.verify(token,secretkey)
console.log(decode);



if(!decode){
  return res.status(404).json({message:"invalid"})
}


const {email} = decode
if(!email){
   return res.status(404).json({ message: "email payload is missing from token " });
}

const userDetail = await signupModel.findOne({email})
if(!userDetail){
  return res.status(404).json({message:"user not found in database"});
}

next();

};
