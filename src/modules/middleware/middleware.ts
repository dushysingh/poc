/**
 * Created by: Dushyant Sengar
 * Date: 25-11-2019
 */

import config from "../config/config";
import jwt from 'jsonwebtoken';
import responseCode from "../common/response_code";

export =
  {
    createJwtToken: (user) => {
      return new Promise(async (resolve, reject) => {
        try {
          jwt.sign({ user }, config.JwtSupersecret, { expiresIn: '24h' }, (err, token) => {
            resolve(token)
          });
        } catch (ex) {
          console.log("WriteOnJSONfile function error", ex)
        }
      })
    },
    checkToken: (req, res, next) => {
      return new Promise(async (resolve, reject) => {

        if (typeof req.headers.authorization != "undefined" && req.headers.authorization != "") {
          try {
            jwt.verify(req.headers.authorization, config.JwtSupersecret, async (err, response) => {
              if (response) {
                console.log(response);
                next();
                //resolve(true);
              }
              else {
                console.error(err)
                responseCode.customResponse(res, 400);
              }
            })
          } catch (ex) {
            console.log("WriteOnJSONfile function error", ex)
            responseCode.customResponse(res, 400, ex);
          }
        } else {
          responseCode.customResponse(res, 422);
        }
      })
    }
  }