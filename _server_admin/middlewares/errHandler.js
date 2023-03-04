const errorHandler = (err, req, res, next) => {
    console.log("err", err);
    let status = 500;
    let message = "Internal Server Error";
  
    if (err.name === "BSONTypeError") {
      status = 404;
      message = "DATA NOT FOUND!";
    } else if (err.name === 'BAD_REQUEST'){
      status = 400;
      message = 'Please completed your input data!'
    }
  
    return res.status(status).json({ message });
  };
  
  module.exports = { errorHandler };
  