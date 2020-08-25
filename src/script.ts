/**
 * Created by: Dushyant Sengar
 * Date: 24-aug-2020
 */

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import Validator from 'validatorjs';
import responseCode from "./common/response_code";

export =
  {

    checkValidation: async (res, param, rules) => {
      try {
        return new Promise((resolve, reject) => {
          let validation = new Validator(param, rules);
          if (validation.fails()) {
            return responseCode.customResponse(res, 422, [], [], validation.errors.errors);
          }
          else {
            resolve()
          }
        });
      } catch (ex) {
        console.log("WriteOnJSONfile function error", ex)
        return await ex;
      }
    },

    MakeDirectory: async (folderpath) => {
      try {
        return new Promise( (resolve, reject) => {
          mkdirp(folderpath);
          resolve(true);
        });
      } catch (ex) {
        console.log("WriteOnJSONfile function error", ex)
        return await ex;
      }
    },

    ReadJSONfile: async (jsonFilePath) => {
      try {
        return new Promise( (resolve, reject) => {
          fs.readFile(jsonFilePath, 'utf8', function readFileCallback(err, data) {
            let obj = JSON.parse(data);
            resolve(obj);
          });
        });
      } catch (ex) {
        console.log("ReadJSONfile function error", ex)
        return await ex;
      }
    },

    CheckExistsJSONFile: async (jsonFilePath) => {
      try {
        return new Promise( (resolve, reject) => {
          if (fs.existsSync(jsonFilePath))
            resolve(true);
          else
            reject(false);
        });
      } catch (ex) {
        console.log("CheckExistsJSONFile function error", ex)
        return await ex;
      }
    },
    WriteOnJSONfile: async (jsonFilePath, data) => {
      try {
        return new Promise( (resolve, reject) => {
          fs.writeFileSync(jsonFilePath, data);
          resolve(true);
        });
      } catch (ex) {
        console.log("WriteOnJSONfile function error", ex)
        return await ex;
      }
    },

    DeleteJsonFile: async (jsonFilePath) => {
      try {
        return new Promise( (resolve, reject) => {
          fs.unlink(jsonFilePath, function (err) {
            resolve(true);

          });

        });
      } catch (ex) {
        console.log("DeleteJsonFile function error", ex)
        return await ex;
      }
    },

    differenceOf2Arrays: (array1, array2) => {
      var temp = [];
      array1 = array1.toString().split(',').map(Number);
      array2 = array2.toString().split(',').map(Number);

      for (var i in array1) {
        if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
      }
      for (i in array2) {
        if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
      }
      return temp.sort((a, b) => a - b);
    },
    ObjToArray: (obj) => {
      var arr = obj instanceof Array;

      return (arr ? obj : Object.keys(obj)).map( (i) => {
        var val = arr ? i : obj[i];
        if (typeof val === 'object')
          return module.exports.ObjToArray(val);
        else
          return val;
      });
    }
  }

