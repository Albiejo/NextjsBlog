import express from 'express';
const adminrouter = express.Router();
import adminController from '../Controller/adminController.js'




adminrouter.post('/login' , adminController.adminLogin)
adminrouter.post('/signup' , adminController.adminRegistration)




export default adminrouter;