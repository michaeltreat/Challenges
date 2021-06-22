'use strict';

// Given an array of stock prices ordered by time,
  // return the greatest amount of profit that could have 
  // been made off of a single purchase, and a single sale.

  // Note that you must buy something before you can sell it!

  // IE: [9,4,8,10,3,5,8] => 6 because of a 4 buy and 10 sale. 
  // [10,0] => 0 because the best profit is to not buy at all.


//The O(n^2) solution is a fairly straight forward.
  // Use a nested loop: 
  // Loop over the array, and loop over it again.
  // Check if those two numbers are greater than the current max and,
  // That they are in the correct time order
    // ( meaning the lower number came first.)
  // Return the max at the end.



// This is my O(n) solution.
  // The answer is found over just 1 iteration of the loop.
  // It Uses a tracker object to keep track of the current high and low,
  // and also tracks the current bestProfit.
  // Two helper functions help to trim the array of impossible answers,
  // and to compute the bestProfit.

  // There is also a testing section on the bottom that uses
  // Random testing to check if it works.
  // There are extra properties in the tracker just for fun :D


function maxProfit(stockPrices){

  let tracker = {
    highValue: null,
    lowValue: null,
    bestProfit: 0,
    low: null,
    high: null,
    computeBestCount: 0,
  }

  // -------- Helper functions -----------

  // This helps to trim off values that cannot be possible.
  function findStartingPoint(idxStart){
    for(let i = idxStart; i < stockPrices.length; i++){
      if(stockPrices[i] < stockPrices[i + 1]){

        tracker.low = i
        if( stockPrices[i + 1] !== undefined) tracker.high = i + 1

        break
      }
    }
  }

  // This is called anytime we need to check if a possible solution is best.
  function computeBest(){
    let total = stockPrices[tracker.high] - stockPrices[tracker.low]
    if( total > tracker.bestProfit ){
      tracker.bestProfit = total  
      // Optional -----
      tracker.lowValue = stockPrices[tracker.low]
      tracker.highValue = stockPrices[tracker.high]
      tracker.computeBestCount++
    }
  }

  // ------- Main Function Begin! ------

  // First, find the lowest starting spot.
  findStartingPoint(0)

  if(tracker.low === null) return 0 // In case the numbers only go down.

  // Find the next lowest number..
  for( let i = tracker.low + 1; i < stockPrices.length; i++){

    //  .. While keeping track of the highest along the way.
    if(stockPrices[i] > stockPrices[tracker.high]) tracker.high = i
    
    if(stockPrices[i + 1] < stockPrices[tracker.low]){
      // When a new low is found, compute best
      computeBest()

      // Then find a new low again. Also trims again if needed.
      // IE [5,6,4,3,10] would trim off 4 in the following function.
      findStartingPoint(i + 1)
    }
  }

  //Final check
  if(tracker.high) computeBest()
  
  return tracker
}

// ----- Testing -----

let random = new Array(100)
for(let i = 0; i < random.length; i++){
  random[i] = Math.ceil(Math.random() * 100)
  console.log('Index -> ', i,' - ', random[i], ' <- value')
}
console.log(maxProfit(random))



