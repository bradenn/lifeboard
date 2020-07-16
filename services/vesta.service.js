const config = require('../env/env');
const axios = require('axios');
const https = require('https');

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

let sendRequest = (command, args) => new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append('user', config.VESTA_USER);
    params.append('password', config.VESTA_PASS);
    params.append('cmd', command);
    args.forEach(arg => {
        params.append(`arg${args.indexOf(arg) + 1}`, (arg === "holding") ? config.VESTA_HOLDING : arg);
    });
    instance.post(config.VESTA, params).then(res => {
        resolve(res.data);
    }).catch(err => {
        reject(err);
    });
});

module.exports = {sendRequest}
