const { verifyRefreshToken } = require("../const/jwt.const");
const AuthModel = require("../models/auth.model");

class AuthController {
    // Sign up:
    static async signUpUser(req, res){
        try {
            const userData = req.body;
            const registeredUser = await AuthModel.createUser(userData);
            res.status(201).send(registeredUser);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    // Login: 
    static async loginUser(req, res){
        try {
            const credentials = req.body;

            const user = await AuthModel.loginUser(credentials);

            // req.session.loggedIn = true;
            // req.session.userId = user.id;

            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            res.status(401).send(error);
        }
    }

    static async refreshTokenAccess(req, res){
        try {
            const refreshToken = req.body.refreshToken;

            if(!refreshToken) return res.sendStatus(403);

            const { userId } = verifyRefreshToken(refreshToken);

            const foundUser = await AuthModel.getUserBy
        } catch (error) {
            console.log(error);
            res.status(403).send(error);
        }
    }
}
    

module.exports = AuthController;