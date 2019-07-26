/* eslint-disable no-console */
/* eslint-disable no-tabs */

const mysql = require('mysql2/promise');

require('dotenv').config();


const sqlConfig = {
	host: process.env.DB_HOST,
	user: process.env.USER_HERE,
	password: process.env.DB_PASS,
	connectionLimit: 10,
	queueLimit: 0,
};
const pool1 = mysql.createPool(sqlConfig);

pool1.getConnection(function (error, connection) {

	console.log(error);

});
async function createDatabase() {
    await pool1.execute(`create database IF NOT EXISTS ${process.env.db}`);
	await console.log('created');
}

const sqlConfig1 = {
	host: process.env.DB_HOST,
	user: process.env.USER_HERE,
	password: process.env.DB_PASS,
	database: process.env.db,
	connectionLimit: 10,
	queueLimit: 0,
};
const pool = mysql.createPool(sqlConfig1);

async function deleteTable() {
	await pool.query(' DROP TABLE IF EXISTS userDetails ');
}

async function createTable() {
    await pool.execute('CREATE TABLE userDetails (`id` INT NOT NULL AUTO_INCREMENT,`firstName` VARCHAR(45) NOT NULL,`surName` VARCHAR(45) NOT NULL,`user` VARCHAR(100) NOT NULL,`password` VARCHAR(500) NOT NULL,`Ph_Number` VARCHAR(45) NULL,`gender` VARCHAR(45) NOT NULL,`DOB` VARCHAR(45) NOT NULL,`Workedat` VARCHAR(500) NULL,`Wentto` VARCHAR(500) NULL,`Livesin` VARCHAR(500) NULL,`Marital_Status` VARCHAR(45) NULL,`Followed_by` INT NULL ,`Address` VARCHAR(500) NULL,`Profile_pic` VARCHAR(200) NULL,`Cover_pic` VARCHAR(500) NULL,PRIMARY KEY (`id`));');
	await console.log('created');
}

async function script() {
	await createDatabase();
	await deleteTable();
	await createTable();
}
script();
module.exports = script;
