import { Router, Request, Response } from 'express';
import model from './model.js'
import users from '../collections/users.js';
import classes from '../collections/classes.js';
import attendees from '../collections/attendees.js';
import { login, sanitizeUser, validateToken } from './userLogin.js';
import { notEmpty, getName } from '../utility/common.js';
import { Atteendee, SavedClass, SavedUser } from '../collections/interfaces.js';
import { createDummyData, subscribeUsers } from '../utility/loadDummyData.js';
//import userData from '../utility/dummyUsers.js';


// do something with actual error
const logAndSend = (errorToLog: any, res: Response, error: string) => {
    console.log({ "Application Exception": errorToLog });
    res.status(400).send({ error });
}

const classWithSubscribers = (classData: SavedClass, attendees: Atteendee[]) => {
    const aggregated = classData.toObject();
    aggregated.attendees = attendees.map((a) => a.name)
    return aggregated;
}

const classesWithSubscribers = (classData: SavedClass[], attendees: Atteendee[]) => {
    const aggregated = [];
    for(let c of classData){
        aggregated.push(classWithSubscribers(c, attendees.filter((a) => a.class_id == c._id)));
    }
    return aggregated;
}

let router = Router();

// user
router.post('/api/signup', (req: Request, res: Response) => {
    const usersModel = model(users);
    sanitizeUser(req.body)
        .then((user) => usersModel.post(user))
        .then((data) => res.send(data))
        .catch((error) => logAndSend(error, res, "could not add user"));
});

router.post('/api/login', (req: Request, res: Response) => {
    const usersModel = model(users);
    const { body: { email, password } } = req;
    notEmpty(email) && notEmpty(password) || logAndSend('missing data', res, 'missing data');
    usersModel.getByCondition({ email })
        .then(([ user ]) => login(user, password))
        .then((userWithToken) => res.send(userWithToken))
        .catch((error) => logAndSend(error, res, "UserNotFound"));
});

// class
// definition specifies username being sent so we just validate that the email in token matches username
router.post('/api/class', (req: Request, res: Response) => {
    const classesModel = model(classes);
    const create_date = new Date().toISOString();
    validateToken(req.body.username, req)
        .then(() => classesModel.post({...req.body, create_date}))
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not create new class"));
});

router.delete('/api/class/:id', (req: Request, res: Response) => {
    const { params: { id } } = req;
    const classesModel = model(classes);
    classesModel.getOne(id)
        .then(({ created_by }) => validateToken(created_by, req))
        .then(() => classesModel.delete(id))
        .then((data) => res.send({ "acknowledged": true, "deletedCount": data }))
        .catch((error) => logAndSend(error, res, "could not delete class"));
});

router.put('/api/class/:id', (req: Request, res: Response) => {
    const { params: { id }, body } = req;
    const classesModel = model(classes);
    classesModel.getOne(id)
        .then(({ created_by }) => validateToken(created_by, req))
        .then(() => classesModel.put(id, body))
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not update class"));
});

router.get('/api/class/:id', (req: Request, res: Response) => {
    const { params: { id } } = req;
    const classesModel = model(classes);
    const attendeesModel = model(attendees);
    Promise.all([classesModel.getOne(id), attendeesModel.getByCondition({class_id: id})])
        .then(([classData, attendees]) => res.send(classWithSubscribers(classData, attendees)))
        .catch((error)=> logAndSend(error, res, "could not retrieve class data"));
});

router.get('/api/class', (req: Request, res: Response) => {
    const classesModel = model(classes);
    const attendeesModel = model(attendees);
    Promise.all([classesModel.get(), attendeesModel.get()])
        .then(([classData, attendees]) => res.send(classesWithSubscribers(classData, attendees)))
        .catch((error)=> logAndSend(error, res, "could not retrieve class data"));
});

// subscription (only by user)
router.delete('/api/subscribe', (req: Request, res: Response) => {
    const { body: { class_id, username } } = req;
    const classesModel = model(classes);
    const attendeesModel = model(attendees);
    validateToken(username, req)
        .then(() => attendeesModel.deleteByCondition({ username, class_id }))
        .then(() => classesModel.getOne(class_id))
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not delete subscription"));
});

router.post('/api/subscribe', (req: Request, res: Response) => {
    const { body: { class_id, username } } = req;
    const usersModel = model(users);
    const classesModel = model(classes);
    const attendeesModel = model(attendees);
    const userByName = (userData: SavedUser) => getName(userData)
    validateToken(username, req)
        .then(()=> usersModel.getByCondition({ email: username }))
        .then((userData) => attendeesModel.post({ username, class_id, name: userByName(userData)}))
        .then(() => classesModel.getOne(class_id))
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not add subscription")); // this error could be inaccurate
});


/* TESTING */

router.delete('/api/testing/users/deleteall', (req: Request, res: Response) => {
    const { params: { id } } = req;
    const usersModel = model(users);
    usersModel.deleteAll()
        .then(() => res.send({message: "users deleted"}))
        .catch((error) => logAndSend(error, res, "could not delete users"));
});

router.delete('/api/testing/classes/deleteall', (req: Request, res: Response) => {
    const { params: { id } } = req;
    const classesModel = model(classes);
    classesModel.deleteAll()
        .then(() => res.send({message: "classes deleted"}))
        .catch((error) => logAndSend(error, res, "could not delete classes"));
});

router.post('/api/testing/classes/reset', (req: Request, res: Response) => {
    createDummyData()
        .then(() =>res.send({"msg": "dummy data created"}))
        .catch((error) => logAndSend(error, res, "could not complete"));
});

router.post('/api/testing/subscribers/reset', (req: Request, res: Response) => {
    subscribeUsers()
        .then(() =>res.send({"msg": "dummy data created"}))
        .catch((error) => logAndSend(error, res, "could not complete"));
});

router.get('/api/testing/users', (req: Request, res: Response) => {
    const usersModel = model(users);
    usersModel.get().then((data) => 
        res.send(data)
    );
});

export default router