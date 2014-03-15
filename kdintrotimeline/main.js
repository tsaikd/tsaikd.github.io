app

.run([        "$translate"
	, function($translate) {

	$translate.use("zh_tw");

}])

// ref: https://github.com/NUKnightLab/TimelineJS
.controller("IntroCtrl"
	, [     "$scope",
	function($scope) {

	var timelineData = {
		"timeline": {
			"headline": "KD 學經歷及作品",
			"type": "default",
			"text": "整理之後才知道原來我搗鼓過這麼多鬼東西...",
			"asset": {
				"media": "kdintro/pic.jpg"
			},
			"date": []
		}
	};
	$("#data > item").each(function() {
		var tldata = {
			asset: {}
		};
		var $item = $(this);

		$.each(["headline", "text"], function(k, field) {
			$item.find(">" + field).each(function() {
				tldata[field] = $(this).html().trim();
			});
		});

		$.each(["startDate", "endDate"], function(k, field) {
			$item.find(">" + field).each(function() {
				tldata[field] = $(this).html().trim().replace(/-/g, ",");
			});
		});

		var repository = $item.find("> repository").text().trim();
		if (repository) {
			tldata["headline"] = "<a href='" + repository + "'>" + tldata["headline"] + "</a>";
		}

		var $tags = $item.find("> tags > tag");
		if ($tags.length) {
			var tagshtml = "<div class='tagsbar'>";
			$tags.each(function() {
				tagshtml += "<span class='tag'>" + $(this).text() + "</span>";
			});
			tagshtml += "</div>";
			tldata["text"] = tagshtml + tldata["text"];
		}

		$.each(["thumbnail"], function(k, field) {
			$item.find(">" + field).each(function() {
				tldata.asset[field] = $(this).text().trim();
			});
		});

		$item.find("> assetimages > assetimage").each(function() {
			tldata.asset.media = $(this).text().trim();
		});

		timelineData.timeline.date.push(tldata);
	});

	createStoryJS({
		type: "timeline",
		height: Math.max(400, $(window).height() - 50),
		source: timelineData,
		embed_id: "timeline",
		start_at_end: true,
		hash_bookmark: true
	});

	$("body").on("click", "a:not([target])", function() {
		$(this).attr("target", "_blank");
	});

}])

;
