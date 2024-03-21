import { asyncHandler } from "../utils/asyncHandler.js";

const isAuthenticated = asyncHandler(async(req, res, next)=>{

    console.log("Reg session: ",req.session.userId);
    if (!req.session.userId) {
      return res.redirect('/login');
    }
    next();
})

export { isAuthenticated }