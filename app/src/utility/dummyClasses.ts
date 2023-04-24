import { ClassI, User } from '../collections/interfaces';
import { getName } from '../utility/common.js';

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export default (userData: User) => ({
  classname: `Class by ${userData.first_name}`,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  location: 'Some location',
  date: randomDate(new Date(2023, 4, 1), new Date()),
  no_of_places: Math.floor(Math.random() * 21),
  created_by: userData.email,
  created_by_name: getName(userData),
  create_date: new Date().toISOString(),
});
