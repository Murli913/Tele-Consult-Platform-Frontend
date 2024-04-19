export const checkValidData = (email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);


    if(!isEmailValid) {
        return "Email ID is not valid!!";
    }

    if(password.length === 0) {
        return "Password cannot be empty!!";
    }

    return null;
}