
describe('Template', function () {

  var server = require('../server/server')
  var request = require('supertest')(server)
  var assert = require('assert');
  var youtubeTemplate
  var loopback = require('loopback');
  var app = loopback();
  var Template = app.models.Template;

  beforeEach(function () {
    Template.upsert({
      "groups": ["public"],
      "name": "a simple template",
      "itemType": "http://schema.org/VideoObject",
      "urlPattern": "https://www.youtube.com/watch.*",
      "xPathPropertySelectors": {
        "title": "//span[@id=\"eow-title\"]/text()",
        "description": "//p[@id=\"eow-description\"]/text()"
      }
    });
  });

  describe('matches', function () {
    Template.findOne({
      where: { name: 'a simple template' }, function(err, template)
      { assert(youtubeTemplate.matches("https://www.youtube.com/watch?v=ETd8YIxTaog")) }
    });

  });
})