app

.config([     "$translateProvider", "$translateGetLocaleProvider"
	, function($translateProvider,   $translateGetLocaleProvider) {

	$translateProvider
	.translations("zh_tw", {
		"KD's Homepage": "KD首頁",
		"tsaikd's Homepage": "tsaikd個人網頁",
		"KD Introduction": "KD 簡介",
		"KD Calendar": "KD 行事曆",
		"Original Site": "主站台",
		"Cheng-Feng Tsai": "蔡程豐",
		"Cheng-Feng Tsai (TsaiKD)": "蔡程豐 (TsaiKD)",
		"Old Version": "舊版",
		"Base Information": "基本資料",
		"Nickname": "暱稱",
		"Gender": "性別",
		"Date of Birth": "生日",
		"Nationality": "國籍",
		"Male": "男",
		"Taiwan": "台灣",
		"National Cheng Kung University": "成功大學",
		"Computer Science and Information Engineering": "資訊工程學系",
		"Bachelor of Engineering": "學士",
		"Work Experience": "工作經驗",
		"Foxconn": "鴻海",
		"Want-Want-China-Times-Group": "旺旺中時媒體集團",
		"Scienbizip": "賽恩倍吉",
		"Skill and Ability": "專業技能",
		"Language ability": "語言能力",
		"English": "英文",
		"Speak": "說",
		"Read": "讀",
		"Write": "寫",
		"Chinese": "中文",
		"Computer Theory": "計算機理論",
		"Network": "網路",
		"Data Structure": "資料結構",
		"Cryptography": "密碼學",
		"Using Operating System": "使用作業系統",
		"Virtual Machine": "虛擬機",
		"Programming Language": "程式語言",
		"Framework and Library": "框架與函式庫",
		"Development tools": "開發工具",
		"Database and Index": "資料庫與索引",
		"System Architecture": "系統架構",
		"Recent developments": "最近關注項目",
		"Docker and related tools": "Docker 及其相關工具",
		"Projects": "專案",
		"Detail": "細節",
		"Reference": "參考"
	});

	var defTrans = {};
	$translateProvider
		.translations("en", defTrans)
		.registerAvailableLanguageKeys(["en", "zh_tw"], {
			"en_us": "en",
			"en_uk": "en",
			"zh_cn": "zh_tw",
			"zh_hk": "zh_tw"
		})
		.useSanitizeValueStrategy(null)
		.useStorage("translateStorage")
		.useMissingTranslationHandlerLog()
		.determinePreferredLanguage($translateGetLocaleProvider);

}])

.run([        "$rootScope", "$translate"
	, function($rootScope,   $translate) {

	$rootScope.locales = [
		{
			id: "en",
			name: "English"
		},
		{
			id: "zh_tw",
			name: "正體中文"
		}
	];
	$rootScope.locale = $translate.use();

}])

.controller("LocaleCtrl"
	, [       "$scope", "$translate", "$rootScope"
	, function($scope,   $translate,   $rootScope) {

	$scope.updateLocale = function() {
		$translate.use($scope.locale);
		$rootScope.locale = $scope.locale;
	};

}])

;
