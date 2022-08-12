import VISA_ICON from './assets/visa.png'
import AMERICAN_EXPRESS_ICON from './assets/amex.png'
import MASTER_CARD_ICON from './assets/masterCard.png'
import DISCOVER_ICON from './assets/discover.png'

// regexp for signifying pattern of card info. first num 1-9. /\d/ is 0-9, all seperated into 4number strings, 16 total
export const OTHERCARDS = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export const AMERICANEXPRESS = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,

];

export const CARD = [
    'VISA',
    "MASTERCARD",
    "AMERICAN_EXPRESS",
    "DISCOVER"
];


// store actual image into a variable, so that it is easy to change for re-branding 
export const CARDICON ={
    VISA: VISA_ICON,
    MASTERCARD: MASTER_CARD_ICON,
    AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
    DISCOVER: DISCOVER_ICON,
}