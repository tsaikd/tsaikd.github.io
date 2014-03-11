var app = angular.module("app", [
	"LocalStorageModule",
	"pascalprecht.translate"
])

.config([     "$translateProvider"
	, function($translateProvider) {

	$translateProvider
	.translations("zh_tw", {
		"KD's Homepage": "KD首頁",
		"tsaikd's Homepage": "tsaikd個人網頁",
		"KD Calendar": "KD 行事曆"
	});

	var defTrans = {};
	angular.forEach($translateProvider.translations("zh_tw"), function(v, key) {
		if (key.match(/{{.*}}/)) {
			defTrans[key] = key;
		}
	});
	$translateProvider
	.translations("en", defTrans)
	.registerAvailableLanguageKeys(["en", "zh_tw"], {
		"en_us": "en",
		"en_uk": "en",
		"zh_cn": "zh_tw",
		"zh_hk": "zh_tw"
	})
	.useStorage("localStorageService")
	.determinePreferredLanguage();

}])

.run(["$rootScope",
	function($scope) {

		$scope.locales = [
			{
				id: "en",
				name: "English"
			},
			{
				id: "zh_tw",
				name: "正體中文"
			}
		];

		$scope.track = function(evtname) {
			_gaq.push(["_trackEvent", evtname, "clicked"]);
		};

	}
])

;
