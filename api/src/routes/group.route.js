const groupService = require("../services/group.service")

module.exports = (router) => {
    // Create New Cluster
    router.post("/cluster/create-group/", groupService.createNewGroupService);

    // Add Student to Group
    router.post("/cluster/add-student/", groupService.addParticipantService);

    // Add Faculty to Group
    router.post("/cluster/add-faculty/", groupService.addFacultyService);

    // Edit Group Details
    router.post("/cluster/edit-details", groupService.updateGroupDetailsService);

    // Get Cluster from Id
    router.post("/cluster/get-cluster", groupService.getClusterFromIdService);

    // Get All groups 
    router.post("/cluster/get-groups", groupService.getAllGroupsService);
}