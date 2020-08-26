/*
 * Created by: Dushyant Sengar
 * Date: 24-aug-2020
*/

import common from "../../models/crud_function";
import responseCode from "../../common/response_code";

export = {
    login: (req, res) => {
        return new Promise(async (resolve, reject) => {
            try {
                let queryObj = req.body;

                let password_encode = Buffer.from(queryObj.password).toString('base64');
                if (queryObj.email && queryObj.password) {
                            let data = {
                                email: 'email',
                                name: 'name'
                            };
                            resolve(data);
                }
                else {
                    responseCode.customResponse(res, 422);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
