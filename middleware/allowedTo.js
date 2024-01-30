const jwt=require('jsonwebtoken')
const allowedToAdmin =(req,res,next)=>{
    const token=req.cookies.jwt;
    const decodedToken=jwt.verify(token, "121344tmknckj32i456u765432ksj3r452n3bev")
    if(decodedToken.role!='admin'){
       return res.redirect(`/user_dashboard`)
    }
    next()
}
module.exports={allowedToAdmin}