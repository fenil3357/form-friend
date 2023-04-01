const dbConn = require('../../config/db.config')
const crypto = require("crypto");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

// Create New Form Model
exports.createFormModel = (data, callBack) => {
    const FormId = crypto.randomUUID();
    const name = data.name;
    const Description = data.Description;
    const Deadline = data.Deadline;
    const FormLink = data.FormLink;
    const SheetLink = data.SheetLink;
    const EmailId = data.EmailId;

    const create_form_query = `insert into Form(FormId, name, Description, EmailId, Deadline, FormLink, SheetLink) values('${FormId}', '${name}', '${Description}', '${EmailId}','${Deadline}', '${FormLink}', '${SheetLink}');`;

    dbConn.query(create_form_query, (err, res) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING CREATE FORM MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, FormId);
    })
} 

// Get all forms of group model
exports.getAllFormsModel = (data, callBack) => {
    const ClusterId = data.ClusterId;

    const get_all_forms_query = `select * from cluster_form where ClusterId = '${ClusterId}' order by CreatedAt desc;`;

    dbConn.query(get_all_forms_query, (err, forms) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING GET ALL FORMS MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, forms);
    })
}

// Share form to group
exports.shareFormToGroupModel = (data, callBack) => {
    const FormId = data.FormId;
    const ClusterId = data.ClusterId;

    const share_form_query = `insert into cluster_form(ClusterId, FormId) values('${ClusterId}', '${FormId}');`;

    dbConn.query(share_form_query, (err, res) => {
        if(err) {
            console.log("ERROR WHILE EXECUTING SHARE FORM MODEL QUERY :" + err);
            callBack(err);
        }
        else callBack(null, res);
    })
}