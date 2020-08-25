/**
 * Created by: Dushyant Sengar
 * Date: 24-aug-2020
 */

import express from 'express';
import middleware from '../middleware/middleware';
import loginController from '../controllers/login/login_controller';
import responseCode from "../common/response_code";

const router = express.Router();

/* POST login. */
router.post('/', async (req, res, next) => {
  if (req.body.email && req.body.password) {

    let admin:any = await loginController.login(req, res);

    if (admin) {
      try {
        let token = await middleware.createJwtToken(admin);
        
        admin.token = token;
        responseCode.customResponse(res, 200, admin );

      }
      catch (e) {
        console.error('error token', e);
        responseCode.customResponse(res, 111, e);
      }
    }
  }

});

export = router;
