// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
let quoteBox = document.getElementById('quote-box');


// Array Helper Methods

// Accepts an array and returns random number based on array length
function getRandNum(arr){
  return Math.floor(Math.random() * arr.length);
}

//Sets item.used property to false for all items in array
function resetArray(arr){
  arr.forEach(item => item.used = false);
}

// Makes an array of unused quotes and passes to a callback.
function getUnusedQuotes(arr, cb){
  let unusedQuotes = arr.filter(arr => !arr.used);
  return cb(unusedQuotes);
}

// plucks a random quotes from an array
function getUniqueQuote(arr){
  const quote = arr[getRandNum(arr)];
  return quote;
}

// Uses helper functions to return a unique quote from array of unique quotes
function getRandomQuote(){
  return getUnusedQuotes(quotes, (uniqueArr) => {
    // make sure the array still has quotes
    if(uniqueArr.length === 1){
      // if there's only one quote left, reset the array before returning a random quote
      resetArray(quotes);
      return getUniqueQuote(uniqueArr);
    } else {
      return getUniqueQuote(uniqueArr);
    }
  });
}

function printQuote(){
  // get a random quote and a random color
  const randColor = colors[getRandNum(colors)];
  const quote = getRandomQuote();
  //mark quote used
  quote.used = true;
  if(quote.year && quote.citation){
    quoteBox.innerHTML = `
      <p class="quote"> ${quote.quote} </p> 
      <p class="source"> ${quote.source}
        <span class="citation"> ${quote.citation} </span> 
        <span class="year"> ${quote.year} </span> 
      </p>
    `
  } else {
    quoteBox.innerHTML = `
      <p class="quote"> ${quote.quote} </p> 
      <p class="source"> ${quote.source}</p>
    `
  }
  document.querySelector('body').style.backgroundColor = randColor;
  document.querySelector('button').style.backgroundColor = randColor;

  console.log(quote.quote);
}

// Counter and init functions
function counter(){
  let counter = 10;
  let interval = setInterval(function(){
    document.getElementById('counter').innerHTML = "Automagic quote change in: " + counter;
    counter = counter - 1;
    if(counter < 0){
      clearInterval(interval);
    }
  }, 1000)
}

// Initialize quote and counter 
function autoQuote(){
  printQuote();
  counter();
}

setInterval(autoQuote, 11000);
autoQuote();
