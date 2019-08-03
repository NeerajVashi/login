/* eslint-disable no-tabs */
import express from 'express';
import container from '../../models /qwerymodel';

const router = express.Router();

router.get('/:id', async (req, res) => {
	const userId = req.params.id;
	const users = await container.getUsers(userId);
	console.log('users', users);
	// const loginRequest = `http://localhost:8002/friends/${userId}`;
	// await fetch(loginRequest).then(response => response.json())
	// 	.then((user) => {
	// 		res.status(200).json(user);
	// 	});
	// const loginRequest = `http://localhost:8001/friends/friend/${userId}`;
	// await fetch(loginRequest).then(response => response.json())
	// 	.then((user) => {
	// 		res.status(200).json(user);
	// 	});
	return res.json(users);
});
// const loginRequest = `http://localhost:8000/user/${id}`;
// await fetch(loginRequest).then(response => response.json())
//   .then((user) => {
//     res.status(200).json(user);
//   });
module.exports = router;