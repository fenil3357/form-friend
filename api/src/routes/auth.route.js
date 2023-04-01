const authService = require("../services/auth.service")

module.exports = (router) => {
    // student sign up
    router.post("/auth/signup/student/", authService.studentSignUpService);

    // student log in
    router.post("/auth/login/student/", authService.studentLogInService);

    // faculty sign up
    router.post("/auth/signup/faculty/", authService.facultySignUpService);

    // faculty log in
    router.post("/auth/login/faculty/", authService.facultyLogInService);
}