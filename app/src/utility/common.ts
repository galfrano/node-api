import { User } from '../collections/interfaces';

export const notEmpty = (someVar: any) =>
  typeof someVar == 'string' && someVar.length != 0;

export const getName = (userData: User) =>
  `${userData.first_name} ${userData.last_name || ''}`.trim();
