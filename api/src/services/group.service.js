const groupModel = require("../models/group.model")
const authModel = require("../models/auth.model")
require('dotenv').config();
const verifyToken = require('../helper/verifyToken')


// Create New Group Service
exports.createNewGroupService = (req, res) => {
    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('name') == false || body.hasOwnProperty('Description') == false || body.hasOwnProperty('OwnerFacultyId') == false || body.hasOwnProperty('OwnerFacultyEmail') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    // Data given through JWT
    const facultyData = req.data;

    // If jwt does not contain faculty
    if (facultyData.hasOwnProperty('faculty') == false) {
        res.status(403).json({
            Error: "Access Denied",
            ERR_CDOE: "JWT_ERROR",
            status: false
        })
        return;
    }

    groupModel.createNewGroupModel(body, (err, response) => {
        if (err) {
            res.json({
                Error: "Something went wrong, Please try again!",
                ERR_CODE: "DB_ERROR",
                status: false
            })
            return;
        }
        else {
            res.json({
                Msg: "New Group Created Successfully!",
                ClusterId: response,
                status: true
            })
        }
    });
}

// Add participant to group service
exports.addParticipantService = (req, res) => {

    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('ClusterId') == false || body.hasOwnProperty('EnNumber') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    // Enrollment number length
    if (body.EnNumber.length !== 12) {
        res.json({
            Error: "Please provide valid enrollment number",
            ERR_CODE: "INV_EN_NUMBER",
            stauts: false
        })
        return;
    }

    // Data given through JWT
    const facultyData = req.data;

    // If jwt does not contain faculty
    if (facultyData.hasOwnProperty('faculty') == false) {
        res.status(403).json({
            Error: "Access Denied",
            ERR_CDOE: "JWT_ERROR",
            status: false
        })
        return;
    }

    // Check if student exists or not
    authModel.getStudentFromEnNumModel(body.EnNumber, (err, student) => {
        if (err) {
            res.json({
                Error: "Something went wrong. Please try again!",
                ERR_CODE: "DB_ERROR",
                status: false
            })
            return;
        }
        else {
            // student does not exists
            if (student.length == 0 || student.length == "") {
                res.json({
                    Error: "Student with given enrollment number does not exists",
                    ERR_CODE: "STD_DN_EXISTS",
                    stauts: false
                })
                return;
            }
            else {
                // check if student is already in group
                groupModel.getParticipantFromGroup(body, (err, student) => {
                    if (err) {
                        res.json({
                            Error: "Something went wrong. Please try again!",
                            ERR_CODE: "DB_ERROR",
                            status: false
                        })
                        return;
                    }
                    else {
                        // student is already in that group
                        if (student.length != 0 && student.length != "") {
                            res.json({
                                Error: "Student is already addedd to this group!",
                                ERR_CODE: "STD_EXISTS",
                                status: false
                            })
                            return;
                        }
                        else {
                            groupModel.addParticipantModel(body, (err, result) => {
                                if (err) {
                                    res.json({
                                        Error: "Something went wrong. Please try again!",
                                        ERR_CODE: "DB_ERROR",
                                        status: false
                                    })
                                    return;
                                }
                                else {
                                    res.json({
                                        Msg: "Student added to group successfully!",
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

// Add Faculty to group service
exports.addFacultyService = (req, res) => {

    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('ClusterId') == false || body.hasOwnProperty('EmailId') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    // Data given through JWT
    const facultyData = req.data;

    // If jwt does not contain faculty
    if (facultyData.hasOwnProperty('faculty') == false) {
        res.status(403).json({
            Error: "Access Denied",
            ERR_CDOE: "JWT_ERROR",
            status: false
        })
        return;
    }

    // Check if faculty exists or not
    authModel.getFacultyFromEmailIdModel(body.EmailId, (err, faculty) => {
        if (err) {
            res.json({
                Error: "Something went wrong. Please try again!",
                ERR_CODE: "DB_ERROR",
                status: false
            })
            return;
        }
        else {
            // Faculty does not exists
            if (faculty.length == 0 || faculty.length == "") {
                res.json({
                    Error: "Faculty with given email address does not exists",
                    ERR_CODE: "FAC_DN_EXISTS",
                    stauts: false
                })
                return;
            }
            else {
                // check if faculty is already in group
                groupModel.getFacultyFromGroup(body, (err, faculty) => {
                    if (err) {
                        res.json({
                            Error: "Something went wrong. Please try again!",
                            ERR_CODE: "DB_ERROR",
                            status: false
                        })
                        return;
                    }
                    else {
                        // faculty is already in that group
                        if (faculty.length != 0 && faculty.length != "") {
                            res.json({
                                Error: "Faculty is already addedd to this group!",
                                ERR_CODE: "FAC_EXISTS",
                                status: false
                            })
                            return;
                        }
                        else {
                            groupModel.addFacultyModel(body, (err, result) => {
                                if (err) {
                                    res.json({
                                        Error: "Something went wrong. Please try again!",
                                        ERR_CODE: "DB_ERROR",
                                        status: false
                                    })
                                    return;
                                }
                                else {
                                    res.json({
                                        Msg: "Faculty added to group successfully!",
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

// Update Group Details Service
exports.updateGroupDetailsService = (req, res) => {
    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('ClusterId') == false || body.hasOwnProperty('name') == false || body.hasOwnProperty('Description') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    // Empty name
    if (body.name == "") {
        res.json({
            Error: "Name can't be empty",
            ERR_CODE: "NAME_EMPTY",
            status: false
        })
        return;
    }

    // Data given through JWT
    const facultyData = req.data;

    // If jwt does not contain faculty
    if (facultyData.hasOwnProperty('faculty') == false) {
        res.status(403).json({
            Error: "Access Denied",
            ERR_CDOE: "JWT_ERROR",
            status: false
        })
        return;
    }

    groupModel.updateGroupDetailsModel(body, (err, result) => {
        if (err) {
            res.json({
                Error: "Something went wrong. Please try again!",
                ERR_CODE: "DB_ERROR",
                stauts: false
            })
            return;
        }
        else {
            res.json({
                Msg: "Group details updated successfully!",
                status: true
            })
        }
    })
}

// Get Cluster From Id Service
exports.getClusterFromIdService = (req, res) => {
    const body = req.body;

    if (body.hasOwnProperty("ClusterId") == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    groupModel.getClusterFromIdModel(body, (err, cluster) => {
        if (err) {
            res.json({
                Error: "Something went wrong. Please try again!",
                ERR_CODE: "DB_ERROR",
                status: false
            })
            return;
        }
        else {
            if (cluster.length == 0 || cluster.length == "") {
                res.json({
                    Error: "Cluster does not exists",
                    ERR_CODE: "CLU_DN_EXISTS",
                    status: false
                })
                return;
            }
            else {
                res.json(cluster[0]);
            }
        }
    })
}

// Get all Groups service
exports.getAllGroupsService = (req, res) => {
    const body = req.body;

    if (body.hasOwnProperty("EmailId") == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }
    groupModel.getAllGroupsModel(body, (err, groups) => {
        if (err) {
            res.json({
                Error: "Something went wrong. Please try again",
                status: false
            })
            return;
        }
        else {
            res.json(groups);
        }
    })

}