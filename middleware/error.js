// error response
module.exports = {
    error500: {
        "code": "USR_02",
        "message": "The field example is empty.",
        "field": "example",
        "status": 500
    },

    err400: {
        "error": {
            "status": 400,
            "code": "DEP_02",
            "message": "Don'exist department with this ID.",
            "field": "department_id"
        }
    },

    accessUnauth: {
        "error": {
            "status": 401,
            "code": "AUT_02",
            "message": "Unauthorized access",
            "field": "NoAuth"
        }
    },

    emailsignup: {
        "error": {
            "status": 400,
            "code": "USR_04",
            "message": "The email already exist.",
            "field": "email"
        }
    },

    emaillogin: {
        "error": {
            "status": 400,
            "code": "USR_05",
            "message": "The email doesn't exist.",
            "field": "email"
        }
    }
}

