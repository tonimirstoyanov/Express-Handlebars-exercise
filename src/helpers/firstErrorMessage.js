exports.getFirstErrorMessage = function (error) {

    let errorArray = Object.keys(error.errors);
    
    if (errorArray.length > 0) {
        return error.errors[errorArray[0]]
    } else {
        return error.message
    }
}

