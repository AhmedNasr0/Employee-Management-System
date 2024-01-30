const controllers=require('../Controllers/dashboard.controller')
const express=require('express');
const { verify_token } = require('../middleware/verify_token');
const { allowedToAdmin }=require('../middleware/allowedTo');
const routes=express.Router();
routes.route('/EditEmployee').get(verify_token,allowedToAdmin,controllers.getemployee_ForEdit).post(verify_token,allowedToAdmin,controllers.editemployee)
routes.route('/AddEmployee').get(verify_token,allowedToAdmin ,controllers.getemployee).post(verify_token,allowedToAdmin,controllers.addemployee)
routes.route('/DeleteEmployee').get(verify_token,allowedToAdmin,controllers.deleteemployee)
routes.route('/admin_dashboard').get(verify_token,allowedToAdmin,controllers.admin_dashboard).post(verify_token,allowedToAdmin,controllers.Search_Employee)
routes.route('/user_dashboard').get(verify_token,controllers.user_dashboard).post(controllers.Search_Employee)
module.exports = routes;