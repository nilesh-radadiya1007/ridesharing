'use strict'

const db = require(`./mysql`);

function sqlExecutor(req, res, statement, values, cb) {
   var sqlData= db.getConnection().query({
        sql: statement,
        values: values
    }, function (err, results, field) {
        if (err) {
            cb(null, err)
        } else {
            cb(results, null)
        }
    });
}

function sqlExecutorAsync(req, res, statement, values) {
    return new Promise((resolve, reject) => {
        sqlExecutor(req, res, statement, values, (result, error) => {
            if (error) {
                return resolve({ status: 'error', msg: 'Unexpected error occurred', error })
            }
            return resolve({ status: 'success', data: result })
        })
    })
}

module.exports = {
    sqlExecutor,
    sqlExecutorAsync
  }
  