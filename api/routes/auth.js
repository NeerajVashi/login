/* eslint-disable no-tabs */
import express from 'express';
import { validationResult, check } from 'express-validator';
import container from '../../models /qwerymodel';
import logger from '../../logging/logger';
import multer from 'multer';
require('dotenv').config();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})

const router = express.Router();

router.post('/signup', [check('user', 'invalid Email').isEmail().normalizeEmail(),
	check('firstName', 'Your last name must be atleast 3 characters').isLength({ min: 3 }).trim().escape(),
	check('surName', 'Your last name must be atleast 3 characters').isLength({ min: 3 }).trim().escape(),
	check('password', 'Your Password must be atleast 8 characters').isLength({ min: 8 }).escape(),
], async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			logger.error(`details containing error ${errors}`);
			return res.json({
				msg: 'Password should contain atleast 8 character', status: false, token: '', user: '',
			});
		}
		const ret = await container.insertData(req.body);
		await res.json(ret);
	} catch (err) {
		return err;
	}
});
router.put('/signup',async (req,res)=>{
	const [user] = await container.updateData(req.body);
	await logger.info('updated');
	res.json(user);
})

router.put('/signup/updateprofilepic/',upload.single('Profile_pic'),async (req,res)=>{
	if(req.file===undefined){
        logger.error('upload an image')
        res.json({error:'upload an image '})
    }else{
    const data={
        id :req.body.userId,
        Profile_pic:`http://localhost:${process.env.PORT}/`+req.file.path,
    }
	const [user] = await container.updateProfilePic(data);
	await res.json(user);  
    }
})


router.put('/signup/updatecoverpic/',upload.single('Cover_pic'),async (req,res)=>{
	if(req.file===undefined){
        logger.error('upload an image')
        res.json({error:'upload an image '})
    }else{
    const data={
        id :req.body.userId,
        Cover_pic:`http://localhost:${process.env.PORT}/`+req.file.path,
    }
	const [user] = await container.updateCoverPic(data);
	await res.json(user);  
    }
})

router.post('/login', [
	check('password', 'Your Password must be atleast 8 characters').isLength({ min: 8 }).trim().escape(),
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		logger.error(`details containing error ${errors}`);
		return res.json({
			msg: 'password should contain atleast 8 character', status: false, token: '', user: '',
		});
	}
	const ret = await container.checkData(req.body);
	await res.json(ret);
});
module.exports = router;
