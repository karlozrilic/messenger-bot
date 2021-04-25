import { LocalStorage } from 'node-localstorage';

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
            default:
                response = "Heloooo!"
                break;
        }
    } else {
        response = "Heloooo!";
    }
    return response;
};

export const setLanguage = (userID, langCode) => {
    localStorage.setItem(userID, langCode);
};

export const clearLanguage = () => {
    localStorage.clear();
};