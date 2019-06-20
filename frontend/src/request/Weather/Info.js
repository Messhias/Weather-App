import Request from '../../utils/Request';

/**
 * Send the request to the backend.
 *
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export default (data = {}) => {
    return Request.post(`weather/`, data);
}