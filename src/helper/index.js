exports.matchValue = (value, source) => {
    if(value === source){
        return true;
    }else{
        return false;
    }
}

exports.capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

exports.capitalizeEveryWord = (str) => {
    var words = str.split(' ');
    var capitalizedWords = [];
    for (var i = 0; i < words.length; i++) {
      capitalizedWords.push(this.capitalizeFirstLetter(words[i]));
    }
    return capitalizedWords.join(' ');
 }

exports.isDeadline = (expired) => {
    let today = new Date();
    return today < expired;
  }