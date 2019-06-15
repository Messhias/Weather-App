import AppStore from '../store/AppStore';

/**
 * @return {*}
 */
export function getCountriesList() {
    return {
        countriesList: AppStore.getCountriesList(),
        myLocations: AppStore.getMyLocations(),
    };
}