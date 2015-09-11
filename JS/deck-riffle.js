/*

Determine if the deck of cards is a single riffle, or multiple riffle.

Solution

We walk through shuffled_deck, seeing if each card so far could have come from a riffle of the other two halves. To check this, we:

Keep pointers to the current index in half1, half2, and shuffled_deck.
Walk through shuffled_deck from beginning to end.
If the current card in shuffled_deck is the same as the top card from half1, increment half1_index and keep going. This can be thought of as "throwing out" the top cards of half1 and shuffled_deck, reducing the problem to the remaining cards in the stacks.
Same as above with half2.
If the current card isn't the same as the card at the top of half1 or half2, we know we don't have a single riffle.
If we make it all the way to the end of shuffled_deck and each card checks out, we know we do have a single riffle.

  def is_single_riffle(half1, half2, shuffled_deck):
    half1_index = 0
    half2_index = 0
    half1_max_index = len(half1) - 1
    half2_max_index = len(half2) - 1

    for card in shuffled_deck:
        # if we still have cards in half1
        # and the "top" card in half1 is the same
        # as the top card in shuffled_deck
        if half1_index <= half1_max_index and \
            card == half1[half1_index]:
            half1_index += 1

        # if we still have cards in half2
        # and the "top" card in half2 is the same
        # as the top card in shuffled_deck
        elif half2_index <= half2_max_index and \
            card == half2[half2_index]:
            half2_index += 1

        # if the top card in shuffled_deck doesn't match the top
        # card in half1 or half2, this isn't a single riffle.
        else:
            return False

    # all cards in shuffled_deck have been "accounted for"
    # so this is a single riffle!
    return True

Complexity
O(n)O(n) time and O(1)O(1) additional space.
*/

/*
** There's some setup needed for this problem before I could test it out.
** I've got an array of 52 numbers which I used to create my 2 halves.
** Then I was able to use some JavaScript magic to create a single riffle shuffle.
** I reshuffled that deck a coule more times so I had some test cases.
**
** If you try the unshuffled deck it will pass, so there is still an edge case but if we were being practical, no casino is using unshuffled decks, and if they were, you wouldn't need an algorithm to realize it.
** If I really wanted to eliminate it, a quick function that checks if the last index value was 1 less than the current over half the array would rule out that edge case, but meh.
*/



let deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

// First half of the deck
let half1 = deck.slice(0, deck.length/2);

// Second half of the deck
let half2 = deck.slice(26, deck.length);

let shuffled_arr_deck = half1.map((e,i) => [half1[i], half2[i]]);

let shuffled_deck = [];

let logMap = (value, key, map) => {

    shuffled_deck.push(...value);
};

shuffled_arr_deck.forEach(logMap);


// shuffled_deck = [1, 27, 2, 28, 3, 29, 4, 30, 5, 31, 6, 32, 7, 33, 8, 34, 9, 35, 10, 36, 11, 37, 12, 38, 13, 39, 14, 40, 15, 41, 16, 42, 17, 43, 18, 44, 19, 45, 20, 46, 21, 47, 22, 48, 23, 49, 24, 50, 25, 51, 26, 52]

let shuffled_deck_2 = [1, 14, 27, 40, 2, 15, 28, 41, 3, 16, 29, 42, 4, 17, 30, 43, 5, 18, 31, 44, 6, 19, 32, 45, 7, 20, 33, 46, 8, 21, 34, 47, 9, 22, 35, 48, 10, 23, 36, 49, 11, 24, 37, 50, 12, 25, 38, 51, 13, 26, 39, 52];

let shuffled_deck_3 = [1, 33, 14, 46, 27, 8, 40, 21, 2, 34, 15, 47, 28, 9, 41, 22, 3, 35, 16, 48, 29, 10, 42, 23, 4, 36, 17, 49, 30, 11, 43, 24, 5, 37, 18, 50, 31, 12, 44, 25, 6, 38, 19, 51, 32, 13, 45, 26, 7, 39, 20, 52];


/* Check if the Deck is a single rifle*/
let is_single_riffle = (half1, half2, shuffled_deck) => {

  let card;
  let half1_index = 0;
  let half2_index = 0;
  let half1_max_index = half1.length - 1;
  let half2_max_index = half2.length - 1;

  for ( index of shuffled_deck ) {

    if ( half1_index <= half1_max_index && index == half1[half1_index] ) {
      half1_index += 1;

    } else if ( half2_index <= half2_max_index && index == half2[half2_index] ) {
      half2_index += 1;

    } else {

      return console.log(false);
    }
  }
  return console.log(true);
}

is_single_riffle(half1, half2, shuffled_deck); // true;
is_single_riffle(half1, half2, shuffled_deck_2); // false;
is_single_riffle(half1, half2, shuffled_deck_3); // false;
