import Request from '../../utils/Request';

/**
 * Getting the countries / capitols list.
 * @return {Promise<AxiosResponse<T>>}
 */
export default () => Request.get(`countries`);