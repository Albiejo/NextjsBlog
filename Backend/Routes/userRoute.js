import express from 'express';
const userrouter = express.Router();
import userController from '../Controller/userController.js';



userrouter.post('/login' , userController.userLogin)
userrouter.post('/signup', userController.userRegistration)






export default userrouter;