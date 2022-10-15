const router = require('express').Router();
const jujuController = require('./controllers/juju.controller');
const messageController = require('./controllers/message.controller');
const userController = require('./controllers/user.controller');
const auth = require('./middleware/auth');

router.post('/juju', auth, jujuController.createJuju);

router.post('/message', auth, messageController.createMessage);

router.post('/signup', auth, userController.createUser);
router.post('/login', auth, userController.logInUser);
router.get('/userbytoken', auth, userController.getUserByToken);

module.exports = router;
