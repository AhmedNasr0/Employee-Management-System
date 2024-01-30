const Users = require("../Model/users.model");
const generate_token_jwt = require("../utils/generate_token");
const { check, validationResult } = require("express-validator");


const adduser = async (req, res) => {
  // express validations
  const errors = validationResult(req);
  let name_errors = [],
    email_errors = [],
    pass_errors = [],
    message;
  if (await !errors.isEmpty()) {
    errors.array().forEach((error) => {
      if (error.path == "name") name_errors.push(error.msg);
      else if (error.path == "email") email_errors.push(error.msg);
      else if (error.path == "password") {
        pass_errors.push(error.msg);
      }
    });

    res.render("register", { name_errors, email_errors, pass_errors, message });
  }
  const { email, password } = req.body;
  //search in db for this email 
  
  const oldemail = await Users.findOne({ email });
  console.log(oldemail);
  if (oldemail==null) {
    //create new user after all checked was done
    const newuser=await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role:'user'}) 
      
      //Generate new token form the user
        const token=await generate_token_jwt({"name":newuser.name,"email":newuser.email,"password":newuser.password,"role":newuser.role});
        //create cookie to hold token and send to server
        res.cookie('jwt',token,{httpOnly:true});
      res.render("login",{name_errors,
         email_errors,
         pass_errors,
         message});

  } else {//check if email is found
    message = "Email Already Exist";
    return res.render("register", {
      name_errors,
      email_errors,
      pass_errors,
      message,
    });
  }
};

const registerpage = (req, res) => {
  let email_errors = [],
    name_errors = [],
    pass_errors = [],
    message;
  res.render("register", { email_errors, name_errors, pass_errors, message });
};
const loginpage = (req, res) => {
  let email_errors=[],pass_errors=[],message;
  res.render("login",{email_errors,pass_errors,message});
};
const login = async (req, res) => {
  // Check of all validate Errors
  const errors=validationResult(req)
  let ListOfErrors=[];
  let email_errors=[],pass_errors=[];
  if(!errors.isEmpty()){
    errors.array().forEach((error)=>{
      if(error.path=='email') email_errors.push(error.msg)
      else if(error.path=='password') pass_errors.push(error.msg)
    })
    let message;
    return res.render('login',{email_errors,pass_errors,message})
  }
  // Check If Email Found
  let {email,password}=req.body;
  const oldemail = await Users.find({email:email});
  var message='';
  if(oldemail==''){
    message='Email Not Found'
    return res.render('login',{message,email_errors,pass_errors})
  }
  else{
    //check if password is correct
      if(password == oldemail[0].password){
        
        let name=oldemail[0].name;
        //Generate new token form the user
        const token=await generate_token_jwt({"name":oldemail[0].name, "email":oldemail[0].email,"password":oldemail[0].password,"role":oldemail[0].role});
        //create cookie to send it to server
        res.cookie('jwt',token,{httpOnly:true});
        if(oldemail[0].role == 'user')
          res.redirect(`/user_dashboard`)
        else if(oldemail[0].role=='admin'){
          res.redirect(`/admin_dashboard`)
        }
      }
      else{
        message='Wrong Password , Try Again !'
        return res.render('login',{message,email_errors,pass_errors})
      }
  }
}
;
module.exports = { adduser, registerpage, loginpage, login };

