const config = require('../env/env');
const axios = require('axios');
const https = require('https');

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

let addProxy = (domain, target, port) => new Promise((resolve, reject) => {
    let payload = {
        host: target,
        port: port,
        token: config.KEY
    };
    instance.get(`${config.HOST}/proxy/${domain}`, {params: {token: config.KEY}}).then(res => {
        instance.put(`${config.HOST}/proxy/${domain}`, payload).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    }).catch(err => {
        instance.put(`${config.HOST}/proxy/${domain}`, payload).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    });


});

module.exports = {addProxy}
