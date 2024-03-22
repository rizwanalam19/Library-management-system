import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isAuthenticated = asyncHandler(async(req, res, next)=>{

    console.log("Reg session: ",req.session.userId);
    if (!req.session.userId) {
      console.log("You sessions has expired !!!");
      return res.redirect('/login')

    }
    next();
})

export { isAuthenticated }