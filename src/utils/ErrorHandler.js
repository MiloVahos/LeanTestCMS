const boom = require('@hapi/boom')

function catchErrors(fn) {
  return (req, res, next) => {
    return fn(req, res, next).catch(next)
  }
}

function notFoundHandler (req, res) {
  const { output: { statusCode, payload } } = boom.notFound()
  console.log(statusCode)
  res.status(statusCode).json(payload)
}

function errorHandler(err, req, res, next) {
  const { output: { statusCode, payload } } = err
  res.status(statusCode).json(payload)
}

function wrapErrors(err, req, res, next) {
  !err.isBoom
    ? err.isAxiosError
      ? next({
        output: {
          statusCode: err.response.status ? err.response.status : 500,
          payload: {
            statusCode: err.response.status ? err.response.status : 500,
            error: err.response.statusText ? err.response.statusText : 'Internal Error',
            message: err.response.data.message ? `${err.response.data.message} | ${err.response.data.errorCode}` : 'Internal Server Error. Please contact support'
          },
          headers: {}
        },
        stack: err.stack ? err.stack : ''
      }) :
      err.code === 'invalid_token'
        ? next({
          output: {
            statusCode: err.status ? err.status : 500,
            payload: {
              statusCode: err.status ? err.status : 500,
              error: err.code ? err.code : 'Internal Error',
              message: err.message ? `${err.message} | ${err.code}` : 'Internal Server Error. Please contact support'
            },
            headers: {}
          },
          stack: err.stack ? err.stack : ''
        }) :
        err.name && err.name === 'SequelizeDatabaseError'
          ? next({
            output: {
              statusCode: 500,
              payload: {
                statusCode: 500,
                error: err.original.routine ? `${err.original.routine} | ${err.name}` : err.name,
                message: err.message ? err.message : 'Internal Server Error. Please contact support'
              },
              headers: {}
            },
            stack: err.stack ? err.stack : ''
          }) :
          err.status && err.message && err.code
            ? next({
              output: {
                statusCode: err.status,
                payload: {
                  statusCode: err.status,
                  error: err.name ? err.name : err.code,
                  message: err.message ? err.message : 'Internal Server Error. Please contact support'
                },
                headers: {}
              },
              stack: err.stack ? err.stack : ''
            }) :
            err.name && err.name === 'MulterError'
              ? next({
                output: {
                  statusCode: 400,
                  payload: {
                    statusCode: 400,
                    error: err.name ? err.name : err.code,
                    message: err.message ? err.message : 'Internal Server Error. Please contact support'
                  },
                  headers: {}
                },
                stack: err.stack ? err.stack : ''
              }) :
              next(boom.badImplementation('Internal Server Error. Please contact'))
    : next(err)
}


module.exports = {
  catchErrors,
  notFoundHandler,
  errorHandler,
  wrapErrors
}