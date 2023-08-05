export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  // jeśli chcesz rzucić błąd, a nic się nie wydarzyło, ustaw na 500
  // jeśli coś się wydarzyło samo, ustaw to, co się wydarzyło
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // mongoose not found object _id in DB
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404
    message = 'Resource not found'
  }

  res
    .status(statusCode)
    .json({
      message,
      status: statusCode,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}