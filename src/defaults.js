import { unescape } from './unescape.js';

const defaultOptions = {
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: '',
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  unescape,
};

export function getDefaults() {
  return defaultOptions;
}
