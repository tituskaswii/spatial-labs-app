export function toUpperCaseFirstLetter(val: string) {
  return val[0].toUpperCase() + val.substr(1, val.length - 1);
}

export const formatter: any = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function isObjectEmpty(obj) {
  return Object?.keys(obj)?.length === 0;
}

export function capitalizeFirstLetter(word) {
  // Check if the input is not an empty string
  if (word.length === 0) {
    return '';
  }

  // Capitalize the first letter and convert the rest to lowercase
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const maskWord = input => {
  if (typeof input !== 'string') {
    return input;
  }

  // Replace all characters except the last 4 with 'X'
  const masked = input?.slice(0, -4)?.replace(/./g, 'X') + input?.slice(-4);

  // Add spaces after every 4 'X's
  const formatted = masked?.replace(new RegExp(`.{${4}}`, 'g'), '$& ');

  return formatted;
};

export function convertToInternationalFormat(localNumber) {
  // Check if the input follows the expected local format
  if (/^0[789]\d{9}$/.test(localNumber)) {
    // Replace the leading '0' with '234'
    return '234' + localNumber?.substring(1);
  } else {
    return 'Invalid input format';
  }
}

export function convertToLocalFormat(internationalNumber) {
  // Check if the input follows the expected international format
  if (/^234[789]\d{9}$/.test(internationalNumber)) {
    // Replace '234' with '0'
    return '0' + internationalNumber?.substring(3);
  } else {
    return 'Invalid input format';
  }
}

export function formatNumberWithCommas(input) {
  if (input === null) {
    return '0.00';
  }

  // Convert to a string with two decimal places and add commas
  return input?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function generateLocationCode(locationName) {
  // Use optional chaining to handle possible null or undefined values
  const firstWord = locationName?.split(' ')[0] || '';
  const words = firstWord?.split(' ');
  let code = '';

  // Iterate through each word in the location name
  for (const word of words) {
    // Take the first three characters of each word and convert to uppercase
    code += word?.slice(0, 3)?.toUpperCase();
  }

  return code;
}
