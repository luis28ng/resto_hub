const isUserLoggedIn = () => {
    return (localStorage 
        && localStorage.getItem('username').length !== 0
        && localStorage.getItem('userRestId').length !== 0
        && localStorage.getItem('userRole').length !== 0
        && localStorage.getItem('userId').length !== 0
        && localStorage.getItem('jwtToken').length !== 0)
    };

const getUsername = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('username')
    }
};

const getRestId = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('userRestId')
    }
};

const getUserId = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('userId')
    }
};
    
const getUserRole = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('userRole')
    }
};
    
const getAuthToken = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('jwtToken')
    }
};
    
const redirectToUserDashboard = () => {
    if (getUserRole() === 'RESTAURANT_MANAGER') {
        window.location.href = "/managerDashboard"
    } else if (getUserRole() === 'RESTAURANT_STAFF') {
        window.location.href = "/staffDashboard"
    } else if (getUserRole() === 'RESTAURANT_WAITER') {
        window.location.href = "/staffDashboard"
    } else {
        window.location.href = "/"
    }
};

export { isUserLoggedIn, getUsername, getUserRole, getUserId, redirectToUserDashboard, getAuthToken, getRestId};
