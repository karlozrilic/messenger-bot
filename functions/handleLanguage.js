import { LocalStorage } from 'node-localstorage';
import responses from '../responses/responses.js';

const localStorage = new LocalStorage('./scratch'); 

export const checkLanguage = (userID) => {
    let response;
    if (localStorage?.getItem(userID)) {
        response = responses.languages[localStorage.getItem(userID)].languageCheck + responses.languages[localStorage.getItem(userID)].languageName;
    } else {
        response = responses.languages.en.languageName;
    }
    return response;
};

export const checkLanguageCode = (userID) => {
    let langCode;
    if (localStorage?.getItem(userID)) {
        langCode = localStorage.getItem(userID);
    } else {
        langCode = "en";
    }
    return langCode;
};

export const changeLanguage = (userID, langCode) => {
    localStorage.setItem(userID, langCode);
    return makeWelcomeResponse(langCode);
};

const makeWelcomeResponse = (langCode) => {
    let response = responses.greetings[langCode][0];
    return response;
};

export const clearLanguage = () => {
    localStorage.clear();
};