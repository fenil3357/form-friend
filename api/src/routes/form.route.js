const formService = require("../services/form.service")

module.exports = (router) => {
    // Create New Form
    router.post("/form/create-form", formService.createFormService);

    // Get all forms
    router.post("/form/get-forms", formService.getAllFormsService);

    // Share form to group
    router.post("/form/share-form", formService.shareFormService);
}