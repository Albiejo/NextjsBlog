import Admin from "../Model/Admin.js";
import { CustomError } from "../Error/customError.js";

class adminService {
  //admin login
  async adminLoginService(email, password) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new CustomError("email not found",403);
      }

      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        throw new CustomError("incorrect password",403);
      }

      return admin;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error; // Rethrow custom errors for handling in controller
      }
      // Handle any other errors
      throw new CustomError("Server error during registration",500);
    }
  }



  async adminRegistration(email, password, phone) {
    try {
    const emailExists = await Admin.findOne({ email });
    if (emailExists) {
      throw new CustomError("email already exists !",409);
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
          throw new CustomError("Server error during registration",500);
    }
}
}
export default new adminService();
