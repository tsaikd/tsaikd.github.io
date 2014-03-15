app.run(['$templateCache', function($templateCache) {  'use strict';

  $templateCache.put('./kdintrotimeline/itemSpec.html',
    "<item>\r" +
    "\n" +
    "\t<headline>html</headline>\r" +
    "\n" +
    "\t<startDate>yyyy-mm-dd</startDate>\r" +
    "\n" +
    "\t<endDate>yyyy-mm-dd</endDate>\r" +
    "\n" +
    "\t<repository>url</repository>\r" +
    "\n" +
    "\t<tags>\r" +
    "\n" +
    "\t\t<tag>string</tag>\r" +
    "\n" +
    "\t</tags>\r" +
    "\n" +
    "\t<text>html</text>\r" +
    "\n" +
    "\t<thumbnail>url</thumbnail>\r" +
    "\n" +
    "\t<assetimages>\r" +
    "\n" +
    "\t\t<assetimage>url</assetimage>\r" +
    "\n" +
    "\t</assetimages>\r" +
    "\n" +
    "</item>\r" +
    "\n"
  );
}]);