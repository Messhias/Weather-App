import Request from '../../utils/Request';

/**
 * Send a request to logout endpoint.
 *
 * @return {Promise<AxiosResponse<T>>}
 */
export default () => Request.get(`logout`);