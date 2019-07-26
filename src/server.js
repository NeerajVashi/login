/* eslint-disable no-tabs */
import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import logger from '../logging/logger';

import auth from '../api/routes/auth';

import alowmidle from '../middleware/allow';

require('dotenv').config();

const app = express();
app.use(bodyparser.urlencoded({
	extended: true,
}));

app.get('/',(req,res)=>{
    res.send('he');
})
app.use(bodyparser.json());
app.use(cors());
app.use('/auth', alowmidle, auth);


app.listen(process.env.PORT, () => {
	logger.info('server running');
});

module.exports = app;
