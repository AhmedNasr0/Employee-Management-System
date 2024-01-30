

module.exports.logout=(req,res,next)=>{
    res.cookie('jwt','',{maxAge:1})
    next();
}