import express from 'express';
const adminrouter = express.Router();
import adminController from '../Controller/adminController.js'




adminrouter.post('/login' , adminController.adminLogin)
adminrouter.post('/signup' , adminController.adminRegistration)
adminrouter.get('/getUser/:userid' , adminController.GetUser)
adminrouter.patch('/blockuser/:userid' , adminController.blockUser)
adminrouter.patch('/unBlockUser/:userid' , adminController.UnblockUser)
adminrouter.delete('/deleteUser/:userid' , adminController.deleteUser)

export default adminrouter;