Solution
We’ll greedily ↴ walk through the array to track the max profit and lowest price so far.

For every price, we check if:

we can get a better profit by buying at min_price and selling at the current_price
we have a new min_price
To start, we initialize:

min_price as the first price of the day
max_profit as the first profit we could get
We decided to return a negative profit if the price decreases all day and we can't make any money. We could have thrown an error instead, but returning the negative profit is cleaner, makes our function less opinionated, and ensures we don't lose information.

  def get_max_profit(stock_prices_yesterday):

    # make sure we have at least 2 prices
    if len(stock_prices_yesterday) < 2:
        raise IndexError('Getting a profit requires at least 2 prices')

    # well greedily update min_price and max_profit, so we initialize
    # them to the first price and the first possible profit
    min_price = stock_prices_yesterday[0]
    max_profit = stock_prices_yesterday[1] - stock_prices_yesterday[0]

    for index, current_price in enumerate(stock_prices_yesterday):

        # skip the first (0th) time
        # we cant sell at the first time, since we must buy first,
        # and we can't buy and sell at the same time!
        # if we took this out, we'd try to buy /and/ sell at time 0.
        # this would give a profit of 0, which is a problem if our
        # max_profit is supposed to be /negative/--we'd return 0!
        if index == 0:
            continue

        # see what our profit would be if we bought at the
        # min price and sold at the current price
        potential_profit = current_price - min_price

        # update max_profit if we can do better
        max_profit = max(max_profit, potential_profit)

        # update min_price so its always
        # the lowest price we've seen so far
        min_price  = min(min_price, current_price)

    return max_profit


/*
 * This one was pretty simple, I just had to switch up to an for..of loop which seemed weird that the original problem asked of
 * an array but used a for..in loop with enumerate. In JS you are relly only going to be doing this with an objectself.
 * Then to target the index of 0 I just had to use indexOf to find the element in index 0. Other than that,
 * it was pretty straight up.
*/

let get_max_profit = stock_prices_yesterday => {

  // stock_prices_yesterday is an array

  let min_price = stock_prices_yesterday[0];
  let max_profit = stock_prices_yesterday[1] - stock_prices_yesterday[0];

  // make sure we have at least 2 prices
  if ( stock_prices_yesterday.length < 2 ) {
    return false;
  }

  for (current_price of stock_prices_yesterday) {

    if( stock_prices_yesterday.indexOf(current_price) == 0 ) {
      continue;
    }

    let potential_profit = current_price - min_price;

    max_profit = Math.max(max_profit, potential_profit);

    min_price  = Math.min(min_price, current_price);

  }
  console.log( max_profit);
  return max_profit;

}

get_max_profit([70,20,90]); // 70
get_max_profit([70,90,30]); // 20
