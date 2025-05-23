import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config/config"

// password hash

export const hashPassword = (password:string)=>{
    return bcrypt.hashSync(password,10)
}

// compare password
export const comparePassword = (password:string,hash:string)=>{
    return bcrypt.compare(password,hash)
}

// jwt secret
// this is basically used for login and when a user is navigating a web
export const createJwt = (user:any)=>{
    const token = jwt.sign(
        {
            id: user._id,
            email:user.email
        },
        config.secret_key,
        {expiresIn:"1d"}
    );
    return token;
};

