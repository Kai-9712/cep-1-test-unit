/**
 * Checks if a string is a valid phone number without the plus sign.
 * @param {string} value - The phone number to validate.
 * @returns {boolean} True if the number is valid, false otherwise.
 */
export const isPhoneE164 = value => !!value.match(/^[0-9]\d{1,14}$/);

/**
 * Validates a phone number after removing the dial code.
 * @param {string} value - The full phone number including dial code.
 * @param {string} dialCode - The dial code to remove before validation.
 * @returns {boolean} True if the number (without dial code) is valid, false otherwise.
 */
export const isPhoneNumberValid = (value, dialCode) => {
  const number = value.replace(dialCode, '');
  return !!number.match(/^[0-9]{1,14}$/);
};

/**
 * Checks if a string is either a valid phone number or empty.
 * @param {string} value - The phone number to validate.
 * @returns {boolean} True if the number is valid or empty, false otherwise.
 */
export const isPhoneE164OrEmpty = value => isPhoneE164(value) || value === '';

/**
 * Validates a phone number with dial code, requiring at least 5 digits.
 * @param {string} value - The full phone number including dial code.
 * @returns {boolean} True if the number is valid, false otherwise.
 */
export const isPhoneNumberValidWithDialCode = value => {
  return !!value.match(/^[0-9]\d{4,}$/); // Validate the phone number with minimum 5 digits
};

/**
 * Checks if a string starts with a specific character.
 * @param {string} value - The string to check.
 * @param {string} char - The character to check for.
 * @returns {boolean} True if the string starts with the character, false otherwise.
 */
export const startsWithChar = (value, char) => value.startsWith(char);

/**
 * Checks if a string is a valid URL (starts with 'http') or is empty.
 * @param {string} [value=''] - The string to check.
 * @returns {boolean} True if the string is a valid URL or empty, false otherwise.
 */
export const shouldBeUrl = (value = '') =>
  value ? value.startsWith('http') : true;

/**
 * Validates a password for complexity requirements.
 * @param {string} value - The password to validate.
 * @returns {boolean} True if the password meets all requirements, false otherwise.
 */
export const isValidPassword = value => {
  const containsUppercase = /[A-Z]/.test(value);
  const containsLowercase = /[a-z]/.test(value);
  const containsNumber = /[0-9]/.test(value);
  const containsSpecialCharacter = /[!@#$%^&*()_+\-=[\]{}|'"/\\.,`<>:;?~]/.test(
    value
  );
  return (
    containsUppercase &&
    containsLowercase &&
    containsNumber &&
    containsSpecialCharacter
  );
};

/**
 * Checks if a string consists only of digits.
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string contains only digits, false otherwise.
 */
export const isNumber = value => /^\d+$/.test(value);

/**
 * Validates a domain name.
 * @param {string} value - The domain name to validate.
 * @returns {boolean} True if the domain is valid or empty, false otherwise.
 */
export const isDomain = value => {
  if (value !== '') {
    const domainRegex = /^([\p{L}0-9]+(-[\p{L}0-9]+)*\.)+[a-z]{2,}$/gmu;
    return domainRegex.test(value);
  }
  return true;
};

/**
 * Creates a RegExp object from a string representation of a regular expression.
 * @param {string} regexPatternValue - The string representation of the regex (e.g., '/pattern/flags').
 * @returns {RegExp} A RegExp object created from the input string.
 */
export const getRegexp = regexPatternValue => {
  let lastSlash = regexPatternValue.lastIndexOf('/');
  return new RegExp(
    regexPatternValue.slice(1, lastSlash),
    regexPatternValue.slice(lastSlash + 1)
  );
};
