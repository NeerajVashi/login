/* eslint-disable no-tabs */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../logging/logger';
import pool from './database';


const SECRET = 'mysecret';


module.exports = {
	async insertData(data) {
		try {
			const [row] = await pool.execute('SELECT * FROM userDetails where user=?', [data.user]);
			if (row[0] === undefined) {
				data.password = bcrypt.hashSync(data.password, 10);
				await pool.query('INSERT INTO userDetails SET ? ', [data]);
				const tokenvalue = jwt.sign({
					email: data.user,
					firstname: data.firstName,
					lastname: data.surName,
					gender: data.gender,
					dob: data.DOB,
				}, SECRET);
				await logger.info('user created');
				return {
					msg: 'user is successfully inserted', status: true, token: tokenvalue, user: row,
				};
			}

			await logger.info('user exists');
			return {
				msg: 'user already exists', status: false, token: '', user: '',
			};
		} catch (error) {
			await logger.info(`error in insertion of data:${error}`);
		}
	},
	async checkData(data) {
		const username = data.user;
		let User;
		if (username.includes('@')) {
			[User] = await pool.execute('SELECT * FROM userDetails where user=?', [data.user]);
		} else {
			[User] = await pool.execute('SELECT * FROM userDetails where Ph_Number=?', [data.user]);
		}
		if (User[0] === undefined) {
			await logger.info('username does not exists');
			return {
				msg: 'username does not exists', status: false, token: '', user: '',
			};
		}
		const { password } = data;
		const userpass = await User[0].password;
		if (bcrypt.compareSync(password, userpass)) {
			const tokenvalue = jwt.sign({
				email: User[0].user,
				firstname: User[0].firstName,
				lastname: User[0].surName,
				gender: User[0].gender,
				dob: User[0].DOB,
			}, SECRET);

			await logger.info('user successfully login');
			return {
				msg: 'user successfully login', token: tokenvalue, status: true, user: User,
			};
		}
		await logger.error('enter correct password');
		return {
			msg: 'enter correct password', token: '', status: false, user: '',
		};
	},
	async updateData(data){
		await pool.query(`update userDetails set ? where id =? `, [data,data.id]);
        await logger.info("profile updated ");
	},
	async updateProfilePic(data){
		await pool.query(`update userDetails set Profile_pic = ?  where id =? `, [data,data.id])
		await logger.info("profile image updated");
		return[{id:data.id , Profile_pic:data.Profile_pic}];
	},
	async updateCoverPic(data){
		await pool.query(`update userDetails set Cover_pic = ?  where id =? `, [data,data.id])
		await logger.info("cover image updated");
		return[{id:data.id , Cover_pic:data.Cover_pic}];
	}
};
