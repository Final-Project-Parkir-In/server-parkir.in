const errorHandler = (err, req, res, next) => {
  console.log(err, '<<<<< dari err handler wan', new Date());
  // console.log(err.details.body[0].context, '<<<<< dari err handler wan', new Date());
  console.log(err.name, '<<<<< name of err >>>>>>>>>>', new Date());
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "BSONError") {
    status = 404;
    message = "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer";
  }else if (err.name === "Data not found") {
    status = 404;
    message = "Data not found";
  }else if (err.name === `invalid Username or Password`) {
    status = 401;
    message = `Invalid Username or Password`;
  } else if (err.name === 'BAD REQUEST') {
    status = 400;
    message = 'Please completed your input data!'
  } else if (err.name === 'ValidationError') {
    status = 400;
    message = err.details.body?.map(el => {
      return el.message
    })
  } else if (err.name === 'MongoServerError') {
    status = 400;
    message = `Email is Allready used`
  }

  return res.status(status).json({ message });
};

module.exports = { errorHandler };
