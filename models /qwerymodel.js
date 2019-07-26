import bcrypt from 'bcryptjs';
import logger from '../logging/logger';
import jwt from 'jsonwebtoken';
import pool from './database';


const SECRET='mysecret';


module.exports ={
    async insertData(data){
        try {
            const [row] = await pool.execute(`SELECT * FROM userDetails where user=?`, [data.user]);
            if(row[0]===undefined){

                data.password=bcrypt.hashSync(data.password, 10);
                await pool.query(`INSERT INTO userDetails SET ? `, [data]);
                const token = jwt.sign({
                    email:data.user,
                    firstname:data.firstName,
                    lastname:data.surName,
                    gender:data.gender,
                    dob:data.DOB
                },SECRET)
                await logger.info("user created");
                return {signup :'user created',token};    
            }
            else{
            await logger.info("user exists");
            return {error :'user exists'};
            }
        }
         catch (error) {
			await logger.info(`error in insertion of data:${error}`);
		}
    } ,
    async checkData(data){
        const username = data.user;
        let User;
        if(username.includes('@')){
            [User] = await  pool.execute(`SELECT * FROM userDetails where user=?`, [data.user]);
        }
        else{
            [User] = await  pool.execute(`SELECT * FROM userDetails where Ph_Number=?`, [data.user]);
        }
        if (User[0]===undefined) {
            await logger.info("username doesnot exists");
            return {error :'username doesnot exists'};
        }else{
            const password =  data.password;
        const userpass = await User[0].password;
        if (bcrypt.compareSync(password, userpass)) {
            const token = jwt.sign({
                    email:User[0].user,
                    firstname:User[0].firstName,
                    lastname:User[0].surName,
                    gender:User[0].gender,
                    dob:User[0].DOB
                },SECRET)
            
            await logger.info("user sucesfully login");
            return {login :'user sucesfully login',token};
        } else {
            await logger.error("enter correct password");
            return {error :'enter correct password'};
        }
        }
        
    }
}
