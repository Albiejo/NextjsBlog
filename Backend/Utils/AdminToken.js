import jwt from 'jsonwebtoken';



const AdmingenerateToken = (res,adminId) => {
    
    const token = jwt.sign({adminId} , process.env.ADMINJWT_SECRET , {
        expiresIn:'30d'
    })

    res.cookie('jwt' , token , {
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge: 30*24*60*60*1000
    });
};


export default AdmingenerateToken;