import moment from 'moment'


// Sign Up validations

export const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
}
export const isValidPass = (pass) => {
    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;
     
    let errorMsg = false;

    if (!uppercaseRegExp.test(pass)) { errorMsg='At least one Uppercase'} ;
    if (!lowercaseRegExp.test(pass)) { errorMsg='At least one Lowercase'} ;
    if (!digitsRegExp.test(pass)) { errorMsg='At least one Number'} ;
    if (!specialCharRegExp.test(pass)) { errorMsg='At least one Special Character'} ;
    if (!minLengthRegExp.test(pass)) { errorMsg='At least 8 characters'} ;

    return errorMsg
}
export const isValidName = (name) => {
    return /^([^0-9]*)$/.test(name)
}


// Card Validations
export const cardNumberValidation = (cardNumber) => {
    const regexPattern ={
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/
    };
    for (const card in regexPattern) {
        if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
            if (cardNumber) {
                return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
                ? ''
                : 'Enter a valid Card';
            }
        }
    }
    return 'Enter a valid Card';
}


export const cardExpireValidation = (value) => {
    if (value) {
        if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
            let today = new Date();
            const date = `${today.getFullYear()}-${today.getMonth() +1}-${new Date(today.getFullYear(),today.getMonth() +1, 0).getDate()}`
            let currentDate = moment(new Date(date));
            let visaValue = value.split('/');
            let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
            return currentDate < moment(visaDate)
                ? ''
                : 'Please enter a valid date';
        } else {
            return 'Invalid Date Format';
        }
    }
}

export const onlyTextValidation = (value) => {
    if (value) {
        if (/^[a-zA-Z ]*$/i.test(value)) {
            return ''
        } else {
            return 'Alphabetical letters only'
        }
    } else {
        return ''
    }
};

export const securityCodeValidation = (min, value) => (value && value.length < min) ? 'Must be 3 characters or more' : '';