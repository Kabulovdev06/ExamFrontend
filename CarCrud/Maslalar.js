function countUnique(arr) {
  let unique = [];

  for (let i = 0; i < arr.length; i++) {
    if (unique.indexOf(arr[i]) === -1) {
      unique.push(arr[i]);
    }
  }

  return unique.length;
}
console.log(countUnique([1, 2, 2, 3, 3, 3, 8])); 
console.log(countUnique([4, 4, 4, 4, 4, 45, 4.5])); 


//========================



function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

console.log(capitalizeWords("salom dunyo"));      
console.log(capitalizeWords("men dasturchiman")); 



//=====================


function isPalindrome(str) {
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i]; 
  }

  return str === reversed;
}

console.log(isPalindrome("level")); 
console.log(isPalindrome("hello")); 