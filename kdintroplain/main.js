app

.config([     "$translateProvider"
	, function($translateProvider) {

	$translateProvider
	.translations("zh_tw", {
		"Name": "姓名",
		"Education": "學歷",
		"today": "至今",
		"Native": "母語",
		"Taiwanese": "台語"
	});

}])

.controller("IntroPlainCtrl"
	, [       "$scope"
	, function($scope) {

}])

;
