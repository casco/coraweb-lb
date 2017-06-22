'use strict';

var samplePeople = [
  {
    "fullName": "Anonymous",
    "email": "no_reply@lifia.info.unlp.edu.ar",
    "groups": ["lifia", "public"]
  }
]

var sampleTemplates = [
  {
    "groups": ["public"],
    "name": "Youtube videos",
    "itemType": "http://schema.org/VideoObject",
    "urlPattern": "https://www.youtube.com/watch.*",
    "owner": "no_reply@lifia.info.unlp.edu.ar",
    "propertySelectors": {
      "title": "[id=eow-title]",
      "description": "[id=eow-description]"
    }
  },
  {
    "groups": ["public"],
    "name": "Slideshare presentation",
    "itemType": "http://schema.org/PresentationDigitalDocument",
    "urlPattern": "https://www.slideshare.net/.*",
    "owner": "no_reply@lifia.info.unlp.edu.ar",
    "propertySelectors": {
      "title": "[class=j-title-breadcrumb]",
      "description": "[id=slideshow-description-paragraph]"
    }
  },
  {
    "groups": ["public"],
    "name": "Mendeley article presentation",
    "itemType": "http://schema.org/Article",
    "urlPattern": "https://www.mendeley.com/research-papers/.*",
    "owner": "no_reply@lifia.info.unlp.edu.ar",
    "propertySelectors": {
      "title": "[data-name=title]",
      "authors": "[class=authors]",
      "description": "[data-name=content]"
    }
  }
];

module.exports = function (app) {
  var ds = app.dataSources.db;
  ds.automigrate(function (err) {
    if (err) throw err;
    app.models.Person.create(samplePeople, function (err, people) {
      if (err) throw err;
      console.log('People created: \n', people);
    });
    app.models.Template.create(sampleTemplates, function (err, templates) {
      if (err) throw err;
      console.log('Templates created: \n', templates);
    });
  });
};