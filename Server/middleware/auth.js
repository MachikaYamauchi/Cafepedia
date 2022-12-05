// To pu the "creator" info into MongoDB
// detemin which user is created by using token

import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "test";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] // get longer token
        const isCustomeAuth = token.length < 500; //login with emai and PW
        let decodedData;
        if(token && isCustomeAuth) { // login by email and PW
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id
        } else { // login with google
            decodedData = jwt.decode(token);
            const googleId = decodedData?.sub.toString();
            const user = await UserModel.findOne({googleId});
            req.userId = user?._id;
        }
        next();
    } catch(error) {
        console.log(error);
    }
};

export default auth;