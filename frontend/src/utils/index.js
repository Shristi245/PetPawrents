export const getLogInDetailsFromLocalStorage = () => {
    
    const loginDetails = localStorage.getItem("loginDetails");

    if (loginDetails) {
        return JSON.parse(loginDetails);
    }

    return null;

}