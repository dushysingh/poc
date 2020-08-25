/*
 * Created by: Dushyant Sengar
 * Date: 24-aug-2020
*/


import validator from 'validatorjs';

export =
  {
    checkValidation: async (res, param, rules) => {
      try {
        return new Promise((resolve, reject) => {
          let validation = new validator(param, rules);
          if (validation.fails()) {
            return res.json({ "status": 500, "Message": validation.errors.errors });
          }
          else {
            resolve()
          }
        });
      } catch (ex) {
        console.log("WriteOnJSONfile function error", ex)
        return await ex;
      }
    }
  }
