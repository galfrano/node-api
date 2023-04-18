"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_1 = __importDefault(require("./model"));
const users_1 = __importDefault(require("../collections/users"));
const classes_1 = __importDefault(require("../collections/classes"));
const attendees_1 = __importDefault(require("../collections/attendees"));
const userLogin_1 = require("./userLogin");
const common_1 = require("../utility/common");
const logAndSend = (errorToLog, res, error) => {
    console.log({ "Application Exception": errorToLog });
    res.status(400).send({ error });
};
let router = (0, express_1.Router)();
router.post('/api/signup', (req, res) => {
    const usersModel = (0, model_1.default)(users_1.default);
    (0, userLogin_1.sanitizeUser)(req.body)
        .then((user) => usersModel.post(user))
        .then((data) => res.send(data))
        .catch((error) => logAndSend(error, res, "could not add user"));
});
router.post('/api/login', (req, res) => {
    const usersModel = (0, model_1.default)(users_1.default);
    const { body: { email, password } } = req;
    (0, common_1.notEmpty)(email) && (0, common_1.notEmpty)(password) || logAndSend('missing data', res, 'missing data');
    usersModel.getByCondition({ email })
        .then(([user]) => (0, userLogin_1.login)(user, password))
        .then((userWithToken) => res.send(userWithToken))
        .catch((error) => logAndSend(error, res, "UserNotFound"));
});
router.post('/api/class', (req, res) => {
    const classesModel = (0, model_1.default)(classes_1.default);
    const create_date = new Date().toISOString();
    classesModel.post(Object.assign(Object.assign({}, req.body), { create_date }))
        .then((data) => res.send(data))
        .catch((error) => logAndSend(error, res, "could not create new class"));
});
router.delete('/api/class/:id', (req, res) => {
    const { params: { id } } = req;
    const classesModel = (0, model_1.default)(classes_1.default);
    classesModel.delete(id)
        .then((data) => res.send({ "acknowledged": true, "deletedCount": data }))
        .catch((error) => logAndSend(error, res, "could not delete class"));
});
router.put('/api/class/:id', (req, res) => {
    const { params: { id }, body } = req;
    const classesModel = (0, model_1.default)(classes_1.default);
    classesModel.put(id, body)
        .then((data) => res.send(data))
        .catch((error) => logAndSend(error, res, "could not update class"));
});
router.get('/api/class/:id', (req, res) => {
    const { params: { id } } = req;
    const classesModel = (0, model_1.default)(classes_1.default);
    classesModel.getOne(id)
        .then((data) => res.send(data))
        .catch((error) => logAndSend(error, res, "could not retrieve class data"));
});
router.get('/api/class', (req, res) => {
    const classesModel = (0, model_1.default)(classes_1.default);
    classesModel.get()
        .then((data) => res.send(data))
        .catch((error) => logAndSend(error, res, "could not retrieve class data"));
});
router.delete('/api/subscribe', (req, res) => {
    const { body: { class_id, username } } = req;
    const classesModel = (0, model_1.default)(classes_1.default);
    const attendeesModel = (0, model_1.default)(attendees_1.default);
    attendeesModel.deleteByCondition({ username, class_id })
        .then((deleteCount) => classesModel.getOne(class_id))
        .then((data) => res.send(data))
        .catch((error) => logAndSend(error, res, "could not delete subscription"));
});
router.post('/api/subscribe', (req, res) => {
    const { body: { class_id, username } } = req;
    const usersModel = (0, model_1.default)(users_1.default);
    const classesModel = (0, model_1.default)(classes_1.default);
    const attendeesModel = (0, model_1.default)(attendees_1.default);
    const userByName = (userData) => `${userData.first_name} ${userData.last_name}`.trim();
    usersModel.getByCondition({ email: username })
        .then((userData) => attendeesModel.post({ username, class_id, name: userByName(userData) }))
        .then((resultNotUsed) => classesModel.getOne(class_id))
        .then((data) => res.send(data))
        .catch((error) => logAndSend(error, res, "could not add subscription"));
});
exports.default = router;
//# sourceMappingURL=router.js.map