import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { notEmpty } from '../utility/common'
import { SavedUser, User } from '../collections/interfaces';

const makeToken = ({ _id: user_id, email}: SavedUser) =>
    (jwt.sign({ user_id, email }, process.env.SECURITY_KEY|| 'secret', { expiresIn: "8h" }));


export const sanitizeUser = async({ first_name, last_name, email, password }: User) => {
    if([first_name, email, password].filter((e)=> !notEmpty(e)).length == 0){
            const hashed = await bcrypt.hash(password, 10);
            const lowerCase = email.toLowerCase();
            return { first_name, last_name, email: lowerCase, password: hashed }
    }
    throw new Error('missing data')
}


export const login = (user: SavedUser, password: string) => new Promise((resolve, reject) =>
    bcrypt.compare(user.password, password, (error, result) => error || !result ? reject({error, result}) : resolve({ user, token: makeToken(user)})));