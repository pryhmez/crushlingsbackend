const { signUpUser, loginUser, verifyUserAccountToken, confirmSignUp } = require('../services/authServices');
const { findUserWithId, findUserWithEmail, saveChangesToUser } = require('../services/userServices');

const url = require('url');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');
const nodemailer = require('nodemailer');
// const Transport = require('nodemailer--transport')

module.exports = function authController() {
	this.signUp = (req, res, next) => {
		bcrypt.hash(req.body.password, 10, (err, hash) => {

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// console.log(errors.errors[0].msg)
				res.status(200).send({
					success: false,
					message: errors.errors[0].msg,
					data: errors
				})
				// return next(new AppError(errors, 400));
			}else {
				
				signUpUser(req.body, hash)
					.then(result => {
						const token = jwt.sign(
							{
								email: result.email,
								userId: result._id
							},
							'secret',
							{
								expiresIn: '1h'
							}
						);
						res.status(200).send({
							success: true,
							message: "signUp successful",
							token,
							user: result
						});
					})
					.catch((error) => {
						// console.log(error)
						// return next(new AppError(error, 400));
						res.status(401).send({
							success: false,
							message: "signUp unsuccessful",
							data: error
						})
					});
			}
		});
	};

	this.login = (req, res, next) => {
		loginUser(req.body)
			.then((user) => {
				if (!user) {
					// return next(new AppError('Email does not exist in our Database, please sign up', 401));
					res.status(401).send({
						successful: false,
						message: 'Email does not exist in our Database, please sign up',
						data: req.body
					}).end()
					return
				}
				bcrypt.compare(req.body.password, user.password, (err, result) => {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						// return next(new AppError(errors, 401));
						res.status(401).send(errors.errors)
					}else if (err) {
						// return next(new AppError(err, 401));
						res.status(401).send(err)
					}
					// if (!user.isVerified)
					// 	// const { email, businessName } = user;
					// 	return res.status(200).json({
					// 		status: "pending",
					// 		message: 'Your account has not been verified, please verify your account or click on resend mail',
					// 		user: user
					// 		// user: user
					// 	});
					else if (result) {
						const token = jwt.sign(
							{
								email: user.email,
								userId: user._id
							},
							'secret',
							{
								expiresIn: '1h'
							}
						);
						// let userData = Object.assign({}, user);
						res.status(200).json({
							status: true,
							message: 'login successful',
							token: token,
							user: user
						});
					} else {
						// return next(new AppError('login failed, please enter correct Username and password', 401));
						res.status(402).send({
							successful: false,
							message: 'login failed, please enter correct Username and password',
							data: req.body
						})
					}
				});
			})
			.catch((error) => {
				// return next(new AppError(error, 500));
				res.status(500).send(error)
			});
	};

};
