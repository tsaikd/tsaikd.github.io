app

.run([        "$translate"
	, function($translate) {

	$translate.use("zh_tw");

}])

// ref: https://github.com/NUKnightLab/TimelineJS
.controller("IntroCtrl"
	, [       "$scope"
	, function($scope) {

	createStoryJS({
		type: "timeline",
		height: Math.max(400, $(window).height() - 50),
		source: "https://docs.google.com/spreadsheet/pub?key=0AlJykoFkMOomdFBsblhMbGw1eTZmUGRRVXpCLXVJaFE&output=html",
		embed_id: "timeline",
		start_at_end: true,
		hash_bookmark: true
	});

	$("body").on("click", "a:not([target])", function() {
		$(this).attr("target", "_blank");
	});

}])

;
