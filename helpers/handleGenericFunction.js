const { validationResult } = require('express-validator');


const responseJson = (status, message, data = null) => {
    const res = {
        status,
        message,
    }
    if (data) res.data = data;
    return res;
}

module.exports = {responseJson}