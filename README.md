# timefreeze

Freeze time to a specific date for testing.

# Usage

```
var timefreeze = require('timefreeze');

// Normal date
var a = new Date();

// Set frozen date to 2000-1-1
timefreeze.freeze(new Date(2000,1,1));

// create a new date, will be set to 2000-1-1
var b = new Date();

// Set frozen date to 3000-1-1
timefreeze.freeze(new Date(3000,1,1));

// create a new date, will be set to 3000-1-1
var c = new Date();

// Go back to making dates 2000-1-1
timefreeze.unfreeze();

// Go back to normal
timefreeze.unfreeze();

// go back to normal reguardless of how many times freeze() has been called.
timefreeze.reset();

// set the current frozen time to 2020-1-1
timefreeze.set(new Date(2020,1,1));

// check if time is frozen
timefreeze.isFrozen();

```