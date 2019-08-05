/* eslint-disable no-tabs */
import express from 'express';
const app = express();
const http =require('http').createServer(app);
const io = require('socket.io').listen(http);


import bodyparser from 'body-parser';
import cors from 'cors';
import logger from '../logging/logger';

import container from '../models /qwerymodel'

import auth from '../api/routes/auth';
import users from '../api/routes/user';

import alowmidle from '../middleware/allow';

require('dotenv').config();

app.use('/uploads', express.static('uploads'));

app.use(bodyparser.urlencoded({
	extended: true,
}));

let userlist=[];
let onlineusers=[];

let cuserid=0;

app.use(bodyparser.json());
app.use(cors());



app.use('/auth', alowmidle, auth);

app.use('/user', users);

io.on('connection',async (socket)=>{
	const socketid= await socket.id;
	await userlist.push(socket);
	await socket.on('useridsend', async function (data) {
		cuserid=await data.my;
	await logger.info(`user connected : ${userlist.length}`);
	await container.insertOnlineUser(socketid,cuserid);
	const userdetail = await container.showUserDetails(cuserid);
	if(userdetail.length>0){
		const id=userdetail[0].id;
		const name=userdetail[0].firstName;
		await container.updateUserStatus(id);
		onlineusers=[];
		const onlineusersresult = await container.getOnlineUsers();
		let ouser={};
		
		Object.keys(onlineusersresult).forEach(key=>{
			const row=onlineusersresult[key];
			ouser={Name:row.firstName,id:row.id}
			onlineusers.push(ouser);
		})
		io.emit('userloggedin',onlineusers,cuserid);
	}
		//await console.log(userdetail);
	});
	



    socket.on('disconnect',async ()=>{
		userlist.splice(userlist.indexOf(socket),1);
			logger.info(`user diconnected ${userlist.length}`);
			let userid=0;
			const useriddetail = await container.getUserIdOnline(socketid);
			if(useriddetail.length>0){
				userid=useriddetail[0].userid;
				await container.updateUserStatusZero(userid);
			}
			await container.deleteFromOnline(socketid);
			const onlineusershow = await container.onlineUserShow(userid);
			if(onlineusershow.length ==0){
				await container.updateUserStatusZero(userid);
			}
			onlineusers=[];

			const onlineusersresult = await container.getOnlineUsers();
			let ouser={};
		
			Object.keys(onlineusersresult).forEach(key=>{
				const row=onlineusersresult[key];
				ouser={Name:row.firstName,id:row.id}
				onlineusers.push(ouser);
			})
			io.emit('userloggedin',onlineusers,cuserid);
    })
})



http.listen(process.env.PORT, () => {
	logger.info(`server running ${process.env.PORT}`);
});

module.exports = app;
