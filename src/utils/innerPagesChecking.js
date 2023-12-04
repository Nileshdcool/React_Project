import { MAIN_PAGES } from '../constants/index';

export const checkIsInnerPage = (url) => !MAIN_PAGES.some(data => url.includes(data) || url === '/');
