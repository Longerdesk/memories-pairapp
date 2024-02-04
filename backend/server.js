/*const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
*/
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "daiki0MH",
    database: "memories"
})

app.post('/signup', (req, res) => {
    const {userid, password, nickname} = req.body;
    const sql = "INSERT INTO users (userid, password, nickname) VALUES (?, ?, ?)";
    db.query(sql, [userid, password, nickname], (err, data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/check', (req, res) => {
    const sql = "SELECT * FROM users WHERE userid = ?";
    db.query(sql, [req.body.userid], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Found");
        }else{
            return res.json("Success");
        }
    })
})

app.post('/upload', upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const sql = "UPDATE users SET iconpic = ? WHERE userid = ?";
    db.query(sql, [image, req.body.userid], (err, data) => {
        if(err) return res.json({Message: "Error"});
        return res.json({Status: "Success"});
    })
})

app.post('/account', (req, res) => {
    const sql = 'SELECT * FROM users WHERE userid = ?';
    db.query(sql, [req.body.userid], (err, data)=>{
        if(err){
            return res.json("Error");  
        } 
        if(data.length > 0){
            return res.send(data[0]);
        }else{
            return res.json("Error");
        }
    })
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE userid = ? AND password = ?';
    db.query(sql, [req.body.userid, req.body.password], (err, data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.send(data[0]);
        }else{
            return res.json("Error");
        }
    })
})


app.post('/addpair', (req, res) => {
    const {pairid, userid, memoDay} = req.body;
    const sql = "INSERT INTO pairs (pairid, user1, memoDay) VALUES (?, ?, ?)";
    db.query(sql, [pairid, userid, memoDay], (err, data)=>{
        if(err){
            return res.json("Error");
        }
    })
    return res.json("Success");
})

app.post('/checkpair', (req, res) => {
    const userid = req.body.userid;
    const sql = "SELECT * FROM pairs WHERE pairid = ?";
    db.query(sql, [req.body.pairid], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            if(data[0].user1 == userid){
                return res.json("Already");
            }else if(data[0].user2 == userid){
                return res.json("Already");
            }else if(data[0].user1 == null){
                return res.json("Join1");
            }else if(data[0].user2 == null){
                return res.json("Join2");
            }else{
                return res.json("Found");
            }
        }else{
            return res.json("Add");
        }
    })
})

app.post('/checkmemoDay', (req, res) => {
    const sql = "SELECT * FROM pairs WHERE pairid = ? AND memoday = ?";
    db.query(sql, [req.body.pairid, req.body.memoDay], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Success");
        }else{
            return res.json("Wrong");
        }
    })
})


app.post('/joinpair1', (req, res) => {
    const {pairid, userid, memoDay} = req.body;
    const sql = "UPDATE pairs SET user1 = ? WHERE pairid = ? AND memoday = ?";
    db.query(sql, [userid, pairid, memoDay], (err, data)=>{
        if(err){
            return res.json("Error");
        }
    })
    return res.json("Success");
})

app.post('/joinpair2', (req, res) => {
    const {pairid, userid, memoDay} = req.body;
    const sql = "UPDATE pairs SET user2 = ? WHERE pairid = ? AND memoday = ?";
    db.query(sql, [userid, pairid, memoDay], (err, data)=>{
        if(err){
            return res.json("Error");
        }
    })
    return res.json("Success");
})

app.post('/assignpair', (req, res) => {
    const sql = "UPDATE users SET pairid = ? WHERE userid = ?";
    db.query(sql, [req.body.pairid, req.body.userid], (err, data)=>{
        if(err){
            return res.json("Error");
        }
    })
    return res.json("Success");
})

app.post('/deletepairid', (req, res) => {
    const sql = "UPDATE users SET pairid = null WHERE userid = ?";
    
    db.query(sql, [req.body.userid], (err, data) => {
        if(err){
            return res.json("Error");
        }
    })
    return res.json("Success");
})

app.post('/checkUserNum', (req, res) => {
    const sql = "SELECT * FROM pairs WHERE pairid = ? AND user1 = ?";
    db.query(sql, [req.body.pairid, req.body.userid], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Found1");
        }else{
            return res.json("Found2");
        }
    })
})

app.post('/leavepair1', (req, res) => {
    const sql = "UPDATE pairs SET user1 = NULL WHERE pairid = ?";
    db.query(sql, [req.body.pairid], (err, data) => {
        if(err){
            return res.json("Error");
        }
    })
    return res.json("Success")
})

app.post('/leavepair2', (req, res) => {
    const sql = "UPDATE pairs SET user2 = NULL WHERE pairid = ?";
    db.query(sql, [req.body.pairid], (err, data) => {
        if(err){
            return res.json("Error");
        }
    })
    return res.json("Success")
})

app.post('/checkIfDeletePair', (req, res) => {
    const sql = "SELECT * FROM pairs WHERE pairid = ?";
    db.query(sql, [req.body.pairid], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data[0].user1 == null && data[0].user2 == null){
            return res.json("Delete");
        }else{
            return res.json("NoDelete");
        }
    })
}) 

app.post('/deletePair', (req, res) => {
    const sql = "DELETE FROM pairs WHERE pairid = ?";
    db.query(sql, [req.body.pairid], (err, data) => {
        if(err){
            return res.json("Error");
        }
    })
    return res.json("Success");
})

app.post('/getmemoD', (req, res) => {
    const sql = "SELECT * FROM pairs WHERE pairid = ?";
    db.query(sql, [req.body.pairid], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.send(data[0]);
        }else{
            return res.json("Error");
        }
    })
})


app.post('/postupload', upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const sql = "INSERT INTO posts (text, image, datetime, userid, pairid) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [req.body.text, image, req.body.datetime, req.body.userid, req.body.pairid], (err, data) => {
        if(err) {
            return res.json({Message: "Error"});
        }
        return res.json({Status: "Success"});
    })
})

app.post('/getposts', (req, res) => {
    const sql = "SELECT * FROM posts WHERE pairid = ?";
    db.query(sql, [req.body.pairid], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.send(data);
        }else{
            return res.json("Error");
        }
    }) 
})

app.post('/getnickname', (req, res) => {
    const sql = "SELECT * FROM users WHERE userid = ?";
    db.query(sql, [req.body.userid], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.send(data[0]);
        }else{
            return res.json("Error");
        }
    }) 
})

app.post('/updatenickname', (req, res) => {
    const sql = "UPDATE users SET nickname = ? WHERE userid = ?";
    db.query(sql, [req.body.nickname, req.body.userid], (err, data) => {
        if(err){
            return res.json("Error");
        }
    return res.json("Success")
    })
})

app.post('/getpair', (req, res) => {
    const sql = "SELECT * FROM pairs WHERE pairid = ?";
    db.query(sql, [req.body.pairid], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.send(data[0]);
        }else{
            return res.json("Error");
        }
    })
})

app.listen(8081, ()=>{
    console.log("listening");
})