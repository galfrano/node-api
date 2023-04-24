import userData from './dummyUsers.js';
import getDummyClass from './dummyClasses.js';
import model from '../service/model.js';
import users from '../collections/users.js';
import classes from '../collections/classes.js';
import attendees from '../collections/attendees.js';
import { sanitizeUser } from '../service/userLogin.js';
import { getName } from './common.js';

export const createDummyData = async () => {
  const usersModel = model(users);
  const classesModel = model(classes);
  const dummyClasses = userData.map((u) => getDummyClass(u));
  Promise.all(userData.map((u) => sanitizeUser(u)))
    .then((hashedUsers) => usersModel.postMany(hashedUsers))
    .then(() => classesModel.postMany(dummyClasses));
  return true;
};

export const subscribeUsers = async () => {
  const attendeesModel = model(attendees);
  const classesModel = model(classes);
  const availableClasses = await classesModel.get();
  for (let c of availableClasses) {
    const subscribers = userData
      .filter((u) => u.email != c.created_by)
      .map((user) => ({
        class_id: c._id,
        username: user.email,
        name: getName(user),
      }));
    await attendeesModel.postMany(subscribers);
  }
};
