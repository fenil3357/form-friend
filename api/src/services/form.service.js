const formModel = require('../models/form.model')
require('dotenv').config();
const fetchSheetData = require("../helper/fetchSheetData");

// Create New Form Service
exports.createFormService = (req, res) => {
    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('name') == false || body.hasOwnProperty('Description') == false || body.hasOwnProperty('Deadline') == false || body.hasOwnProperty('FormLink') == false || body.hasOwnProperty('SheetLink') == false || body.hasOwnProperty('EmailId') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    // Check sheet access
    fetchSheetData(body.SheetLink, (err, result) => {
        if (err) {
            res.json({
                Error: "Something went wrong. Please try again",
                ERR_CODE: "DB_ERR",
                status: false
            })
            return;
        }
        else {
            // Sheet accessed
            formModel.createFormModel(body, (err, form) => {
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
                        Msg: "Form Created successfully!",
                        FormId: form,
                        status: true
                    })
                }
            })
        }
    })
}

// Get all forms service
exports.getAllFormsService = (req, res) => {
    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('ClusterId') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    formModel.getAllFormsModel(body, (err, forms) => {
        if (err) {
            res.json({
                Error: "Something went wrong. Please try again",
                ERR_CODE: "DB_ERROR",
                status: false
            })
            return;
        }
        else {
            res.json(forms);
        }
    })
}

// Share Form Service
exports.shareFormService = (req, res) => {
    const body = req.body;

    // not all parameters provided
    if (body.hasOwnProperty('ClusterId') == false || body.hasOwnProperty('FormId') == false) {
        res.json({
            Error: "Please provide all fields",
            ERR_CODE: "BAD_FIELD_ERR",
            status: false
        })
        return;
    }

    formModel.shareFormToGroupModel(body, (err, result) => {
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
                Msg: "Form shared to group",
                status: true
            })
        }
    })
}