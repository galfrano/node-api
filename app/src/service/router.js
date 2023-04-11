import { Router } from 'express';
import model from './model.js'
import users from '../collections/users.js';
import classes from '../collections/classes.js';
import attendees from '../collections/attendees.js';
//import userData from '../../users.json' assert { type: 'json' };

let router = Router();

// user
router.post('/api/signup', (req, res) => {
    const usersModel = model(users);
    try{
        usersModel.post(req.body).then((data) => res.send(data))
    } catch(error) {
        res.status(400).send({"error": "could not add user"})
    }
});

router.post('/api/login', (req, res) => {
    const usersModel = model(users);
    const { body: { email, password } } = req;
    try{
        if(email){
            usersModel.getByCondition({email}).then((data) => {
                if(data.length > 0 && data[0]['password'] == password){
                    res.send(data)
                }
            })
        }
    } catch(error) {
        res.status(400).send({"error": "UserNotFound"})
    }
});

// class
router.post('/api/class', (req, res) => {
    const classesModel = model(classes);
    try{
        const create_date = new Date().toISOString()
        classesModel.post({...req.body, create_date}).then((data) => res.send(data))
    } catch(error) {
        console.log(error)
        res.status(400).send({"error": "could not create new class "})
    }
});
router.delete('/api/class/:id', (req, res) => {
    const { params: { id } } = req;
    const classesModel = model(classes);
    try{
        classesModel.delete(id).then((data) => {
            res.send({
                "acknowledged": true,
                "deletedCount": data
              })
        })
    } catch(error) {
        res.status(400).send({"error": "could not delete class"})
    }
});
router.put('/api/class/:id', (req, res) => {
    const { params: { id }, body } = req;
    const classesModel = model(classes);
    try{
        classesModel.put(id, body).then((data) => {
            res.send(data)
        })
    } catch(error) {
        res.status(400).send({"error": "could not update class"})
    }
});
router.get('/api/class/:id', (req, res) => {
    const { params: { id } } = req;
    const classesModel = model(classes);
    try{
        classesModel.getOne(id).then((data) => {
            res.send(data)
        })
    } catch(error) {
        res.status(400).send({"error": "could not retrieve class data"})
    }
});
router.get('/api/class', (req, res) => {
    const classesModel = model(classes);
    try{
        classesModel.get().then((data) => {
            res.send(data)
        })
    } catch(error) {
        res.status(400).send({"error": "could not retrieve class data"})
    }
});

// subscription
router.delete('/api/subscribe', (req, res) => {
    const { body: { class_id, username } } = req;
    const classesModel = model(classes);
    const attendeesModel = model(attendees);
    try{
        attendeesModel.deleteByCondition({email, class_id}).then((data) => {
            classesModel.getOne(class_id).then((data) => 
                res.send(data)
            )
        })
    } catch(error) {
        res.status(400).send({"error": "could not delete subscription"})
    }
});

router.post('/api/subscribe', (req, res) => {
    const { body: { class_id, username } } = req;
    const usersModel = model(users);
    const classesModel = model(classes);
    const attendeesModel = model(attendees);
    try{
        usersModel.getByCondition({email}).then((userData) => {
            const { first_name, last_name } = userData;
            return attendeesModel.post({email, class_id, name: `${first_name} ${last_name}`.trim()})
        }).then((data) => classesModel.getOne(class_id))
        .then((data) => res.send(data))
    } catch(error) {
        res.status(400).send({"error": "could not delete subscription"})
    }
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