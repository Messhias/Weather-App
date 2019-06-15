// getting the request object.
import Request from '../../utils/Request';

/**
 * Send the data to api.
 *
 * @param data
 * @return {*}
 */
export default (data = {}) => Request.post(`login`, data);