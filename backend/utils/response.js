const sendSuccess = (res, data, statusCode = 200, meta = {}) => {
  const response = {
    success: true,
    data,
  };

  if (Object.keys(meta).length > 0) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

const sendCreated = (res, data, meta = {}) => {
  return sendSuccess(res, data, 201, meta);
};

const sendNoContent = (res) => {
  return res.status(204).end();
};

const sendError = (res, message, statusCode = 500, errors = []) => {
  const response = {
    success: false,
    error: {
      message,
      ...(errors.length > 0 && { details: errors }),
    },
  };

  return res.status(statusCode).json(response);
};

module.exports = { sendSuccess, sendCreated, sendNoContent, sendError };
