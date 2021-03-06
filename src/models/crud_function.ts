/*
 * Created by: Dushyant Sengar
 * Date: 24-aug-2020
*/
import connection from "../config/connection";
import _ from 'underscore';
import responseCode from "../common/response_code";

export =
  {
    GetRecords: (arg) => {
      return new Promise(async (resolve, reject) => {
        const mysqlConnection = await connection.mysqldbConnection(arg.res);
        // main sql query
        let fields = arg.fields;
        let table = arg.tableName;
        let where = arg.where;
        let orderby = arg.orderby;
        let groupby = arg.groupby;
        let limit = arg.limit;
        let offset = arg.offset;

        if (_.isEmpty(fields)) {
          fields = '*';
        }
        if (_.isEmpty(orderby)) {
          orderby = '';
        }
        if (_.isEmpty(groupby)) {
          groupby = '';
        }
        if (_.isEmpty(limit)) {
          limit = '';
        }
        if (_.isEmpty(offset)) {
          offset = '';
        }
        let sql = '';
        if (_.isEmpty(where))
          sql = `SELECT ${fields} FROM ${table}  ${groupby} ${orderby} ${limit} ${offset}`;
        else
          sql = `SELECT ${fields} FROM ${table} WHERE ${where} ${groupby} ${orderby} ${limit} ${offset}`;

        mysqlConnection.query(sql, (err, result) => {
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
          else {
            resolve(result);
          }
        });
        mysqlConnection.end( (err) => {
          console.log("Connection Ended")
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
        });

      })
    },
    AddRecords: (arg) => {
      return new Promise(async (resolve, reject) => {
        const mysqlConnection = await connection.mysqldbConnection(arg.res);
        let table = arg.tableName;
        let AddData = arg.addData;
        let Sql = `INSERT INTO ${table} SET ?`;
        mysqlConnection.query(Sql, AddData, async (err, result) => {
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
          else {
            AddData['insertId'] = result.insertId;
            resolve(AddData)
          }
        })
        mysqlConnection.end( (err) => {
          console.log("Connection Ended")
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
        });
      });
    },
    UpdateRecords: (arg) => {
      return new Promise(async (resolve, reject) => {
        const mysqlConnection = await connection.mysqldbConnection(arg.res);
        let updateObject = arg.updateData;
        let table = arg.tableName;
        let where = arg.where;
        let Sql = '';
        if (_.isEmpty(where)) {
          Sql = `UPDATE ${table} SET ?`;
        }
        else {
          Sql = `UPDATE ${table} SET ?   WHERE ${where}`;
        }

        mysqlConnection.query(Sql, updateObject, async (err, result) => {
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
          else {
            resolve(result)
          }
        });
        mysqlConnection.end( (err) => {
          console.log("Connection Ended")
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
        });
      });
    },
    DeleteRecords: (arg) => {
      return new Promise(async (resolve, reject) => {
        const mysqlConnection = await connection.mysqldbConnection(arg.res);
        let table = arg.tableName;
        let where = arg.where;
        let Sql = '';
        if (_.isEmpty(where))
          Sql = `DELETE FROM ${table}`;
        else
          Sql = `DELETE FROM ${table} WHERE ${where}`;
        mysqlConnection.query(Sql, async (err, result) => {
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          } else {
            resolve(result)
          }
        })
        mysqlConnection.end( (err) => {
          console.log("Connection Ended")
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
        });
      });
    },
    GetJoinRecords: (arg) => {
      return new Promise(async (resolve, reject) => {
        const mysqlConnection = await connection.mysqldbConnection(arg.res);
        let fields = arg.fields;
        let table = arg.tableName;
        let where = arg.where;
        let groupby = arg.groupby;
        let orderby = arg.orderby;
        let limit = arg.limit;
        let offset = arg.offset;
        if (_.isEmpty(fields)) {
          fields = '*';
        }
        if (_.isEmpty(groupby)) {
          groupby = '';
        }
        if (_.isEmpty(orderby)) {
          orderby = '';
        }
        if (_.isEmpty(limit)) {
          limit = '';
        }
        if (_.isEmpty(offset)) {
          offset = '';
        }
        let sql = '';
        if (_.isEmpty(where)) {
          sql = `SELECT ${fields} FROM ${table} ${arg.join_type} ${arg.join_table} ${arg.join_condition}  ${groupby} ${orderby} ${limit} ${offset}`;
        }
        else {
          sql = `SELECT ${fields} FROM ${table} ${arg.join_type} ${arg.join_table} ${arg.join_condition} WHERE ${where} ${groupby} ${orderby} ${limit} ${offset}`;

        }
        mysqlConnection.query(sql, (err, result) => {
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
          else {
            resolve(result);
          }
        });
        mysqlConnection.end( (err) => {
          console.log("Connection Ended")
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
        });

      })
    },
    CustomQuery: (arg) => {
      return new Promise(async (resolve, reject) => {
        const mysqlConnection = await connection.mysqldbConnection(arg.res);
        let sql = arg.sql;
        mysqlConnection.query(sql, (err, result) => {
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
          else {
            resolve(result);
          }
        });
        mysqlConnection.end( (err) => {
          console.log("Connection Ended")
          if (err) {
            responseCode.customResponse(arg.res, 500, err);
          }
        });

      })
    },

  }

