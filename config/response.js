const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
      menuResto: {
        status_Code: statusCode,
        data: data,
        message: message,
      },
    });
  };

module.exports = response