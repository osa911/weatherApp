import * as types from './constants';

/**
 * [setLang on weather req]
 * @param {string} lang
 */
export const setLang = lang => ({
  type: types.SET_LANG,
  lang,
})
