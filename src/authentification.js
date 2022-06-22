import "dotenv/config";
import jwt from "jsonwebtoken";
import { log, userLog } from "./logger.js";

const unauthorized = [false, 401, "Unauthorized"];

const verifyClient = (info, cb) => {
  const token = info.req.headers.token;

  const reject = () => {
    userLog(
      "connection rejected",
      `${info.req.socket.remoteAddress}:${info.req.socket.remotePort}`
    );
    cb(...unauthorized);
  };

  if (!token) {
    reject();
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        reject();
      } else {
        info.req.user = decoded;
        cb(true);
      }
    });
  }
};

export { verifyClient };
