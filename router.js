const router = require('express').Router();
const jujuController = require('./controllers/juju.controller');
const messageController = require('./controllers/message.controller');
const userController = require('./controllers/user.controller');
const auth = require('./middleware/auth');

router.post('/sendjuju', auth, jujuController.sendJuju);
router.post('/fetchjujus', auth, jujuController.fetchJujusByUser);
router.post('/updatejuju', auth, jujuController.updateJuju);

router.post('/message', auth, messageController.createMessage);
router.get('/messages', auth, messageController.getAllMessages);

router.post('/signup', userController.createUser);
router.post('/login', userController.logInUser);
router.get('/userbytoken', auth, userController.getUserByToken);

module.exports = router;
