const dbConn = require('../../config/db.config')
const crypto = require("crypto");

// Create New Group Model
exports.createNewGroupModel = (data, callBack) => {
    const ClusterId = crypto.randomUUID();
    const name = data.name;
    const Description = data.Description;
    const OwnerFacultyId = data.OwnerFacultyId;
    const OwnerFacultyEmail = data.OwnerFacultyEmail;

    const create_cluster_query = `insert into Cluster(ClusterId, name, Description, OwnerFacultyId, OwnerFacultyEmail)
                                  values('${ClusterId}', '${name}', '${Description}', '${OwnerFacultyId}', '${OwnerFacultyEmail}');`;

    dbConn.query(create_cluster_query, (err, res) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING CREATE CLUSTER MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, ClusterId);
    })
}

// Get participant from group Model
exports.getParticipantFromGroup = (data, callBack) => {
    const EnNumber = data.EnNumber;
    const ClusterId = data.ClusterId;

    const get_participant_query = `select * from cluster_participant where ClusterId = '${ClusterId}' and EnNumber = '${EnNumber}';`;

    dbConn.query(get_participant_query, (err, student) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING GET PARTICIPANT FROM GROUP MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, student);
    })
}

// Add Participant Model
exports.addParticipantModel = (data, callBack) => {
    const ClusterId = data.ClusterId;
    const EnNumber = data.EnNumber;

    const add_participant_query = `delete from cluster_participant where ClusterId = '${ClusterId}' and EnNumber = '${EnNumber}';
                                   insert into cluster_participant(ClusterId, EnNumber) values('${ClusterId}', '${EnNumber}');`;

    dbConn.query(add_participant_query, (err, res) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING ADD PARTICIPANT MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}

// Get Faculty from group Model
exports.getFacultyFromGroup = (data, callBack) => {
    const EmailId = data.EmailId;
    const ClusterId = data.ClusterId;

    const get_faculty_query = `select * from cluster_faculty where ClusterId = '${ClusterId}' and EmailId = '${EmailId}';`;

    dbConn.query(get_faculty_query, (err, faculty) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING GET FACULTY FROM GROUP MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, faculty);
    })
}

// Add Faculty Model
exports.addFacultyModel = (data, callBack) => {
    const ClusterId = data.ClusterId;
    const EmailId = data.EmailId;

    const add_faculty_query = `delete from cluster_faculty where ClusterId = '${ClusterId}' and EmailId = '${EmailId}';
                               insert into cluster_faculty(ClusterId, EmailId) values('${ClusterId}', '${EmailId}');`;

    dbConn.query(add_faculty_query, (err, res) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING ADD FACULTY MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}

// Update Group Details Model
exports.updateGroupDetailsModel = (data, callBack) => {
    const ClusterId = data.ClusterId;
    const name = data.name;
    const Description = data.Description;

    const update_details_query = `update Cluster set name = '${name}', Description = '${Description}' where ClusterId = '${ClusterId}';`;

    dbConn.query(update_details_query, (err, res) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING UPDATE GROUP DETAILS MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}

// Get Cluster from cluster Id Model
exports.getClusterFromIdModel = (data, callBack) => {
    const ClusterId = data.ClusterId;

    const get_cluster_query = `select * from Cluster where ClusterId = '${ClusterId}';`;

    dbConn.query(get_cluster_query, (err, res) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING GET CLUSTER FROM ID MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}

 // Get all groups model
 exports.getAllGroupsModel = (data, callBack) => {
    const EmailId =  data.EmailId;

    const get_all_groups_query = `select * from cluster_faculty where EmailId = '${EmailId}';`;

    dbConn.query(get_all_groups_query, (err, groups) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING GET ALL GROUPS MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, groups);
    })
 }