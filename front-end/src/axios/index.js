import axios from 'axios';
import { BaseSeverUrl } from '../constant/baseSeverUrl';

const instance = axios.create({
    baseURL: BaseSeverUrl,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});
export default instance;
