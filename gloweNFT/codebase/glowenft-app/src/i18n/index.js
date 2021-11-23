// @flow

import _ from 'lodash'
import * as RNLocalize from 'react-native-localize'
import moment from 'moment'
import it from './it.json'
import en from './en.json'

const translations = {
  // it,
  en
};

const fallback = 'en';

const bestLanguage = RNLocalize.findBestAvailableLanguage(_.keys(translations)) || { languageTag: 'en', isRTL: false };
// console.log({bestLanguage})
export const language = _.get(bestLanguage, 'languageTag', fallback);
// export const language =
//   bestLanguage && bestLanguage.languageTag
//     ? bestLanguage.languageTag
//     : fallback;

export function translate(name, params) {
  const translation = _.get(
    translations,
    [language, name],
    _.get(translations, [fallback, name], name)
  );

  return _.template(translation)(params)
}

export default translate

export const LOCALE_LANGUAGE_STRING = bestLanguage.languageTag
