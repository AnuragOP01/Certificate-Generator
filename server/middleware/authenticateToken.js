const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ status: 'error', msg: 'Access Denied: No Token Provided!' });
  }

  try {
    jwt.verify(token,'No Key Is Secret',(err,user)=>{
      if(err) res.status(401);
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(400).send({ status: 'error', msg: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
