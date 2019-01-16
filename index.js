'use strict'; // Enforce use of strict version of JavaScript

/*	@Doc
	ALl the currency will be written with uppercase

	@Program Flow:
	The rates file will be read in from the file system at program startup
		The rates will be either stored in a JSON file, or read from real time stats
*/

// The currency that all other currencies are measured against.
var measurement_currency = 'USD'; // also known as the std. value

const rates = {
	USD: 1,
	SGD: 1.36,
	GBP: 0.78,
	AUD: 1.39
};

// Function to check if the currency exists.
const currencyCheck = (currency) => (!rates[currency]) ? new Error('ERROR: Specified currency does not exist') : true;
// Convert the given currency into the standard measurement currency
const convertToMeasurementCurrency = (currency, amnt) => currencyCheck(currency) ? (amnt / rates[currency]) : false;
// Convert currency from USD to the specified currency
const convertTo = (currency, amnt) => currencyCheck(currency) ? (amnt * rates[currency]) : false;