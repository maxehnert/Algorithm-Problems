/*
I originally found this chalenge on Interviewcake but never got to see the code for it. A quick search turned up a SO result from someone who built a very nice implementation of a word cloud and below is what was mentioned for how to build one. This was the only guildline I had for doing this. I'm certain my function is much more verbose than it needs to be (It goes string, array, object, array and many loops new new arrays) but it works and was fun doing. Perhaps I'll work on getting it tighter.
------

Count the words, throw away boring words, and sort by the count, descending. Keep the top N words for some N. Assign each word a font size proportional to its count. Generate a Java2D Shape for each word, using the Java2D API.

Each word "wants" to be somewhere, such as "at some random x position in the vertical center". In decreasing order of frequency, do this for each word:

place the word where it wants to be
while it intersects any of the previously placed words
    move it one step along an ever-increasing spiral
That's it. The hard part is in doing the intersection-testing efficiently, for which I use last-hit caching, hierarchical bounding boxes, and a quadtree spatial index (all of which are things you can learn more about with some diligent googling).

------

Given a string of words. Create a word cloud from them.
You'll want to loop over the string and count how many times each word occurs.
Assign the top 10 words a font size, and remove the rest of the words.
Print them out in some way.


Yes my commenting is ugly.
*/

let wordCloud = string => {

  let sortedWords = [];
  let known_word;
  let unknown_word;
  let word_object = {};

  // Loop through our array of words
  // Separate the string into individual words which also makes it an array
  for ( word of string.split(' ') ) {

    // For now lets set all words to lower case
  	word = word.toLowerCase();

    // If it's a new word, add it to our object
    if( !word_object[word] ) {
      word_object[word] = 1;
    }
    // If it's Not a new word, just increment it
    else {
    	word_object[word] += 1;
    }
  }

  // Loop through our word object so you can put them into an array
  for( word in word_object ) {
    // Setup some regex to stop any punctuation, numbers, or weird characters from getting through
    let valid_letters = /[a-z]/;

    // Push each key,value into an array of arrays
    if( valid_letters.test(word[0]) ) {
    	sortedWords.push( [word, word_object[word]] );
    }
  }
  // Use the built in sorting method to sort by value
  // Only keep the last 10 elements (they have the largest count)
  sortedWords = sortedWords.sort( (a, b) => a[1] - b[1] )
                           .slice(-10);

  // Map over the array
  let logMap = (value, map) => {
    // Write each word to the screen (easiest way to display the word cloud)
    // and set a font size based on it's position in the array.
    // The most frequent word will be the largest.
    var fontSize = value[1] * 15;

    document.write( `<div style='font-size:${fontSize}px'>${value[0]}</div>` );
  };
  sortedWords.forEach(logMap);
};

wordCloud('aa bb Aa cc Aa bb aa bb cc dd ee ee ee ff abc abc abc bbr bbr cci cci cci cci dDe dDe DDE uu uu ');
