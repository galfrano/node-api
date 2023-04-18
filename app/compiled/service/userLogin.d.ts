import { SavedUser, User } from '../collections/interfaces';
export declare const sanitizeUser: ({ first_name, last_name, email, password }: User) => Promise<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}>;
export declare const login: (user: SavedUser, password: string) => Promise<unknown>;
