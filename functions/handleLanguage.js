import { LocalStorage } from 'node-localstorage';
import responses from '../responses/responses.js';

const localStorage = new LocalStorage('./scratch'); 

export const checkLanguage = (userID) => {
    let response;
    if (localStorage?.getItem(userID)) {
        switch (localStorage.getItem(userID)) {
            case "de":
                response = "Halloo [de]";
                break;
            case "es":
                response = "Haaaa [es]";
                break;
            case "fr":
                response = "Haaaa [fr]";
                break;
            default:
                response = "Heloooo!"
                break;
        }
    } else {
        response = "Heloooo!";
    }
    return responses.languages.sss.nesto;
};

export const changeLanguage = (userID, langCode) => {
    localStorage.setItem(userID, langCode);
    return makeWelcomeResponse(langCode);
};

const makeWelcomeResponse = (langCode) => {
    let response = responses.greetings[langCode][0];
    /*
    switch(langCode) {
        case "de":
            response = "Willkommen";
            break;
        case "es":
            response = "La bienvenida";
            break;
        case "fr":
            response = "Bienvenue";
            break;
        default:
            response = "Welcome";
            break;
    }
    */
    return response;
};

export const clearLanguage = () => {
    localStorage.clear();
};