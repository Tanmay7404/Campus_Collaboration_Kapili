const fs = require('fs').promises;
const {hashlist} = require("server.js") ;

//This is the main algorithm which takes a sentence and
//return true/false whether it is an valid sentence or not
//INPUT:string including whitespaces
//OUTPUT:bool
function checkMeaningfull(str)
{
  console.log(str);

  str.toLowerCase();
  let tokens=[];
  let s="";
  let sum=0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i)>=97&&str.charCodeAt(i)<=97+25) {s+=str[i];}
    else {
      if (s!="") {sum+=isValidEnglish(s);console.log(s);
          tokens.push(s);}
      s="";
    }

  }
  if (s!="") {sum+=isValidEnglish(s); tokens.push(s);}
  console.log(sum);
  console.log(tokens.length);

  let fraction = 0.00;
  sum.toFixed(6);
  fraction = sum / tokens.length;
  fraction *=100;
  // console.log(fraction);

  if (fraction<30) return 0;
  else return 1;
}
//This is the main algorithm which takes a word and
//return true/false whether it is an valid word or not
//INPUT:string
//OUTPUT:bool
function isValidEnglish(str) {
  let target = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 97) {
      target += Math.pow(29, i) * (str.charCodeAt(i) - 96);
    }
    target %= 9007199254740991;
  }

  let lo = 0, hi = hashlist.length - 1, mid;
  let found = false;
  while (lo <= hi) {
    mid = lo + Math.floor((hi - lo) / 2);
    if (hashlist[mid] < target) lo = mid + 1;
    else if (hashlist[mid] > target) hi = mid - 1;
    else {
      found = true;
      break;
    }
  }
  return found;
}

// Kick off the process

module.exports = checkMeaningfull; 