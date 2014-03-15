var app = angular.module("app", [
	"LocalStorageModule",
	"pascalprecht.translate"
])

.run(["$rootScope",
	function($scope) {

		$scope.track = function(evtname) {
			_gaq.push(["_trackEvent", evtname, "clicked"]);
		};

	}
])

;
