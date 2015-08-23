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

let wordCloud = string => {

  let known_word;
  let unknown_word;
  let word_object = {};

  for (word of string){
    console.log(word);

    if(word_object[word] == undefind){
      word_object[word] = 1;
    }
    else{

    }

  }
}

wordCloud('aa bb cc dd')
