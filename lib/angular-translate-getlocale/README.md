# angular-translate-getlocale
angular-translate plugin, get browser locale and lowercase

## Usage

* bower install

```
bower install tsaikd/angular-translate-getlocale#master
```

* include javascript in html

```
<script src="bower_component/angular-translate-getlocale/angular-translate-getlocale.js"></script>
```

* modify your angularjs config

```
angular.module("myApp")

.config([     "$translateProvider", "$translateGetLocaleProvider"
	, function($translateProvider,   $translateGetLocaleProvider) {

	$translateProvider.determinePreferredLanguage($translateGetLocaleProvider);

}])

;
```
