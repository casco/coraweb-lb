var assert = require('assert');
var Template = require('../common/models/template');

var youtubeTemplate = Object.create(Template,
  {
    "groups": {value: ["public"]},
    "name": {value: "a simple template"},
    "itemType": {value: "http://schema.org/VideoObject"},
    "urlPattern": {value: "https://www.youtube.com/watch.*"}
  })
  ;

before(function () {


})

describe('Template', function () {
  describe('prototype', function () {
    describe('matches', function () {
      assert(youtubeTemplate.matches("https://www.youtube.com/watch?v=ETd8YIxTaog"))
    })

  });
});