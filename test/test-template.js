
describe('Template tests', function () {

  var app = require('../server/server');
  var assert = require('assert');
  var Template;
  var youtubeTemplate;
  var server;

  before(function (done) {
    server = app.listen(done);
    Template = app.models.Template;
  });

  after(function (done) {
    server.close(done);
  });

  beforeEach(function (done) {
    Template.upsert({
      "groups": ["public"],
      "name": "a simple template",
      "itemType": "http://schema.org/VideoObject",
      "urlPattern": "https://www.youtube.com/watch.*",
      "propertySelectors": {
        "title": "//span[@id=\"eow-title\"]/text()",
        "description": "//p[@id=\"eow-description\"]/text()"
      }
    }, function callback(err, object) {
      youtubeTemplate = object;
      console.log("end-before-each");
      done();
    });
  });

  describe('matches', function () {
    it("Should match for a matching URL, but not for others", function () {
      assert(youtubeTemplate.matches("https://www.youtube.com/watch/JHGASFR"));
      assert(!youtubeTemplate.matches("https://www.youtube.com/"));
    });
  });

})