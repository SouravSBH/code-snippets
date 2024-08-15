import authenticatedRequestHandler, {
  addUserToRequest,
} from "lib/middleware/AuthenticatedRequestHandler";
import ensureDBConnection from "config/DB";
import {
  API_KEY_HEADER_NAME,
  LAMBDA_KEY_HEADER_NAME,
} from "lib/constants/ApplicationConstants";
import { message } from "config/Message";

const checkAPIKey = (req, res) => {
  if (req.headers[API_KEY_HEADER_NAME] !== process.env.NEXT_PUBLIC_API_KEY) {
    res.status(401);
    throw new Error(message.api.error.UNAUTHORIZED_OPERATION);
  }
};

const checkLambdaKey = (req, res) => {
  if (
    req.originalUrl.startsWith("/api/p/lambda") &&
    req.headers[LAMBDA_KEY_HEADER_NAME] !== process.env.LAMBDA_KEY
  ) {
    res.status(401);
    throw new Error(message.api.error.UNAUTHORIZED_OPERATION);
  }
};

export default (handler) => {
  return async (req, res) => {
    try {
      checkAPIKey(req, res);
      checkLambdaKey(req, res);

      await ensureDBConnection();

      const route = req.originalUrl;

      console.log(`++ ${req.method} ${route}`);
      console.log(req.body);

      if (route.startsWith("/api/a")) {
        await authenticatedRequestHandler(req, res);
      } else {
        await addUserToRequest(req);
      }

      const result = await handler(req, res);

      const statusCode = res.statusCode ? res.statusCode : 200;
      res.status(statusCode).json({
        type: "RESULT",
        message: res.message || "OK",
        result: result,
        error: null,
        code: statusCode,
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        res.status(error.statusCode);
      }

      const statusCode = res.statusCode ? res.statusCode : 500;

      res.status(statusCode).json({
        type: "ERROR",
        message: error.message,
        result: error.result ?? null,
        error: process.env.ENV_TYPE === "production" ? null : error.stack,
        code: statusCode,
      });
    }
  };
};
