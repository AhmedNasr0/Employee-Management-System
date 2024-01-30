const jwt=require('jsonwebtoken');
const maxage=3*24*60*60;
module.exports =async (payload)=>
{
    const token=jwt.sign(payload,
        '121344tmknckj32i456u765432ksj3r452n3bev',
        );
    return token;
    
}