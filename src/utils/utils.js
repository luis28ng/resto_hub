const exportedMethods = {

    getUserFullName() {
        if (isUserLoggedIn) {
            return localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')
        };
        return ""
    },
    
    getUserId() {
        if (isUserLoggedIn) {
            return localStorage.getItem('userId')
        }
    },
    
    getUserRole() {
        if (isUserLoggedIn) {
            return localStorage.getItem('roleId')
        }
    },
    
    getAuthToken() {
        if (isUserLoggedIn) {
            return localStorage.getItem('token')
        }
    },

    isUserLoggedIn() {
        return (localStorage 
            && localStorage.getItem('firstName').length !== 0 
            && localStorage.getItem('lastName').length !== 0
            && localStorage.getItem('roleId').length !== 0
            && localStorage.getItem('userId').length !== 0)
    },
    
    redirectToUserDashboard() {
        if (getUserRole() === '2') {
          window.location.href = "/salesrep"
        } else if (getUserRole() === '3') {
          window.location.href = "/opManager"
        } else if (getUserRole() === '6') {
          window.location.href = "/constructionManager"
        } else if (getUserRole() === '7') {
          window.location.href = "/siteSurveyor"
        } else {
          window.location.href = "/"
        }
    }
};

export default exportedMethods;