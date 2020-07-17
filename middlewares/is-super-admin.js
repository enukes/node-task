const jsonwebtoken = require('jsonwebtoken');

const config = require('../config/constants');
const ResponseService = require('../common/response');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    // If token does not exists in the headers then get it from the queryParams
    if (!token) {
      token = req.query.token;
    }

    const decoded = jsonwebtoken.verify(token, config.authSecretToken);

    if (`${decoded.type}` !== '1') throw new Error();

    req._userInfo = {
      _user_id: decoded.id || undefined,
      _user_type: decoded.type || undefined
    };
    next();
  } catch (e) {
    return res.status(401).send(ResponseService.failure(401));
  }
};
