import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { notEmpty } from '../utility/common.js'
import { SavedUser, User, JwtPayload } from '../collections/interfaces.js';
import { Request } from 'express';

const makeToken = ({ _id: user_id, email}: SavedUser) =>
    (jwt.sign({ user_id, email }, process.env.SECURITY_KEY|| 'secret', { expiresIn: "8h" }));


export const sanitizeUser = async({ first_name, last_name, email, password }: User) => {
    if([first_name, email, password].filter((e)=> !notEmpty(e)).length == 0){
            const hashed = await bcrypt.hash(password, 10);
            console.log({hashed})
            const lowerCase = email.toLowerCase();
            return { first_name, last_name, email: lowerCase, password: hashed }
    }
    throw new Error('missing data')
}

// this function is not asynchronous, but we return a promise to start the chain sometimes (in the middle throw is enough)
export const validateToken = (email: string, req: Request) => new Promise(() => {
    const token = req.headers.authorization;
    const { email: tokenEmail, user_id } = jwt.decode(token) as JwtPayload;
    if(email == tokenEmail){
        throw Error(`Authentication error, token: ${tokenEmail}, email: ${email}`);
    }
})

export const login = (user: SavedUser, password: string) => new Promise((resolve, reject) =>
    bcrypt.compare(password, user.password, (error, result) => error || !result ? reject({error, result, password, hash:user.password}) : resolve({ user, token: makeToken(user)})));