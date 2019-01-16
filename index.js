'use strict'; // Enforce use of strict version of JavaScript

/*	@Doc
	ALl the currency will be written with uppercase

	@Program Flow:
	The rates file will be read in from the file system at program startup
		The rates will be either stored in a JSON file, or read from real time stats
*/

// Testing util
const log = (str) => console.log(str);

// The currency that all other currencies are measured/valued against.
var std_currency = 'USD'; // also known as the std. value
// Function to set the currency to be used as the std. of conversion.
const set_std_currency = (cur) => rates[cur] ? (std_currency = cur) : new Error('ERROR: Currency does not exist');
// How precise in Decimal Points.
var precision = 3;
// Function to set precision level
const set_precision = (dpts) => precision = dpts; // Set to the input decimal points

const rates = {
	USD: 1,
	SGD: 1.36,
	GBP: 0.78,
	AUD: 1.39
};

// Function to convert currency to uppercase, which is used throught the whole program.
const getCurrency = (cur) => cur.trim().toUpperCase();
// Convert the given currency into the standard measurement currency
const convertToStdCurrency = (cur, amnt) => rates[cur] ? (amnt / rates[cur]) : new Error('ERROR: Currency does not exist');
// Convert currency from USD to the specified currency
const convertTo = (cur, amnt) => rates[cur] ? (amnt * rates[cur]) : new Error('ERROR: Currency does not exist');

function convert2(frm, to, amnt) {
	// Clean and format the input first
	frm = getCurrency(frm);
	to = getCurrency(to);

	return Number(convertTo(to, convertToStdCurrency(frm, amnt)).toFixed(precision));
}

// Function that converts the amount from currency 'frm' to currency 'to'
const convert = (frm, to, amnt) => Number(convertTo(getCurrency(to), convertToStdCurrency(getCurrency(frm), amnt)).toFixed(precision));

log(convert('aud', 'sgd', 1));