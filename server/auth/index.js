const userUtils = require(`../utils/helper`)
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");


async function userSignup(firstName, lastName, email, password, address, city, state, lat, long) {
    return new Promise(async (resolve, reject) => {

        let userResp = await getUser(email);
        if (userResp.status === 'error') {
            return resolve({ success: false, message: "Something went wrong." })
        }

        if (userResp.data.length > 0) {
            return resolve({ success: false, message: "Email already exists!" })
        }

        const salt = await bcrypt.genSalt(10);
        var encryptedPass = await bcrypt.hash(password, salt);
        let statement = `INSERT INTO users (firstName, lastName, email, password, roleId, isActive, address, cityId, stateId, countryId, lat, longs)
                        VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
        let values = [firstName, lastName, email, encryptedPass, 1, 1, address, city, state, 'India', lat, long];
        let userAdded = await userUtils.sqlExecutorAsync(null, null, statement, values);
        if (userAdded.status === 'error') {
            return resolve({ success: false, message: "Something went wrongss." })
        }

        statement = "SELECT firstName, lastName, email, password, roleId, isActive, address, cityId, stateId, countryId, lat, longs from users WHERE userId=?";
        let users = await userUtils.sqlExecutorAsync(null, null, statement, [userAdded.data.insertId]);
        if (users.status === "error") {
            return ({ success: false, message: 'Unexpected error occurred' })
        }

        let user = users.data[0];
        var token = jwt.sign(JSON.stringify(user), process.env.JWT_KEY);

        let userObj = {
            token: token,
            userId: users.data[0].firstName,
            firstName: users.data[0].firstName,
            lastName: users.data[0].lastName,
            email: users.data[0].email,
            roleId: users.data[0].roleId,
            address: users.data[0].address,
            cityId: users.data[0].cityId,
            stateId: users.data[0].stateId,
            countryId: users.data[0].countryId,
            lat: users.data[0].lat,
            longs: users.data[0].longs
        }

        return resolve({ success: true, message: "Registered sucessfully!", data: userObj });
    })
}
async function checkUserLogin(email, password) {
    return new Promise(async (resolve, reject) => {
    let statement = "select * from users WHERE email like ?";
    const users = await userUtils.sqlExecutorAsync(null, null, statement, [email]);
    if (users.data.length <= 0) {
        return resolve({ success: false, message: 'Unexpected error occurred' })
    }
    bcrypt.compare(password, users.data[0].password).then((match) => {
        if (match) {
            if (users.data.length > 0) {
                let user = users.data[0];
                var token = jwt.sign(JSON.stringify(user), process.env.JWT_KEY);
                let userObj = {
                    token: token,
                    userId: users.data[0].firstName,
                    firstName: users.data[0].firstName,
                    lastName: users.data[0].lastName,
                    email: users.data[0].email,
                    roleId: users.data[0].roleId,
                    address: users.data[0].address,
                    cityId: users.data[0].cityId,
                    stateId: users.data[0].stateId,
                    countryId: users.data[0].countryId,
                    lat: users.data[0].lat,
                    longs: users.data[0].longs
                }
                return resolve ({ success: true, message: 'User Successfully logged in.', data: userObj })
            } else {
                return resolve({ success: false, message: 'Invalid username or password!' })
            }
        }
        return resolve({ success: false, message: 'Please enter valid password.' })
    });
})
}

async function getUser(username) {
    let statement = "select * from users WHERE email=?";
    let users = await userUtils.sqlExecutorAsync(null, null, statement, [username]);
    return users;
}
module.exports = {
    checkUserLogin,
    userSignup,
}