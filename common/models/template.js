'use strict';

var Regex=require("regex");

module.exports = function(Template) {

/**
 * Returns true if the receiver matchers the url passed as an argument
 * @param {string} url A URL
 */
Template.prototype.matches = function(url) {
    var regex = new Regex(this.urlPattern);
    return regex.test(url)
}

 /**
 * Returns all templates that match the url passed as an argument
 * @param {string} url A URL
 * @param {Function(Error)} callback
 */
Template.findAllMatching = function(url, callback) {
  Template.find(function(err, returned_instances) {
    var filtered = returned_instances
     //filtered = returned_instances.filter(function(x) {return x.matches(url)});
    var response = "number of instances " + filtered.length;
    console.log(filtered);
    callback(null, response);
  });
};

};
