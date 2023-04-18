import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { notEmpty } from '../utility/common.js'

const makeToken = ({ _id: user_id, email}) =>
    (jwt.sign({ user_id, email }, process.env.SECURITY_KEY, { expiresIn: "8h" }));


export const sanitizeUser = async({ first_name, last_name, email, password }) => {
    if([first_name, email, password].filter((e)=> !notEmpty(e)) == 0){
            const hashed = await bcrypt.hash(password, 10);
            const lowerCase = email.toLowerCase();
            return { first_name, last_name, email: lowerCase, password: hashed }
    }
    throw new Error('missing data')
}


export const login = (user, password) => new Promise((resolve, reject) =>
    bcrypt.compare(user.password, password, (error, result) => error || !result ? reject({error, result}) : resolve({ user, token: makeToken(user)})));