'use strict'; // Enforce use of strict version of JavaScript

/*	@Doc
	ALl the currency will be written with uppercase

	@Program Flow:
	The rates file will be read in from the file system at program startup
		The rates will be either stored in a JSON file, or read from real time stats

	
	@Features to do:
	- Implement a history feature, where you can recall your last few conversions
	- Make it into a CLI tool
*/

// Dependencies
const rates = require('./rates.json'); // Import and parse JSON file
const fs = require('fs'); // Used to read and write to the fs to store the rates data.
/*	@Destructure out:
	- Precision variable: How precise the output will be in Decimal Points
*/
const { precision } = require('./program_data.json');


// Testing util
const log = (str) => console.log(str);

// The currency that all other currencies are measured/valued against.
var std_currency = 'USD'; // also known as the std. value or the base currency for comparision
// Function to set the currency to be used as the std. of conversion.
// const set_std_currency = (cur) => rates[cur] ? (std_currency = cur) : new Error('ERROR: Currency does not exist');
const set_std_currency = (cur) => {
	function convert_rates() {
		rates.forEach((rate) => {

		})

		for (let key in rates) {
			key
		}

		Object.keys(rates).forEach((key) => {

		})

		/*	How do I convert the values to the new std base?
			- Find the rate of the currency to convert to from the obj.
			- Keep track of the new base_currency and the old base_currency
			use the convert function first, with a value of 1
			convert(Currency, GBP, 1)
		*/

		// How to make multiple properties in JS obj point to the same value.

		// Last step is to set the currency
		std_currency = cur;
		// Also after converting the whole rates file, save it back to the rates file.
		fs.open(`rates_${cur}.json`, 'w+', (err, fd) => {
			if (err)
				return console.error(err);
			// fs.write(fd, JSON.stringify(rates), (err, written))
		});
	}

	// rates[cur] ? convert_rates() : new Error('ERROR: Currency does not exist');
	rates[cur] ? convert_rates() : new Error('ERROR: Currency does not exist');
};

// Function to set precision level
// const set_precision = (dpts) => precision = dpts; // Set to the input decimal points
function set_precision(dpts) {
	// Set the precision level to the input decimal points
	precision = dpts;
	// Persist this data to the configuration/program-data file.

}

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