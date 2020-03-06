
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    

    const token = req.headers.authorization;
  
    if(token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({message: "Incorrect Username/Password"})
        }
        else {
          req.decodedJwt = decodedToken;
          next();
        }
      })
    
    } else {
      res.status(401).json({message: "Error on login"})
    }
}



