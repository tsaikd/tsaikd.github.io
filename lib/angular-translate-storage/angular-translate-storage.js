/* angular-translate-storage v0.0.3 2015-05-22
 * https://github.com/tsaikd/angular-translate-storage
 * License: MIT
 */

angular

.module("angular-translate-storage", [
	"LocalStorageModule",
	"pascalprecht.translate"
])

.factory("translateStorage"
	, [       "localStorageService"
	, function(localStorageService) {

	function TranslateStorage() {}

	TranslateStorage.prototype.get = function() {
		return localStorageService.get.apply(this, arguments);
	};

	TranslateStorage.prototype.put = function() {
		return localStorageService.set.apply(this, arguments);
	};

	return new TranslateStorage();
}])

;
