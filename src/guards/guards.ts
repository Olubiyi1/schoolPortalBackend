import bcrypt from "bcrypt"

// password hash

export const hashPassword = (password:string)=>{
    return bcrypt.hashSync(password,10)
}