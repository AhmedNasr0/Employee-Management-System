const Users = require("../Model/employee.model");
const jwt = require("jsonwebtoken");
const limit = 5;
let userid;
// Add Employee To Database
const addemployee = async (req, res) => {
  const check = await Users.find({ email: req.body.email });
  if (check != "") {
    return res.send("This Account Was Added");
  } else {
    const newuser = new Users({
      firstname: req.body.firstname,
      secondname: req.body.secondname,
      email: req.body.email,
      jobtitle: req.body.title,
      status: req.body.status,
    })
      .save()
      .then(res.redirect("/admin_dashboard"));
  }
};
// Edit employee in database by his mongodb id (_id)
const editemployee = async (req, res) => {
  await Users.updateOne(
    { _id: userid },
    {
      $set: {
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        email: req.body.email,
        jobtitle: req.body.title,
        status: req.body.status,
      },
    }
  );
  userid = "";
  const users = await Users.find();
  res.redirect("/admin_dashboard");
};
// get employee from database by his id
const getemployee_ForEdit = async (req, res) => {
  userid = req.query.id;
  const specific_user = await Users.find({ _id: req.query.id });

  res.render(`EditEmployee`, { user: specific_user });
};
// show all users in dashboard
const admin_dashboard = async (req, res) => {
  let page = req.query.page;
  let skip = (page - 1) * limit;
  const users = await Users.find().skip(skip).limit(limit);
  const allusers = await Users.find();
  const totalemployees = allusers.length;
  //count all status of employees
  let active = 0,
    notactive = 0,
    pending = 0;
  for (let i = 0; i < allusers.length; i++) {
    if (allusers[i].status == "Active") active++;
    else if (allusers[i].status == "Not Active") notactive++;
    else pending++;
  }
  res.render("admin_dashboard", {
    users: users,
    totalemployees,
    active,
    notactive,
    pending,
    name: get_user_name(req.cookies.jwt),
  });
};

//get user name from token that in browser
const get_user_name = (token) => {
  let details = jwt.verify(token, "121344tmknckj32i456u765432ksj3r452n3bev");
  let name = details.name;
  return name;
};
//display all user in user dashboard and render view
const user_dashboard = async (req, res) => {
  let page = req.query.page;
  let skip = (page - 1) * limit;
  const users = await Users.find().skip(skip).limit(limit);
  const allusers = await Users.find();
  const totalemployees = allusers.length;
  let active = 0,
    notactive = 0,
    pending = 0;
  for (let i = 0; i < allusers.length; i++) {
    if (allusers[i].status == "Active") active++;
    else if (allusers[i].status == "Not Active") notactive++;
    else pending++;
  }

  res.render("user_dashboard", {
    users: users,
    totalemployees,
    active,
    notactive,
    pending,
    name: get_user_name(req.cookies.jwt),
  });
};

// get all employee
const getemployee = (req, res) => {
  res.render("AddEmployee");
};

// delete employee from database
const deleteemployee = async (req, res) => {
  await Users.deleteOne({ _id: req.query.id });
  res.redirect("/admin_dashboard");
};
//search for employee by his name
const Search_Employee = async (req, res) => {
  let page = req.query.page;
  let skip = (page - 1) * limit;
  var filter_users = await Users.find({ firstname: req.body.search })
    .limit(limit)
    .skip(skip);
  if (filter_users == "") filter_users = await Users.find({email:""}).limit(limit).skip(skip);
  let totalemployees = filter_users.length;
  let active = 0,
    notactive = 0,
    pending = 0;
  for (let i = 0; i < filter_users.length; i++) {
    if (filter_users[i].status == "Active") active++;
    else if (filter_users[i].status == "Not Active") notactive++;
    else pending++;
  }
  //check role of user to get his redirect
  
  const role=jwt.verify(req.cookies.jwt, "121344tmknckj32i456u765432ksj3r452n3bev").role;
  
  if(role=='user'){
    res.render('user_dashboard',{
      users: filter_users,
    totalemployees,
    active,
    notactive,
    pending,
    name: get_user_name(req.cookies.jwt),
    })
  }
  else{
  res.render("admin_dashboard", {
    users: filter_users,
    totalemployees,
    active,
    notactive,
    pending,
    name: get_user_name(req.cookies.jwt),
  });}
};

module.exports = {
  addemployee,
  editemployee,
  getemployee,
  deleteemployee,
  admin_dashboard,
  editemployee,
  getemployee_ForEdit,
  Search_Employee,
  user_dashboard,
};
