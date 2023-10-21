const crypto = require('crypto');
const { passwordHash } = require('../config/index');

const createHashedPassword = password => 
crypto.createHmac('sha256', passwordHash)
.update(password)
.digest('hex')

module.exports = {createHashedPassword};