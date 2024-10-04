import User from "../Model/User.js";
import { CustomError } from "../Error/customError.js";



class userService{


    async userLoginService(email, password) {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new CustomError("email not found" , 403);
          }
    
          const isMatch = await user.matchPassword(password);
          if (!isMatch) {
            throw new CustomError("incorrect password" , 403);
          }
    
          return user;
        } catch (error) {
          if (error instanceof CustomError) {
            throw error; // Rethrow custom errors for handling in controller
          }
    
          // Handle any other errors
          throw new CustomError("Server error during registration" , 500);
        }
      }




      async userRegistration(email, password, name) {
        try {
        const emailExists = await User.findOne({ email:email });
        
        if (emailExists) {
          throw new CustomError("email already exists !",403);
        }
    
        const newUser = new User({
          email,
          password,
          name,
        });
    
        await newUser.save();
        return newUser;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error; // Rethrow custom errors for handling in controller
              }
              // Handle any other errors
              throw new CustomError("Server error during registration",500);
        }

}

}





export default new userService();