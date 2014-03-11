app

.controller("LocaleCtrl", ["$scope", "$translate",
                  function($scope,   $translate) {

	$scope.locale = $translate.use();
	$scope.updateLocale = function() {
		$translate.use($scope.locale);
	};

}])

;
