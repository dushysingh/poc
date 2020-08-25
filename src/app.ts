/**
 * Created by: Dushyant Sengar
 * Date: 24-aug-2020
 */

import express from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import winston from './config/winston';
import dotenv from 'dotenv';
//import middleware from './middleware/middleware';
import routes from './route';
import auth from './auth/authJWT';
import responseCode from "./common/response_code";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT) || 8081;

const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:4200'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(morgan('combined'));
//app.use(morgan('combined', { stream: winston.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', auth);
app.use('/', routes); //middleware.checkToken,

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send({
    "data": '',
    "others":'',
    "status": {
      "code": 404,
      "message": 'API Not Found'
    },
    "error": '',
});
//  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 404} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 404);
  //res.render('error');
  responseCode.customResponse(res, 404, err);
});

// START THE SERVER
// ==============================================
app.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`Noode app listening at port ${port}`);
});
