import { Router, Request, Response } from 'express';
import model from './model'
import users from '../collections/users';
import classes from '../collections/classes';
import attendees from '../collections/attendees';
import { login, sanitizeUser } from './userLogin';
import { notEmpty } from '../utility/common';
import { SavedUser } from '../collections/interfaces';
// import userData from '../../users.json' assert { type: 'json' };


// do something with actual error
const logAndSend = (errorToLog: any, res: Response, error: string) => {
    console.log({ "Application Exception": errorToLog });
    res.status(400).send({ error });
}

let router = Router();

// user
router.post('/api/signup', (req, res) => {
    const usersModel = model(users);
    sanitizeUser(req.body)
        .then((user) => usersModel.post(user))
        .then((data) => res.send(data))
        .catch((error) => logAndSend(error, res, "could not add user"));
});

router.post('/api/login', (req, res) => {
    const usersModel = model(users);
    const { body: { email, password } } = req;
    notEmpty(email) && notEmpty(password) || logAndSend('missing data', res, 'missing data');
    usersModel.getByCondition({ email })
        .then(([ user ]) => login(user, password))
        .then((userWithToken) => res.send(userWithToken))
        .catch((error) => logAndSend(error, res, "UserNotFound"));
});

// class
router.post('/api/class', (req, res) => {
    const classesModel = model(classes);
    const create_date = new Date().toISOString();
    classesModel.post({...req.body, create_date})
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not create new class"));
});

router.delete('/api/class/:id', (req, res) => {
    const { params: { id } } = req;
    const classesModel = model(classes);
    classesModel.delete(id)
        .then((data) => res.send({ "acknowledged": true, "deletedCount": data }))
        .catch((error) => logAndSend(error, res, "could not delete class"));
});

router.put('/api/class/:id', (req, res) => {
    const { params: { id }, body } = req;
    const classesModel = model(classes);
    classesModel.put(id, body)
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not update class"));
});

router.get('/api/class/:id', (req, res) => {
    const { params: { id } } = req;
    const classesModel = model(classes);
    classesModel.getOne(id)
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not retrieve class data"));
});

router.get('/api/class', (req, res) => {
    const classesModel = model(classes);
    classesModel.get()
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not retrieve class data"));
});

// subscription
router.delete('/api/subscribe', (req, res) => {
    const { body: { class_id, username } } = req;
    const classesModel = model(classes);
    const attendeesModel = model(attendees);
    attendeesModel.deleteByCondition({ username, class_id })
        .then((deleteCount) => classesModel.getOne(class_id))
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not delete subscription"));
});

router.post('/api/subscribe', (req, res) => {
    const { body: { class_id, username } } = req;
    const usersModel = model(users);
    const classesModel = model(classes);
    const attendeesModel = model(attendees);
    const userByName = (userData: SavedUser) => `${userData.first_name} ${userData.last_name}`.trim()
    usersModel.getByCondition({ email: username })
        .then((userData) => attendeesModel.post({ username, class_id, name: userByName(userData)}))
        .then((resultNotUsed) => classesModel.getOne(class_id))
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not add subscription")); // this error could be inaccurate
});

/*
router.get('/api/users', (req, res) => {
    const usersModel = model(users);
    usersModel.get().then((data) => 
        res.send(data)
    );
});

router.get('/api/create-users', (req, res) => {
    const usersModel = model(users);
    usersModel.postMany(userData).then((data) => 
        res.send(data)
    );
});
*/

export default router