import { Router } from 'express';
import model from './model.js'
import users from '../collections/users.js';
import classes from '../collections/classes.js';
import attendees from '../collections/attendees.js';
import { login, sanitizeUser } from './userLogin.js';
// import userData from '../../users.json' assert { type: 'json' };


// do something with actual error
const logAndSend = (errorToLog, res, error) => {
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
    login(email, password)
        .then((passwordMatches) => passwordMatches(usersModel.getByCondition({ email })))
        .then((user) => res.send(user))
        .catch((error) => logAndSend(error, res, "UserNotFound")); //maybe show in API if the request was wrong?
});

//login example with await
router.post('/api/login2', async(req, res) => {
    const usersModel = model(users);
    const { body: { email, password } } = req;
    try{
        const passwordMatches = await login(email, password);
        const user = await passwordMatches(usersModel.getByCondition({ email }));
        res.send(user)
    } catch(error) {
        logAndSend(error, res, "UserNotFound")
    }
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
    attendeesModel.deleteByCondition({ email, class_id })
        .then((deleteCount) => classesModel.getOne(class_id))
        .then((data) => res.send(data))
        .catch((error)=> logAndSend(error, res, "could not delete subscription"));
});

router.post('/api/subscribe', (req, res) => {
    const { body: { class_id, username } } = req;
    const usersModel = model(users);
    const classesModel = model(classes);
    const attendeesModel = model(attendees);
    const userByName = (userData) => `${userData.first_name} ${userData.last_name}`.trim()
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