// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

// a2 + b2 = c2

// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.


let triplet = () => {

  	// Calculate all the primes in 1 million
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= 1000000; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i * 2; j <= 1000000; j += i) {
                sieve[j] = true;
            }
        }
    }
  	// primes now = an array of prime numbers][=]
}
