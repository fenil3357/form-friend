const dbConn = require('../../config/db.config')
const crypto = require("crypto");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");


// Student sign up model
exports.studentSignUpModel = (data, callBack) => {
    const EnNumber = data.EnNumber;
    var Password = data.Password;
    const EmailId = data.EmailId;
    const MobileNumber = data.MobileNumber;
    const StudentId = crypto.randomUUID();

    var salt = genSaltSync(10);
    Password = hashSync(Password, salt);

    const sign_up_query = `delete from Students where EnNumber = '${EnNumber}';
                           insert into Students(EnNumber, EmailId, MobileNumber, StudentId, Password)
                           values('${EnNumber}', '${EmailId}', '${MobileNumber}', '${StudentId}', '${Password}');`;

    dbConn.query(sign_up_query, (err, res) => {
        if (err) {
            console.log("ERROR WHILE EXECUTING STUDENT SIGN UP MODEL :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}

// Get student from Enrollment Number Model
exports.getStudentFromEnNumModel = (EnNum, callBack) => {
    const en_num_query = `select * from Students where EnNumber = ${EnNum};`;

    dbConn.query(en_num_query, (err, res) => {
        if (err) {
            console.log("ERROR WHILE EXECUTING GET STUDENT BY ENROLLMENT NUMBER MODEL :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}

// Get student from EmailId model
exports.getStudentFromEmailIdModel = (EmailId, callBack) => {
    const emailId_query = `select * from students where EmailId = '${EmailId}';`;

    dbConn.query(emailId_query, (err, res) => {
        if (err) {
            console.log("ERROR WHILE EXECUTING GET STUDENT BY EMAIL ID MODEL :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}

// Get student from Mobile Number Model
exports.getStudentFromMobileNumberModel = (MobileNumber, callBack) => {
    const mobile_number_query = `select * from students where MobileNumber = '${MobileNumber}';`;

    dbConn.query(mobile_number_query, (err, res) => {
        if (err) {
            console.log("ERROR WHILE EXECUTING GET STUDENT BY MOBILE NUMBER MODEL :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}


// Faculty sign up model
exports.facultySignUpModel = (data, callBack) => {
    const EmailId = data.EmailId;
    const MobileNumber = data.MobileNumber;
    const name = data.name;
    var Password = data.Password;
    const FacultyId = crypto.randomUUID();

    var salt = genSaltSync(10);
    Password = hashSync(Password, salt);

    const sign_up_query = `delete from faculty where EmailId = '${EmailId}';
                           insert into faculty(name, EmailId, MobileNumber, FacultyId, Password)
                           values('${name}', '${EmailId}', '${MobileNumber}', '${FacultyId}', '${Password}');`;

    dbConn.query(sign_up_query, (err, res) => {
        if (err) {
            console.log("ERROR WHILE EXECUTING FACULTY SIGN UP MODEL :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}

// Get faculty from EmailId model
exports.getFacultyFromEmailIdModel = (EmailId, callBack) => {
    const emailId_query = `select * from faculty where EmailId = '${EmailId}';`;

    dbConn.query(emailId_query, (err, res) => {
        if (err) {
            console.log("ERROR WHILE EXECUTING GET FACULTY BY EMAIL ID MODEL :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}

// Get faculty from Mobile Number Model
exports.getFacultyFromMobileNumberModel = (MobileNumber, callBack) => {
    const mobile_number_query = `select * from faculty where MobileNumber = '${MobileNumber}';`;

    dbConn.query(mobile_number_query, (err, res) => {
        if (err) {
            console.log("ERROR WHILE EXECUTING GET FACULTY BY MOBILE NUMBER MODEL :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}