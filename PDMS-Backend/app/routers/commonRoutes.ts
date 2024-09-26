import express, { type Router } from "express";
import { commonController } from "app/controllers/CommonController";
import { validateRequest } from "app/common/middleware/validator";
import { verifyLinkSchema } from "app/schemas/commonSchema";
import { NextFunction, Request, Response } from "express";
import { RoleValidator } from "app/common/middleware/roleValidator";

const commonRouter: Router = express.Router();

commonRouter.post(
  "/register-face",
  // validateRequest(verifyLinkSchema),
  commonController.registerFace
);
commonRouter.post(
  "/authorize-face",
  RoleValidator.validator,
  commonController.authorizeFace
);
commonRouter.post(
  "/send-otp", 
  (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware");

    console.log(req.headers.role);
    next();
  },
  RoleValidator.validator(),
  commonController.sendOTP
);

export default commonRouter;
