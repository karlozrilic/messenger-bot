import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./scratch'); 

export const checkLanguage = (userId) => {
    let response;
    if (localStorage?.getItem(userId)) {
        switch (localStorage.getItem(userId)) {
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

export const setLanguage = (userId, langCode) => {
    localStorage.setItem(userId, langCode);
};

export const clearLanguage = () => {
    localStorage.clear();
};