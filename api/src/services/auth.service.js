const authModel = require("../models/auth.model")
const { sign } = require("jsonwebtoken");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

// Student Sign up service
exports.studentSignUpService = (req, res) => {
    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('EnNumber') === false || body.hasOwnProperty('EmailId') === false || body.hasOwnProperty('MobileNumber') === false || body.hasOwnProperty('Password') === false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    // Password validation
    if (body.Password.length < 6) {
        res.json({
            Error: "Password must be atleast 6 characters long",
            ERR_CODE: "PASS_ERR",
            status: false
        })
        return;
    }

    // Mobile number validation
    if (body.MobileNumber.length !== 10) {
        res.json({
            Error: "Please provide valid mobile number",
            ERR_CODE: "MBNUM_ERR",
            status: false
        })
        return;
    }

    // Enrollment umber validation
    if (body.EnNumber.length !== 12) {
        res.json({
            Error: "Please provide valid enrollment number",
            ERR_CODE: "ENNUM_ERR",
            status: false
        })
        return;
    }

    // Check for enrollment number existence
    authModel.getStudentFromEnNumModel(body.EnNumber, (err, student) => {
        if (err) {
            res.json({
                Error: "Something went wrong, Please try again",
                ERR_CODE: "DB_ERR",
                stauts: false
            })
            return;
        }
        else {
            // student with same enrollment number already exists
            if (student.length != 0 || student.length != "") {
                res.json({
                    Error: "Account with this enrollment number already exists",
                    ERR_CODE: "ENNUM_EXISTS",
                    status: false
                })
                return;
            }
            else {
                // Check for email id existence
                authModel.getStudentFromEmailIdModel(body.EmailId, (err, student) => {
                    if (err) {
                        res.json({
                            Error: "Something went wrong, Please try again",
                            ERR_CODE: "DB_ERR",
                            status: false
                        })
                        return;
                    }
                    else {
                        // student with same email id already exists
                        if (student.length != 0 || student.length != "") {
                            res.json({
                                Error: "Account with this email id already exists",
                                ERR_CODE: "EMAIL_EXISTS",
                                status: false
                            })
                            return;
                        }
                        else {
                            // check for mobile number existence
                            authModel.getStudentFromMobileNumberModel(body.MobileNumber, (err, student) => {
                                if (err) {
                                    res.json({
                                        Error: "Something went wrong, Please try again",
                                        ERR_CODE: "DB_ERR",
                                        status: false
                                    })
                                    return;
                                }
                                else {
                                    // student with same mobile number already exists
                                    if (student.length != 0 || student.length != "") {
                                        res.json({
                                            Error: "Account with this mobile number already exists",
                                            ERR_CODE: "MBNUM_EXISTS",
                                            status: false
                                        })
                                        return;
                                    }
                                    else {
                                        // Make new student account
                                        authModel.studentSignUpModel(body, (err, result) => {
                                            if (err) {
                                                res.json({
                                                    Error: "Something went wrong, Please try again",
                                                    ERR_CODE: "DB_ERR",
                                                    status: false
                                                })
                                                return;
                                            }
                                            else {
                                                res.json({
                                                    Msg: "Sign up success",
                                                    status: true
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}

// Student Log in service
exports.studentLogInService = (req, res) => {
    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('EnNumber') == false || body.hasOwnProperty('Password') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    authModel.getStudentFromEnNumModel(body.EnNumber, (err, student) => {
        if (err) {
            res.json({
                Error: "Something went wrong, Please try again",
                ERR_CODE: "DB_ERR",
                status: false
            })
            return;
        }
        else {
            // if student does not exists with given enrollment number
            if (student.length == "" || student.length == 0) {
                res.json({
                    Error: "Student does not exists",
                    ERR_CODE: "STUDENT_DN_EXISTS",
                    status: false
                })
                return;
            }
            else {
                // check if password is valid or not
                const result = compareSync(body.Password, student[0].Password);

                // Valid password
                if (result) {
                    // create json web token
                    const token = sign({ student: student }, process.env.JWT_SECRET, {
                        expiresIn: "30day",
                    });

                    // send token to user
                    res.json({
                        Msg: "Log in successfull!",
                        accessToken: token,
                        role:"STUDENT",
                        studentData: {
                            EnNumber: student[0].EnNumber,
                            EmailId: student[0].EmailId,
                            StudentId: student[0].StudentId
                        },
                        status: true
                    })
                }
                // Invalid password
                else {
                    res.json({
                        Error: "Invalid password",
                        ERR_CODE: "INV_PASS",
                        status: false
                    })
                }
            }
        }
    })
}



// faculty Sign up service
exports.facultySignUpService = (req, res) => {
    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('name') == false || body.hasOwnProperty('EmailId') == false || body.hasOwnProperty('MobileNumber') == false || body.hasOwnProperty('Password') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    // Password validation
    if (body.Password.length < 6) {
        res.json({
            Error: "Password must be atleast 6 characters long",
            ERR_CODE: "PASS_ERR",
            status: false
        })
        return;
    }

    // Mobile number validation
    if (body.MobileNumber.length !== 10) {
        res.json({
            Error: "Please provide valid mobile number",
            ERR_CODE: "MBNUM_ERR",
            status: false
        })
        return;
    }


    // Check for email id existence
    authModel.getFacultyFromEmailIdModel(body.EmailId, (err, faculty) => {
        if (err) {
            res.json({
                Error: "Something went wrong, Please try again",
                ERR_CODE: "DB_ERR",
                status: false
            })
            return;
        }
        else {
            // faculty with same email id already exists
            if (faculty.length != 0 || faculty.length != "") {
                res.json({
                    Error: "Account with this email id already exists",
                    ERR_CODE: "EMAIL_EXISTS",
                    status: false
                })
                return;
            }
            else {
                // check for mobile number existence
                authModel.getFacultyFromMobileNumberModel(body.MobileNumber, (err, faculty) => {
                    if (err) {
                        res.json({
                            Error: "Something went wrong, Please try again",
                            ERR_CODE: "DB_ERR",
                            status: false
                        })
                        return;
                    }
                    else {
                        // faculty with same mobile number already exists
                        if (faculty.length != 0 || faculty.length != "") {
                            res.json({
                                Error: "Account with this mobile number already exists",
                                ERR_CODE: "MBNUM_EXISTS",
                                status: false
                            })
                            return;
                        }
                        else {
                            // Make new faculty account
                            authModel.facultySignUpModel(body, (err, result) => {
                                if (err) {
                                    res.json({
                                        Error: "Something went wrong, Please try again",
                                        ERR_CODE: "DB_ERR",
                                        status: false
                                    })
                                    return;
                                }
                                else {
                                    res.json({
                                        Msg: "Sign up success",
                                        status: true
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    })

}


// Faculty Log in service
exports.facultyLogInService = (req, res) => {
    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('EmailId') == false || body.hasOwnProperty('Password') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    authModel.getFacultyFromEmailIdModel(body.EmailId, (err, faculty) => {
        if (err) {
            res.json({
                Error: "Something went wrong, Please try again",
                ERR_CODE: "DB_ERR",
                status: false
            })
            return;
        }
        else {
            // if faculty does not exists with given email address
            if (faculty.length == "" || faculty.length == 0) {
                res.json({
                    Error: "Faculty does not exists",
                    ERR_CODE: "FACULTY_DN_EXISTS",
                    status: false
                })
                return;
            }
            else {
                // check if password is valid or not
                const result = compareSync(body.Password, faculty[0].Password);

                // Valid password
                if (result) {
                    // create json web token
                    const token = sign({ faculty: faculty }, process.env.JWT_SECRET, {
                        expiresIn: "30day",
                    });

                    // send token to user
                    res.json({
                        Msg: "Log in successfull!",
                        accessToken: token,
                        role:"FACULTY",
                        facultyData: {
                            EmailId: faculty[0].EmailId,
                            FacultyId: faculty[0].FacultyId
                        },
                        status: true
                    })
                }
                // Invalid password
                else {
                    res.json({
                        Error: "Invalid password",
                        ERR_CODE: "INV_PASS",
                        status: false
                    })
                }
            }
        }
    })
}
