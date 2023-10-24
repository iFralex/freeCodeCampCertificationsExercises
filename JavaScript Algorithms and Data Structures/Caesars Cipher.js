//////////////////////////////////
/*
|| See the certification: https://www.freecodecamp.org/certification/iFralex/javascript-algorithms-and-data-structures ||

===== REQUESTS FOR THE EXERCISE =====

One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
*/
//////////////////////////////////

function rot13(str) {
  let arr = [..."abcdefghijklmnopqrstuvwxyz".toUpperCase()]
  let s = ""
  for (let i = 0; i < str.length; i++) {
    let n = arr.indexOf(str[i])
    if (n >= 13)
      n -= 13
    else if (n >= 0)
      n += arr.length - 13
    if (n != -1)
      s += arr[n]
    else
      s += str[i]
  }
  return s;
}

console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."))