app.run(['$templateCache', function($templateCache) {  'use strict';

  $templateCache.put('./kdintrotimeline/itemSpec.html',
    "<item>\n" +
    "\t<headline>html</headline>\n" +
    "\t<startDate>yyyy-mm-dd</startDate>\n" +
    "\t<endDate>yyyy-mm-dd</endDate>\n" +
    "\t<repository>url</repository>\n" +
    "\t<tags>\n" +
    "\t\t<tag>string</tag>\n" +
    "\t</tags>\n" +
    "\t<text>html</text>\n" +
    "\t<thumbnail>url</thumbnail>\n" +
    "\t<assetimages>\n" +
    "\t\t<assetimage>url</assetimage>\n" +
    "\t</assetimages>\n" +
    "</item>\n"
  );
}]);