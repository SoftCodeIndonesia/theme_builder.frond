exports.matchValue = (value, source) => {
    if(value === source){
        return true;
    }else{
        return false;
    }
}

exports.isDeadline = (expired) => {
    let today = new Date();
    return today < expired;
  }