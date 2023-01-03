const ridesUtils = require(`./../utils/helper`)
const randomstring = require("randomstring");

async function getRidersDetails(lat, longs) {
    return new Promise(async (resolve, reject) => {
        let statement = `select * from cardetails WHERE currentLat >=? and currentLong<=?`;
        let values = [lat,longs];
        let vokkingAdded = await ridesUtils.sqlExecutorAsync(null, null, statement, values);
        if (vokkingAdded.status === 'error') {
            return resolve({ success: false, message: "Something went wrongss." })
        }
        
        return resolve({ success: true, message: "Rides get successfully.", data: vokkingAdded });
    })
}

async function ridebooking(userId,riderId) {
    return new Promise(async (resolve, reject) => {
        let riderResp = await getDetails(userId,riderId);
        if (riderResp.data.length > 0) {
            return resolve({ success: false, message: "Your ride is already book." })
        }
        let verifyToken = randomstring.generate(20);
        let statement = `INSERT INTO booking (userId,riderId, bookingstatus, token, cteatedAt, updatedAt)
                        VALUES(?,?,?,?,?,?)`;
        let values = [userId,riderId, 'requested',verifyToken, new Date(),new Date() ];
        let vokkingAdded = await ridesUtils.sqlExecutorAsync(null, null, statement, values);
        if (vokkingAdded.status === 'error') {
            return resolve({ success: false, message: "Something went wrongss." })
        }
        
        return resolve({ success: true, message: "Your ride is book" });
    })
}
async function cancelbooking(userId,riderId) {
    return new Promise(async (resolve, reject) => {
        let riderResp = await getDetails(userId,riderId);
        if (riderResp.data.length < 0) {
            return resolve({ success: false, message: "Your ride is not book." })
        }
        let statement = `UPDATE booking SET bookingstatus =?,updatedAt =? WHERE userId = ? AND riderId = ?`;
        let values = ['cancel',new Date(),userId,riderId ];
        let vokkingAdded = await ridesUtils.sqlExecutorAsync(null, null, statement, values);
        if (vokkingAdded.status === 'error') {
            return resolve({ success: false, message: "Something went wrongss." })
        }
        return resolve({ success: true, message: "Your ride is Cancel" });
    })
}

async function getDetails(userId,riderId) {
    let statement = "select * from booking WHERE userId=? and riderId=? and bookingstatus=?";
    let bookingdetails = await ridesUtils.sqlExecutorAsync(null, null, statement, [userId,riderId,'requested']);
    return bookingdetails;
}
module.exports = {
    ridebooking,
    cancelbooking,
    getRidersDetails,
}