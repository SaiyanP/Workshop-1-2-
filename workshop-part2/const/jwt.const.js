const { sign, verify } = require("jsonwebtoken");

const createAccessToken = userId =>{
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10s",
    });
};

const createRefreshToken = userId =>{
    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: "10d",
    });
};

const verifyAccesToken = token =>{
    return verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = refreshToken =>{
    return verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyAccesToken,
    verifyRefreshToken,
};