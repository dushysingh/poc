
/**
 *Created by: Dushyant Sengar
 *Created : 24-aug-2020
 *Purpose : Router instance
 */

import express from 'express';
const router = express.Router();

import loginController from './controllers/login/login_controller';

import multer from 'multer';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log("fileName =>", file.fieldname + '-' + Date.now( )+ '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
      cb(null, file.fieldname + '-' + Date.now( )+ '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
  })
 let upload = multer({ storage: storage });

 router.route('/login').get(loginController.login);

export = router;
