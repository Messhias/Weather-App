import AppStore from "../stores/AppStore";

/**
 * Store the user in local storage browser data.
 *
 * @param data
 */
export function storageUser(data = []) {
    localStorage.setItem("logged", JSON.stringify(data));
}

/**
 * Function to return the stored user in local storage.
 *
 * @returns {any | Array}
 */
export function getStoredUser() {
    return JSON.parse(localStorage.getItem("logged")) || false;
}

/**
 * Returns true if the user exists in the local storage.
 *
 * @returns {boolean}
 */
export function userExistsInStorage() {
    return JSON.parse(localStorage.getItem("logged")) != null ? JSON.parse(localStorage.getItem("logged")).token !== "" : false;
}

/**
 * Remove the logged user from storage.
 */
export function eraseStorageUser() {
    localStorage.removeItem("logged");
}

/**
 * Clearing the storage.
 */
export function clearStorage() {
    localStorage.clear();
}

/**
 * @returns {token}
 */
export function getToken() {
    return AppStore.getUser() ? AppStore.getUser().token : getStoredUser().token;
}