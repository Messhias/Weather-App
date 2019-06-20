import Request from '../../utils/Request';

/**
 * Add new location for the user.
 *
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export default (data = {} ) => Request.post(`location/add`, { data });