Solution
We’ll greedily ↴ walk through the array to track the max profit and lowest price so far.

For every price, we check if:

we can get a better profit by buying at minPrice and selling at the currentPrice
we have a new minPrice
To start, we initialize:

minPrice as the first price of the day
maxProfit as the first profit we could get
We decided to return a negative profit if the price decreases all day and we can't make any money. We could have thrown an error instead, but returning the negative profit is cleaner, makes our function less opinionated, and ensures we don't lose information.

  def getMaxProfit(stockPricesYesterday):

    # make sure we have at least 2 prices
    if len(stockPricesYesterday) < 2:
        raise IndexError('Getting a profit requires at least 2 prices')

    # well greedily update minPrice and maxProfit, so we initialize
    # them to the first price and the first possible profit
    minPrice = stockPricesYesterday[0]
    maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0]

    for index, currentPrice in enumerate(stockPricesYesterday):

        # skip the first (0th) time
        # we cant sell at the first time, since we must buy first,
        # and we can't buy and sell at the same time!
        # if we took this out, we'd try to buy /and/ sell at time 0.
        # this would give a profit of 0, which is a problem if our
        # maxProfit is supposed to be /negative/--we'd return 0!
        if index == 0:
            continue

        # see what our profit would be if we bought at the
        # min price and sold at the current price
        potential_profit = currentPrice - minPrice

        # update maxProfit if we can do better
        maxProfit = max(maxProfit, potential_profit)

        # update minPrice so its always
        # the lowest price we've seen so far
        minPrice  = min(minPrice, currentPrice)

    return maxProfit


/*
 * This one was pretty simple, I just had to switch up to an for..of loop which seemed weird that the original problem asked of
 * an array but used a for..in loop with enumerate. In JS you are relly only going to be doing this with an objectself.
 * Then to target the index of 0 I just had to use indexOf to find the element in index 0. Other than that,
 * it was pretty straight up.
*/

let getMaxProfit = stockPricesYesterday => {

  // stockPricesYesterday is an array

  let minPrice = stockPricesYesterday[0];
  let maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];

  // make sure we have at least 2 prices
  if ( stockPricesYesterday.length < 2 ) {
    return false;
  }

  for ( currentPrice of stockPricesYesterday ) {

    if( stockPricesYesterday.indexOf(currentPrice) == 0 ) {
      continue;
    }

    let potential_profit = currentPrice - minPrice;

    maxProfit = Math.max( maxProfit, potential_profit );

    minPrice  = Math.min( minPrice, currentPrice );

  }
  console.log( maxProfit );
  return maxProfit;

}

getMaxProfit([70,20,90]); // 70
getMaxProfit([70,90,30]); // 20
