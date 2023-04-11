import { Router } from 'express';
import model from './model.js'
import users from '../collections/users.js';
import userData from '../../users.json' assert { type: 'json' };

let router = Router();

router.post('/api/signup', (req, res) => {

    res.send({"some": "thing"})
});
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


export default router