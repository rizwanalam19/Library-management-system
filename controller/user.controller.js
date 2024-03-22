import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
const createUser = asyncHandler(async(req, res)=>{
    const {username, password} = req.body

    const user = new User({
        username, password
    });

  const createuser =   await user.save();

  res .status(200).json(new ApiResponse(200, createuser, "User create successfully !!!!"))

});

const loginUser = asyncHandler(async(req,res)=>{

  const { username, password } = req.body;
  console.log(req.body);
  if (!username && !password) {
    throw new ApiError(400, "Username or email is required");
  
  }

  const user = await User.findOne({username: username});  
if(!user){
  throw new ApiError(400, "Username or password is incorrect")
}
const isPasswordValid = await user.isPasswordCorrect(password);

if(!(isPasswordValid)){
  throw new ApiError(400, "Username or password is incorrect")
}

  req.session.userId = username; // Save user ID in session
  console.log("Session ID: ",req.session);
  req.session.save();
  console.log("Secret Key:", process.env.SECRET_KEY);

return res .status(200).json(new ApiResponse(200, req.session.userId, "Logged In successfully !!!!!!")) 
})

export { createUser, loginUser }