/* eslint-disable no-console */
/* eslint-disable no-tabs */

const mysql = require('mysql2/promise');

require('dotenv').config();


const sqlConfig1 = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_PROJECT,
	port: process.env.RDS_PORT,
	connectionLimit: 10,
    queueLimit: 0,
};

const pool = mysql.createPool(sqlConfig1);
 
async function createAuthor() {
    await connection.query('Create table Authors(id int not null AUTO_INCREMENT,authorname varchar(100) not null , image varchar(150) NOT NULL,about varchar(20000) NOT NULL, constraint pk_demo primary key (id) )');
}

async function insertAuthor1() {
	await pool.query('insert into Authors (authorname,image,about) values ( "Maurice Carlos Ruffin", "/img/author/1.jpg", "Maurice Carlos Ruffins debut novel is both funny and distressing, often at tar.") ');
}
async function insertAuthor2() {
	await pool.query('insert into Authors (authorname,image,about) values("Chanelle Benz","/img/author/2.jpg","Chanelle Benz is the author of The Man Who Shot Out My Eye Is Dead (Ecco Press 2017).")');
}

async function insertAuthor3() {
	await pool.query('insert into Authors (authorname,image,about)  values( "Kristen Arnett", "/img/author/3.jpg", "Kristen Arnett is a NYT best selling author and a queer fiction and essay writer.") ');
}

async function insertAuthor4() {
	await pool.query('insert into Authors (authorname,image,about)  values( "Kristen ", "/img/author/4.jpg", "Kristen Arnett is a NYT best selling author and a queer fiction and essay writer.") ');
}

async function insertAuthor5() {
	await pool.query('insert into Authors (authorname,image,about)  values( " Arnett", "/img/author/5.jpg", "Kristen Arnett is a NYT best selling author and a queer fiction and essay writer.") ');
}

async function insertAuthor6() {
	await pool.query('insert into Authors (authorname,image,about)  values( "Kristnett", "/img/author/6.jpg", "Kristen Arnett is a NYT best selling author and a queer fiction and essay writer.") ');
}

async function insertAuthor7() {
	await pool.query('insert into Authors (authorname,image,about)  values( " Arnett Kristen", "/img/author/7.jpg", "Kristen Arnett is a NYT best selling author and a queer fiction and essay writer.") ');
}

async function insertAuthor8() {
	await pool.query('insert into Authors (authorname,image,about)  values( "Kristenrnett", "/img/author/8.jpg", "Kristen Arnett is a NYT best selling author and a queer fiction and essay writer.") ');
}

async function insertAuthor9() {
	await pool.query('insert into Authors (authorname,image,about)  values( "Krinett", "/img/author/9.jpg", "Kristen Arnett is a NYT best selling author and a queer fiction and essay writer.") ');
}

async function createBook() {
	await pool.query('Create table Books(id int not null AUTO_INCREMENT, bookname varchar(100) not null , image varchar(150) NOT NULL, about varchar(20000) NOT NULL, isbn varchar(100) , aut_id int, FOREIGN KEY (aut_id) REFERENCES AuthorsTest(id), constraint pk_demo primary key (id) ) ');
}

async function insertBook1() {
	await pool.query('insert into Books (bookname , image , about ,isbn, aut_id) values( "War and Peace",   "/img/book/1.jpg", "War and Peace (pre-reform Russian:  post-reform Russian:  is a novel by the Russian author Leo Tolstoy. It is regarded as a central work of ",  9783736801363,   1) ');
}
async function insertBook2() {
	await pool.query('insert into Books (bookname , image , about ,isbn, aut_id) values( "Song of Solomon","/img/book/2.jpg", "Song of Solomon (pre-reform Russian:  post-reform Russian:  is a novel by the Russian author Leo Tolstoy. It is regarded as a central work o", 9780330305020,2) ');
}
async function insertBook3() {
	await pool.query('insert into Books (bookname , image , about ,isbn, aut_id) values("Ulyssess","/img/book/3.jpg","Ulyssess (pre-reform Russian:  post-reform Russian:  is a novel by the Russian author Leo Tolstoy. It is regarded as a central work of world",9781786825605, 3) ');
}
async function insertBook4() {
	await pool.query('insert into Books (bookname , image , about ,isbn, aut_id) values("Ulyssess 1","/img/book/4.jpg","Ulyssess (pre-reform Russian:  post-reform Russian:  is a novel by the Russian author Leo Tolstoy. It is regarded as a central work of world",9781786825605, 4) ');
}
async function insertBook5() {
	await pool.query('insert into Books (bookname , image , about ,isbn, aut_id) values("Ulyssess 2","/img/book/5.jpg","Ulyssess (pre-reform Russian:  post-reform Russian:  is a novel by the Russian author Leo Tolstoy. It is regarded as a central work of world",9781786825605, 5) ');
}
async function insertBook6() {
	await pool.query('insert into Books (bookname , image , about ,isbn, aut_id) values("Ulyssess 3","/img/book/6.jpg","Ulyssess (pre-reform Russian:  post-reform Russian:  is a novel by the Russian author Leo Tolstoy. It is regarded as a central work of world",9781786825605, 6) ');
}
async function insertBook7() {
	await pool.query('insert into Books (bookname , image , about ,isbn, aut_id) values("Ulyssess 4","/img/book/7.jpg","Ulyssess (pre-reform Russian:  post-reform Russian:  is a novel by the Russian author Leo Tolstoy. It is regarded as a central work of world",9781786825605, 7) ');
}
async function insertBook8() {
	await pool.query('insert into Books (bookname , image , about ,isbn, aut_id) values("Ulyssess 5","/img/book/8.jpg","Ulyssess (pre-reform Russian:  post-reform Russian:  is a novel by the Russian author Leo Tolstoy. It is regarded as a central work of world",9781786825605, 8) ');
}
async function insertBook9() {
	await pool.query('insert into Books (bookname , image , about ,isbn, aut_id) values("Ulyssess 6","/img/book/9.jpg","Ulyssess (pre-reform Russian:  post-reform Russian:  is a novel by the Russian author Leo Tolstoy. It is regarded as a central work of world",9781786825605, 9) ');
    await console.log('done');
}


async function script() {
	await createAuthor();
	await insertAuthor1();
	await insertAuthor2();
	await insertAuthor3();
	await insertAuthor4();
	await insertAuthor5();
	await insertAuthor6();
	await insertAuthor7();
	await insertAuthor8();
	await insertAuthor9();
	await createBook();
	await insertBook1();
	await insertBook2();
	await insertBook3();
	await insertBook4();
	await insertBook5();
	await insertBook6();
	await insertBook7();
	await insertBook8();
	await insertBook9();
}
script();
module.exports = script;
