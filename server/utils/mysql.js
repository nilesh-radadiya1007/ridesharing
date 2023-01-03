'use strict'

const mysql = require('mysql2')
const globalConfig = require(`../config/mysql.json`);

const zonalConfig = {
    local: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        debug: false
    },
}
let state = {
    pool: null,
    readPool: null,
    mode: null,
}

function getDbServerConfig() {
    return Object.assign({}, globalConfig, zonalConfig['local']);
}

const connect = (mode, callback) => {
    let config = getDbServerConfig();
    state.pool = mysql.createPool(config);
    state.readPool = state.pool
    callback();
}

const getConnection = () => {
    return state.pool;
}
module.exports = {
    connect: connect,
    getConnection: getConnection
}