// event listener to respond to "Show any quote" button clicks
// when user clicks on the button, "printQuote" function is called
// timer is reset
document.getElementById('loadQuote').addEventListener("click", function(){
  printQuote();
  resetTimer();
}, false);


//start timer 15 seconds
var timer = window.setInterval(printQuote, 15000);


//array of quotes with quote, source properties and optional properties of citation, year, and tags
var quotes = [
  {
    quote: "Success is the ability to go from one failure to another with no loss of enthusiasm",
    source: "Winston Churchill",
    tags: ["motivational", "politics"]
  },
  {
    quote: "You can discover more about a person in an hour of play than in a year of conversation.",
    source: "Plato",
    tags: ["motivational", "philosopy"]
  },
  {
    quote: "Thinking is the hardest work there is. That is why so few people engage in it.",
    source: "Henry Ford",
    tags: ["business"]
  },
  {
    quote: "Imagination is more important than knowledge.",
    source: "Albert Einstein",
    tags: ["motivational"]
  },
  {
    quote: "When I let go of what I am, I become what I might be.",
    source: "Lao Tzu",
    tags: ["motivational"]
  },
  {
    quote: "Learn the rules like a pro, so you can break them like an artist.",
    source: "Pablo Picasso",
    tags: ["business", "motivational"]
  },
  {
    quote: "I am an old man and have known a great many troubles, but most of them never happened.",
    source: "Mark Twain",
    tags: ["motivational", "literature"]
  },
  {
    quote: "The limits of my language mean the limits of my world.",
    source: "Ludwig Wittgenstein",
    tags: ["motivational"]
  }
];

//array storing quotes that are used once already
var usedQuotes = [];

//functions

function getRandomBackground(){
  //randomly generate a different numeric value for r g and b for random background color
  // that could be refactored but doesnt seem efficient for only 3 variables.
  var r = Math.floor(Math.random() * 257);
  var g = Math.floor(Math.random() * 257);
  var b = Math.floor(Math.random() * 257);
  document.body.style.backgroundColor=`rgb(${r},${g},${b})`;
  //change background of button to match as well
  document.getElementById('loadQuote').style.backgroundColor=`rgb(${r},${g},${b})`;
}

function resetTimer() {
  //resets timer - to be used when button is clicked
  clearInterval(timer);
  timer = window.setInterval(printQuote, 15000);
}


function getRandomQuote() {
  var quote;

  //when arrays === same length reset the usedQuote array to empty
  if(quotes.length === usedQuotes.length){
    usedQuotes = [];
  }

  //uses indexOf and conditional to check usedQuote array to not display a usedQuote until all have been used
  do {
    //selects a random quote object from array 0-7
    quote = Math.floor(Math.random() * quotes.length)
  } while (usedQuotes.indexOf(quote) > -1)


  //pushes quote to usedQuote array
  usedQuotes.push(quote);

  //log quote to console
  console.log(quotes[quote]);

  //returns randomly selected quote object
  return quotes[quote];
}


function printQuote() {
  //calls getRandomQuote and stores value in variable
  var quote = getRandomQuote();

  //constructs string containing properties of quote object
  var htmlString = `
    <p class="quote"> ${quote.quote} </p>
    <p class="source"> ${quote.source}`;

  // conditional that checks for citation and year and tags properties to display
  if (quote.citation) {
    htmlString += ` <span class="citation">${quote.citation}</span>`;
  }

  if (quote.year) {
    htmlString += ` <span class="year">${quote.year}</span>`;
  }

  if (quote.tags) {
    htmlString += ` <span class="tags">${quote.tags.join(" #")}</span>`;
  }

  //close paragraph tag after conditionals
  htmlString += `</p>`;

  //changes background for new quote
  getRandomBackground();

  //displays final HTML string to page
  document.getElementById('quote-box').innerHTML = htmlString;
}
