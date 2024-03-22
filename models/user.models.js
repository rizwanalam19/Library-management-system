import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save",async function(next){
  // this.isModified("password")) line mean when we send password field then pre hook will 
  // apply on it otherwise it hash the paswword evertime along with update other field 
  //like username or update phone number 
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password){
return await bcrypt.compare(password, this.password);
}
export const User = mongoose.model("User", userSchema);
