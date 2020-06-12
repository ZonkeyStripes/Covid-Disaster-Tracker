// Write a function that takes in an integer argument and returns a boolean value stating whether the  integer is prime. 

// For the purpose of this activity, a prime number is considered a natural number greater than 1 that has no positive divisors other than 1 and itself.

// loop from 

function isPrime(integer) {

    let result = true;
    if(integer === 1 || integer === 2)
        result = false;

    for(let i = 2; i < integer / 2; i++) {

        if(integer % i === 0) {
            result = false;
        }
    }

    return result;
}

console.log(isPrime(1)); // false 
console.log(isPrime(29)); // true
console.log(isPrime(30)); // false