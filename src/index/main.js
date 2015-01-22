app

.controller("IndexCtrl", ["$scope",
                  function($scope) {

	$scope.github = !!location.href.match(/github/);

}])

;
