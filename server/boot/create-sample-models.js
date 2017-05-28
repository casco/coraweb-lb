'use strict';

module.exports = function (app) {
  app.dataSources.db.automigrate('Template', function (err) {
    if (err) throw err;
    app.models.Template.create([
      {
        "groups": ["public"],
        "name": "Youtube videos",
        "itemType": "http://schema.org/VideoObject",
        "urlPattern": "https://www.youtube.com/watch.*",
        "xPathPropertySelectors": {
          "title": "[id=eow-title]",
          "description": "[id=eow-description]"
        }
      },
      {
        "groups": ["public"],
        "name": "Slideshare presentation",
        "itemType": "http://schema.org/PresentationDigitalDocument",
        "urlPattern": "https://www.slideshare.net/.*",
        "xPathPropertySelectors": {
          "title": "[class=j-title-breadcrumb]",
          "description": "[id=slideshow-description-paragraph]"
        }
      },
      {
        "groups": ["public"],
        "name": "Mendeley article presentation",
        "itemType": "http://schema.org/Article",
        "urlPattern": "https://www.mendeley.com/research-papers/.*",
        "xPathPropertySelectors": {
          "title": "[data-name=title]",
          "authors": "[class=authors]",
          "description": "[data-name=content]"
        }
      }
    ], function (err, templates) {
      if (err) throw err;
      console.log('Models created: \n', templates);
    });
  });
};