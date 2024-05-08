/* eslint-disable no-console, no-undef */
export function warn(...args) {
  if (console && console.warn) {
    if (typeof args[0] === 'string') args[0] = `fq-intl-react:: ${args[0]}`;
    console.warn(...args);
  }
}

const alreadyWarned = {};
export function warnOnce(...args) {
  if (typeof args[0] === 'string' && alreadyWarned[args[0]]) return;
  if (typeof args[0] === 'string') alreadyWarned[args[0]] = new Date();
  warn(...args);
}

export function getDisplayName(Component) {
  return (
    Component.displayName ||
    Component.name ||
    (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown')
  );
}

export function hasLoadedNamespace(ns, i18n, options = {}) {
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce('i18n.languages were undefined or empty', i18n.languages);
    return true;
  }

  // ignoreJSONStructure was introduced in v20.0.0 (MARCH 2021)
  const isNewerI18next = i18n.options.ignoreJSONStructure !== undefined;
  if (!isNewerI18next) {
    // WAIT A LITTLE FOR I18NEXT BEING UPDATED IN THE WILD, before removing this old i18next version support
    return oldI18nextHasLoadedNamespace(ns, i18n, options);
  }

  // IN I18NEXT > v19.4.5 WE CAN (INTRODUCED JUNE 2020)
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance, loadNotPending) => {
      if (
        options.bindI18n &&
        options.bindI18n.indexOf('languageChanging') > -1 &&
        i18nInstance.services.backendConnector.backend &&
        i18nInstance.isLanguageChangingTo &&
        !loadNotPending(i18nInstance.isLanguageChangingTo, ns)
      )
        return false;
    },
  });
}
