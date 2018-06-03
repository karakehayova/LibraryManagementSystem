var express = require('express')
var app = express()
var passport = require('passport')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var bcrypt   = require('bcrypt-nodejs');


app.post('/signup', function(res, req){
	var username = req.body.username
	bcrypt.hash(req.body.password, null, null, function(err, hash){
		//saving user as username and password(tha hash)
		req.session.regenerate(()=>{
			res.redirect('/index')
			req.session.user = user
		})
	})
})