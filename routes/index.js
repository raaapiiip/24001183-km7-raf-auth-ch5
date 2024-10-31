const express = require('express');
const router = express.Router();
const carRouter = require('./carRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

router.use('/cars', carRouter);
router.use('/users', userRouter);
router.use('/auths', authRouter);

module.exports = router;
