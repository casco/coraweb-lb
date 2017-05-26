'use strict';

module.exports = function (Template) {

  /**
   * Returns true if the receiver matchers the url passed as an argument
   * @param {string} url A URL
   */
  Template.prototype.matches = function (url) {
    var regex = new RegExp(this.urlPattern);
    return regex.test(url)
  }

  /**
   * Retrieves the url and creates/updates an Item from it
   * @param {string} url A URL
   */
  Template.prototype.harvest = function (url, callback) {
    var request = require("request");
    var self = this;
    request(url, function (error, response, body) {
      var properties = self.harvestProperties(body);
      Template.app.models.Item.upsert({
        "type": self.itemType,
        "url": url,
        "properties": properties,
        "groups": ["public"]
      }, function (err, object) {
        callback(null, object);
      })
    });
  }

  Template.prototype.harvestProperties = function (body) {
    var cheerio = require("cheerio");
    var $ = cheerio.load(body);
    var properties = {};
    for (var prop in this.xPathPropertySelectors) {
      if (this.xPathPropertySelectors.hasOwnProperty(prop)) {
        properties[prop] = $(this.xPathPropertySelectors[prop]).text();
      }
    }
    return properties

  }

  /**             REMOTE METHODS          **/

  /**
   * Returns all templates that match the url passed as an argument
   * @param {string} url A URL
   * @param {Function(Error)} callback
   */
  Template.findAllMatching = function (url, callback) {
    Template.find(function (err, returned_instances) {
      var filtered = returned_instances.filter(function (x) { return x.matches(url) });
      callback(null, filtered);
    });
  };

  Template.remoteMethod('findAllMatching', {
    http: { path: '/matching', verb: 'get' },
    accepts: { arg: 'url', type: 'string' },
    returns: { arg: 'response', type: 'array' }
  });


  /**
   * Retrieves the url given as an argument, finds the first matching Template, 
   * and creates items accordingly
   * @param {string} url A URL
   * @param {Function(Error)} callback
   */
  Template.harvest = function (url, callback) {
    Template.find(function (err, returned_instances) {
      var filtered = returned_instances.filter(function (x) { return x.matches(url) });
      if (filtered.length > 0) {
        filtered[0].harvest(url, callback);
      } else {
        callback(null, "no template matches " + url);
      }

    });
  };

  Template.remoteMethod('harvest', {
    http: { path: '/harvest', verb: 'get' },
    accepts: { arg: 'url', type: 'string' },
    returns: { arg: 'response', type: 'string' }
  });


};
