Count the words, throw away boring words, and sort by the count, descending. Keep the top N words for some N. Assign each word a font size proportional to its count. Generate a Java2D Shape for each word, using the Java2D API.

Each word "wants" to be somewhere, such as "at some random x position in the vertical center". In decreasing order of frequency, do this for each word:

place the word where it wants to be
while it intersects any of the previously placed words
    move it one step along an ever-increasing spiral
That's it. The hard part is in doing the intersection-testing efficiently, for which I use last-hit caching, hierarchical bounding boxes, and a quadtree spatial index (all of which are things you can learn more about with some diligent googling).


Given a string of words. Create a word cloud from them.
You'll want to loop over the string and count how many times each word occurs.
Assign the top 10 words a font size, and remove the rest of the words.
Print them out in some way.

// saving the top 10 words in a string and setting those to select font sizes
// how to save and check and increment the count of each word?
//
// then I need to sort the words by highest count and only keep the top 10 basically
//

let wordCloud = string => {

  let known_word;
  let unknown_word;
  let word_object = {};

  // Separate the string into individual words
  var string = string.split(' ');

  var sortedWords = [];

  console.log(string);

  // Loop through our array of words
  for (word of string) {
    //console.log(word);

    // If it's a new word, add it to our object
    if(word_object[word] == undefined){
      word_object[word] = 1;
    }
    // If it's Not a new word, just increment it
    else {
    	word_object[word] += 1;
    }

  }
  console.log(word_object);

  // Loop through our word object so you can put them into an array
  // THIS CAN BE FIXED BY USING NEW MAP() I BELIEVE
  for( word in word_object) {
    // console.log('word ' + word_object[word]);

    // Pushg each key,value into an array of arrays
    if( word != ""){
    	sortedWords.push([word, word_object[word]]);
    }
  }

  // Use the built in sorting method to sort by value
  sortedWords.sort( (a, b) => a[1] - b[1] );

  
  console.log(sortedWords);

  // Map over the array
  let logMap = (value, map) => {
    console.log(value + ' ' + value[0]);

    // Write each word to the screen (easiest way to display the word cloud) and set a font size
    // based on it's position in the array. So the most frequent word will be the largest
    var fontSize = value[1] * 15;
    document.write( `<div class='asdf' style='font-size:${fontSize}px'>${value[0]}</div>` )
  };
  sortedWords.forEach(logMap);
};

wordCloud('aa bb aa cc aa bb aa bb cc dd ee ee ee ff ff ff ff ff ff tt tt tt tt rr rr ee ee ee ww ww qq qq xx xx vv vv n nn ');
