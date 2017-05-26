'use strict';

module.exports = function (app) {
  app.dataSources.db.automigrate('template', function (err) {
    if (err) throw err;
    app.models.Template.create([
      {
        "groups": ["public"],
        "name": "a simple template",
        "itemType": "http://schema.org/VideoObject",
        "urlPattern": "https://www.youtube.com/watch.*",
        "xPathPropertySelectors": {
          "title": "//span[@id=\"eow-title\"]/text()",
          "description": "//p[@id=\"eow-description\"]/text()"
        }
      }
    ], function (err, templates) {
      if (err) throw err;
      console.log('Models created: \n', templates);
    });
  });
};