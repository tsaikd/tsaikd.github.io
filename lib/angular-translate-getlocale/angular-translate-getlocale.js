angular.module("pascalprecht.translate")

.provider("$translateGetLocale", function () {

	var getFirstBrowserLanguage = function () {
		var nav = window.navigator,
			browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
			i,
			language;

		// support for HTML 5.1 "navigator.languages"
		if (angular.isArray(nav.languages)) {
			for (i = 0; i < nav.languages.length; i++) {
				language = nav.languages[i];
				if (language && language.length) {
					return language;
				}
			}
		}

		// support for other well known properties in browsers
		for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
			language = nav[browserLanguagePropertyKeys[i]];
			if (language && language.length) {
				return language;
			}
		}

		return null;
	};
	getFirstBrowserLanguage.displayName = 'angular-translate/service: getFirstBrowserLanguage';

	var getLocale = function () {
		return (getFirstBrowserLanguage() || '').split('-').join('_').toLowerCase();
	};
	getLocale.displayName = 'angular-translate/service: getLocale';

	getLocale.$get = {};

	return getLocale;

})

;
