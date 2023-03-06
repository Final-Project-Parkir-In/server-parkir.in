const errorHandler = (err, req, res, next) => {
  console.log(err, '<<<<< dari err handler wan', new Date());
  // console.log(err.details.body[0].context, '<<<<< dari err handler wan', new Date());
  console.log(err.name, '<<<<< name of err >>>>>>>>>>', new Date());
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "BSONError") {
    status = 404;
    message = "Data not found";
  } else if (err.name === 'BAD REQUEST') {
    status = 400;
    message = 'Please completed your input data!'
  } else if (err.name === 'ValidationError') {
    status = 400;
    message = err.details.body?.map(el => {
      return el.message
    })
  }
  else if (err.name === 'MongoServerError') {
    status = 400;
    message = `${err.keyValue.email} is Allready used`
  }

  return res.status(status).json({ message });
};

module.exports = { errorHandler };
