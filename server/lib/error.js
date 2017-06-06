var invalidParameter = (parameter, message) => {
  return {
    errors: [{
      type: "invalid_parameter",
      parameter_name: parameter,
      message: message
    }]
  }
}

var invalidModel = (error) => {
  var errors = error.errors.map((error) => {
    return {
      type: "invalid_parameter",
      parameter_name: error.path,
      message: error.message
    }
  })

  return {
    errors: errors
  }
}

var unprocessed = (message) => {
  return {
    errors: [{
      type: "unprocessed",
      message: message
    }]
  }
}

var notFound = (message) => {
  return {
    errors: [{
      type: "not_found",
      message: message
    }]
  }
}

var internalError = (error) => {
  return {
    errors: [{
      type: "internal_error",
      message: "Something went wrong on our side, sorry"
    }]
  }
}

module.exports = {
  invalidParameter: invalidParameter,
  invalidModel: invalidModel,
  unprocessed: unprocessed,
  notFound: notFound,
  internalError: internalError
}
