import Request from '../../utils/Request';

/**
 * Processing the information.
 *
 * @param queryObject
 * @return {Promise<AxiosResponse<T>>}
 */
export default (queryObject = []) => {
    return Request.get(`?q=${queryObject.city},${queryObject.country}&appid=${process.env.APP_ID}`);
};