/*
 * Created by: Dushyant Sengar
 * Date: 24-aug-2020
*/
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();
// declare var process : {
//   env: {
//     HOST: string,
//     DBUSER: string,
//     PASSWORD: string,
//     DATABASE: string,
//     TIMEZONE: string
//   }
// }

// database connection according to server
let devConn = {
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  timezone: process.env.TIMEZONE
};

export = {
  mysqldbConnection: async (res) => {
    try {
      return new Promise((resolve, reject) => {
        let con = mysql.createConnection(devConn);
        con.connect(function (err) {
          if (err)
            res.json({ stats: 0, Message: "Database Is Not Connected" })
          else
            resolve(con);
        })
      })
    } catch (ex) {
      return await ex;
    }
  }

};

