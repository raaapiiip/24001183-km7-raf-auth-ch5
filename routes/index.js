const express = require('express');
const carRouter = require('./carRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

const router = express.Router();

router.use('/cars', carRouter);
router.use('/users', userRouter);
router.use('/auths', authRouter);

module.exports = router;
