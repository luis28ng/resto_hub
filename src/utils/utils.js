/**
 * Checks if the user is logged in by verifying the required user information in the local storage.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
const isUserLoggedIn = () => {
    return (localStorage
        && localStorage.getItem('username')?.length !== 0
        && localStorage.getItem('userRestId')?.length !== 0
        && localStorage.getItem('userRole')?.length !== 0
        && localStorage.getItem('userId')?.length !== 0
        && localStorage.getItem('jwtToken')?.length !== 0)
};

/**
 * Retrieves the username from the local storage if the user is logged in.
 * @returns {string|undefined} The username from the local storage if the user is logged in, otherwise undefined.
 */
const getUsername = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('username')
    }
};

/**
 * Retrieves the user restaurant ID from the local storage if the user is logged in.
 * @returns {string|undefined} The user restaurant ID from the local storage if the user is logged in, otherwise undefined.
 */
const getRestId = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('userRestId')
    }
};

/**
 * Retrieves the user ID from the local storage if the user is logged in.
 * @returns {string|undefined} The user ID from the local storage if the user is logged in, otherwise undefined.
 */
const getUserId = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('userId')
    }
};

/**
 * Retrieves the user role from the local storage if the user is logged in.
 * @returns {string|undefined} The user role from the local storage if the user is logged in, otherwise undefined.
 */
const getUserRole = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('userRole')
    }
};

/**
 * Retrieves the JWT token from the local storage if the user is logged in.
 * @returns {string|undefined} The JWT token from the local storage if the user is logged in, otherwise undefined.
 */
const getAuthToken = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('jwtToken')
    }
};

/**
 * Redirects the user to a specific dashboard based on their role.
 * 
 * @example
 * redirectToUserDashboard();
 * 
 * @returns {void}
 */
const redirectToUserDashboard = () => {
    console.log('Redirecting to the user dashboard...');
    const userRole = getUserRole();
    switch (userRole) {
        case 'RESTAURANT_MANAGER':
            window.location.href = "/managerDashboard";
            break;
        case 'RESTAURANT_STAFF':
        case 'RESTAURANT_WAITER':
            window.location.href = "/staffDashboard";
            break;
        default:
            window.location.href = "/";
            break;
    }
};

/**
     * Formats the given date in the required format: "YYYY-MM-DD 00:00:00".
     * @param {Date} date - The date to be formatted.
     * @returns {string} The formatted date string.
     */
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} 00:00:00`;
};


export { isUserLoggedIn, getUsername, getUserRole, getUserId, redirectToUserDashboard, getAuthToken, getRestId, formatDate };
