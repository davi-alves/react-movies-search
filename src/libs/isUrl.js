export const URL_REGEX = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;

/**
 * Checks if given url is valid
 *
 * @param {String} url
 * @returns {Boolean}
 */
export default url => URL_REGEX.test(url);
