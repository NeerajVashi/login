/* eslint-disable no-tabs */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../logging/logger';
import pool from './database';

const SECRET = 'mysecret';

module.exports = {



	async insertOnlineUser(socketid,userid){
		const data={
			socketid:socketid,
			userid:userid
		}
		try {
			await pool.query('insert into onlineusers set ?',[data]);
			await logger.info(`inserted online user`);
		} catch (err) {
			await logger.info(`error in inserting online user:${err}`);
			return [{ err }];
		}
	},
	async showUserDetails(cuserid){
		try {
			const [user] = await pool.execute('select  id ,firstName from userDetails where id = ? ',[cuserid]);
			await logger.info(`showed user`);
			return user;
		} catch (err) {
			await logger.info(`error in showing user:${err}`);
			return [{ err }];
		}
	},
	async updateUserStatus(id){
		try {
			await pool.query('update userDetails set onlinestatus ="1" where id = ? ',[id]);
			await logger.info(`updated online status of user`);
		} catch (err) {
			await logger.info(`error in showing user:${err}`);
			return [{ err }];
		}
	},

	async getOnlineUsers(){
		try {
			const [user] = await pool.execute('select u.id , u.firstName , ou.socketid from onlineusers ou left join userDetails u ON u.id=ou.userid where onlinestatus=1 group by userid');
			await logger.info(`showed online user`);
			return user;
		} catch (err) {
			await logger.info(`error in showing online user:${err}`);
			return [{ err }];
		}
	},

	async getUserIdOnline(socketid){
		try {
			const [user] = await pool.execute('select  userid from onlineusers where socketid = ? ',[socketid]);
			await logger.info(`showing user with socketid`);
			return user;
		} catch (err) {
			await logger.info(`error in showing user with socketid:${err}`);
			return [{ err }];
		}
	},
	async updateUserStatusZero(id){
		try {
			await pool.query('update userDetails set onlinestatus ="0" where id = ? ',[id]);
			await logger.info(`updated online status of user`);
		} catch (err) {
			await logger.info(`error in showing user:${err}`);
			return [{ err }];
		}
	},
	async deleteFromOnline(socketid){
		try {
			await pool.query('delete from onlineusers where socketid = ? ',[socketid]);
			await logger.info(`deleted online  user`);
		} catch (err) {
			await logger.info(`error in deleting user from online :${err}`);
			return [{ err }];
		}
	},
	async onlineUserShow(userid){
		try {
			const [user] = await pool.execute('select  userid from onlineusers where userid = ? ',[userid]);
			await logger.info(`showing user with userid`);
			return user;
		} catch (err) {
			await logger.info(`error in showing user with userid:${err}`);
			return [{ err }];
		}
	},
	async getRegisteredUsers() {
		try {
			const users = await pool.execute('SELECT * from userDetails');
			return users;
		} catch (err) {
			await logger.info(`error in getUser:${err}`);
			return [{ err }];
		}
	},
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
		const user = await pool.query(`SELECT * FROM userDetails where id=?`, [data.id]);
		await logger.info("profile updated ");
		return user;
	},
	
	async updateProfilePic(data){
		await pool.query(`update userDetails set Profile_pic = ?  where id =? `, [data,data.id])
		const user = await pool.query(`select * from userDetails  where id =? `, [data.id])
		await logger.info("profile image updated");
		return user;
	},
	async updateCoverPic(data){
		await pool.query(`update userDetails set Cover_pic = ?  where id =? `, [data,data.id])
		const user = await pool.query(`select * from userDetails  where id =? `, [data.id])
		await logger.info("cover image updated");
		return user;
	},
	async getUsers(id) {
		try {
			const [users] = await pool.execute('SELECT * FROM userDetails where id != ?', [id]);
			return users;
		} catch (err) {
			await logger.info(`error in getUser:${err}`);
			return {
				msg: 'err fetched', status: true, users: '',
			};
		}
	}
};