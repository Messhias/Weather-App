import Request from '../../utils/Request';

/**
 * Processing the information.
 *
 * @param queryObject
 * @return {Promise<AxiosResponse<T>>}
 */
export default (queryObject = []) => {
    queryObject = Request.parseParams(queryObject);
    return Request.get(`${queryObject}`);
};