/**
* Determines if localhost is the hostname.
*
* @param {string} hostname - The hostname.
* @returns {boolean} Whether or not localhost is the hostname.
*/
export const isLocalhost = (hostname) => {
    return hostname === 'localhost';
};

/**
* Parses a URL query string into an array of key/value pairs.
*
* @param {string} queryString - The query string.
* @returns {Array} An array of key/value pairs.
*/
export const parseURLQueryString = (queryString) => {
    const pairs = queryString.split('&');
    let parsed = [];

    if (queryString.length > 0) {
        pairs[0] = pairs[0].replace('?', '');
        parsed = pairs.map((item) => {
            let values = item.split('=');
            return {
                key: values[0],
                value: values[1]
            };
        });
    }

    return parsed;
};

/**
* A collection of location utilities.
* 
*/
export const Location = {
    isLocalhost: isLocalhost,
    parseURLQueryString: parseURLQueryString
};

/**
* A collection of utilities.
* 
* @namespace Utils
*/
export const Utils = {
    Location: Location
};