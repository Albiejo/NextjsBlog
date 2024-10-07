import Admin from "../Model/Admin.js";
import { CustomError } from "../Error/customError.js";
import User from "../Model/User.js";


class adminService {
  //admin login
  async adminLoginService(email, password) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new CustomError("email not found", 403);
      }

      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        throw new CustomError("incorrect password", 403);
      }

      return admin;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error; // Rethrow custom errors for handling in controller
      }
      // Handle any other errors
      throw new CustomError("Server error during registration", 500);
    }
  }

  async adminRegistration(email, password, phone) {
    try {
      const emailExists = await Admin.findOne({ email });
      if (emailExists) {
        throw new CustomError("email already exists !", 409);
      }

      const newAdmin = new Admin({
        email,
        password,
        phone,
      });

      await newAdmin.save();
      return newAdmin;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error; // Rethrow custom errors for handling in controller
      }

      // Handle any other errors
      throw new CustomError("Server error during registration", 500);
    }
  }

  async getUserProfile(userid) {
    try {

      const userProfile = await User.findById(userid);
      if(!userProfile){
        return null
      }

      return userProfile
    } catch (error) {
      if (error instanceof CustomError) {
        throw error; // Rethrow custom errors for handling in controller
      }
      throw new CustomError("Server error during user profile fetching", 500);

    }
  }


  async Block(userid){
    try {
      const userdata = await User.findById(userid);

      if (!userdata) {
        throw new CustomError("user not found", 403);
      }

      userdata.isActive = false ; 

      await userdata.save();

      return userdata;

    } catch (error) {
      if (error instanceof CustomError) {
        throw error; // Rethrow custom errors for handling in controller
      }
      throw new CustomError("Server error during user profile blocking", 500);
    }
  }


  async UnBlock(userid){
    try {
      const userdata = await User.findById(userid);

      if (!userdata) {
        throw new CustomError("user not found", 403);
      }

      userdata.isActive = true ; 

      await userdata.save();

      return userdata;

    } catch (error) {
      if (error instanceof CustomError) {
        throw error; // Rethrow custom errors for handling in controller
      }
      throw new CustomError("Server error during user profile unblocking", 500);
    }
  }


  async Deleteuser(userid){
    try {
      const result = await User.findByIdAndDelete(userid)
      return result ? true : false ;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error; // Rethrow custom errors for handling in controller
      }
      throw new CustomError("Server error during user profile deletion", 500);
    }
  }
}
export default new adminService();
