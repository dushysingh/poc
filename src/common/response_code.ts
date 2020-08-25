/*
  *Created by : Dushyant Sengar
  *Purpose :Response Code
*/

const codes = {
  200: "OK",
  201: "Created",
  202: "Updated",
  203: "Deleted",
  204: "No Content",
  304: "Not Modified",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
  111: "Something went wrong",
  422: "Unprocessable entity",
  602: "Theme Already Created",
  700: "Already Exist",

}

export = {
  customResponse: (res, status = 200, data:Array<JSON> = [], others = [] , err='') => {
  // delete data['sql'];
    res.status(status).send({
        "data": data,
        "others":others,
        "status": {
          "code": status,
          "message": codes[status]
        },
        "error": err,
    });
  }

};
