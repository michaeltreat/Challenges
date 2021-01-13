/*https://www.codewars.com/kata/596f610441372ee0de00006e

Write a function deNico/de_nico() that accepts two parameters:

key/$key - string consists of unique letters and digits
message/$message - string with encoded message
and decodes the message using the key.

First create a numeric key basing on the provided key by assigning each letter position in which it is located after setting the letters from key in an alphabetical order.

For example, for the key crazy we will get 23154 because of acryz (sorted letters from the key).
Let's decode cseerntiofarmit on using our crazy key.

1 2 3 4 5


TEST:

deNico("crazy", "cseerntiofarmit on  ") should return "secretinformation".
*/

const deNico = (key, m) => { 
  let unsortedKey = key.split('')
  let sortedKey = key.split('').sort()
  let cipherIndex = []
  
  unsortedKey.forEach( (a) => {
    cipherIndex.push( sortedKey.indexOf(a) ) 
  })

  let splitMsg = []
  let splitMsgIndex = 0
   
  for(let i = 0; i < m.length; i++){
    (!splitMsg[splitMsgIndex]) ? splitMsg[splitMsgIndex] = m[i] : splitMsg[splitMsgIndex] += m[i] 
    
    if( (i+1) % (key.length) === 0) splitMsgIndex++ 
  }
 
  let decodedMsg = ''  
  
  splitMsg.forEach( (block) => {
    cipherIndex.forEach( (cipher) => {
      if(block[cipher] !== undefined) decodedMsg+= block[cipher]
    })
  })

 let endSpaces = decodedMsg.length - 1 
 
  while(decodedMsg[endSpaces] === ' '){
    (decodedMsg[endSpaces - 1] !== ' ') ? decodedMsg = decodedMsg.slice(0, endSpaces) : endSpaces-- 
  }
 
  return decodedMsg
}

// const deNico = (key, m) => { 

//   // NOTE: Commented version of the code.
  
//   // Find the cipher index
//   let unsortedKey = key.split('')           // Tracks the original index position of the key
//   let sortedKey = key.split('').sort()      // Sorts the key into alpha-numeric order
//   let cipherIndex = []                      // the index positions of the key when sorted alphabetically and returned back to their original positions. 
  
//   unsortedKey.forEach( (a) => {
//     cipherIndex.push( sortedKey.indexOf(a) ) // For each unsorted key, find it's index in the sortedKey array and push that to cipherIndex.
//   })

//   // Seperates the msg into x blocks where x = key.length
//   let splitMsg = []
//   let splitMsgIndex = 0
  
//     /* Assigns the first value for each position in the index, then adds to it every other time. 
//        This is because splitMsg[i] === undefined at first, and you can't += to undefined. */
 
//   for(let i = 0; i < m.length; i++){
    
//     (!splitMsg[splitMsgIndex]) ? splitMsg[splitMsgIndex] = m[i] : splitMsg[splitMsgIndex] += m[i] 
    
//     if( (i+1) % (key.length) === 0) splitMsgIndex++ // for every <key.length> iterations, move to the next splitMsg index. Just didn't want another for loop.
//   }
  
//   // Build the decoded msg block by block.
  
  
//   /*  For each block of the msg..
//       Go through each cipher..
//       Use the cipher's value as an index to grab a value out of the block
//       and set that as the first value in our decodedMsg.
//   */
//   let decodedMsg = ''  
  
//   splitMsg.forEach( (block) => {
//     cipherIndex.forEach( (cipher) => {
//       if(block[cipher] !== undefined) decodedMsg+= block[cipher]
//     })
//   })
  

  
//  /* Trim off the trailing spaces.
//     Start at the end of the array and go back until you hit something other than a space. */
//  let endSpaces = decodedMsg.length - 1 
 
//   while(decodedMsg[endSpaces] === ' '){
//     (decodedMsg[endSpaces - 1] !== ' ') ? decodedMsg = decodedMsg.slice(0, endSpaces) : endSpaces-- 
//   }
 
//   return decodedMsg
// }
