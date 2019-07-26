import express from 'express';
import { validationResult,check } from 'express-validator';
import container from '../../models /qwerymodel';
import logger from '../../logging/logger';

const router = express.Router();

router.post('/signup',[
    check('user','invalid Email').isEmail().normalizeEmail(),
    check('firstName', 'Your last name must be atleast 3 characters').isLength({ min: 3 }).trim().escape(),
    check('surName', 'Your last name must be atleast 3 characters').isLength({ min: 3 }).trim().escape(),
    check('password', 'Your Password must be atleast 8 characters').isLength({ min: 8 }).escape(),
],  async (req,res)=>{
        try {
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
                logger.error('details containing error '+errors)
                return res.json({error :'details containing error'});
            }
            const ret = await container.insertData(req.body);
            await res.json(ret);
        }
        catch(err) {
            return err
        }
})
router.post('/login', [
    check('password', 'Your Password must be atleast 8 characters').isLength({ min: 8 }).trim().escape(),
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('details containing error '+errors)
        return res.json({error :'details containing error'});
    }
    const ret = await container.checkData(req.body);
    await res.json(ret);
})
module.exports = router;
    