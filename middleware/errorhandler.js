const errorHandler = (error, req, res, next) => {
    console.log(error);
    let status = 500;
    let message = "Internal server error";

    if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
    ) {
        status = 400;
        message = error.errors.map((item) => {
            return item.message;
        });
    } else if (error.name === "BadRequest") {
        status = 400;
        message = "Email or Password is required";
    } else if (
        error.name === "Unauthorized" ||
        error.name === "JsonWebTokenError"
    ) {
        status = 401;
        message = "Login First";
    } else if (error.name === "InvalidCredentials") {
        status = 401;
        message = "Invalid Email or Password";
    } else if (error.name === "Forbidden") {
        status = 403;
        message = "the server understands the request but refuses to authorize it";
    } else if (error.name === "NotFound") {
        status = 404;
        message = "Data not found";
    }

    return res.status(status).json({ message });
};

module.exports = { errorHandler };