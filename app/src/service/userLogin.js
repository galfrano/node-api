import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const notEmpty = (someVar) => (typeof someVar == 'string' && someVar.length != 0);

export const login = (email, password) => 
    new Promise((resolve, reject) => notEmpty(email) && notEmpty(password) ?
        resolve((data) => data.then((userData) => new Promise((resolve, reject) =>
            (userData.length > 0) ? resolve(makeToken(userData[0]._doc)) : reject('user not found or password does not match'))))
        : reject('missing data'));

const makeToken = (user) =>
    ({...user, token: jwt.sign({ user_id: user._id, email: user.email }, process.env.SECURITY_KEY, { expiresIn: "8h" })});

//await bcrypt.compare(password, user.password)

export const sanitizeUser = async({ first_name, last_name, email, password }) => {
    if([first_name, email, password].filter((e)=> !notEmpty(e)) == 0){
            const hashed = await bcrypt.hash(password, 10);
            const lowerCase = email.toLowerCase();
            return { first_name, last_name, email: lowerCase, password: hashed }
    }
    throw new Error('missing data')
}
//    const password = await bcrypt.hash(rawPass);

export const login2 = async(email, password) => {
    if(notEmpty(email) && notEmpty(password)){
        return (async(data) => {
            const userData = await data;
            if(userData.length > 0){
                const matches = await bcrypt.compare(password, userData[0].password);
                if(matches){
                    return makeToken(userData[0]._doc)
                }
            }
            throw new Error('no user found')
        })
        
    }
    throw new Error('missing data')
}
