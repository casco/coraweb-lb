'use strict';

module.exports = function(Template) {

  /**
   * Returns true if the receiver matchers the url passed as an argument
   * @param {string} url A URL
   */
  Template.prototype.matches = function(url) {
      var regex = new RegExp(this.urlPattern);
      return regex.test(url)
  }

  /**
   * Retrieves the url and creates/updates an Item from it
   * @param {string} url A URL
   */
  Template.prototype.harvest = function(url) {
      console.log("harvesting " + url);
      
      // Hacer in retrieve de la url
      // Obtener propiedades utilizando los xpaths de este template
      // Crear un item con esas propiedades
      // Devolver el item creado asi se puede devolver en la repsuesta
      return {}
  }

  /**             REMOTE METHODS          **/

  /**
   * Returns all templates that match the url passed as an argument
   * @param {string} url A URL
   * @param {Function(Error)} callback
   */
  Template.findAllMatching = function(url, callback) {
    Template.find(function(err, returned_instances) {
      var filtered = returned_instances.filter(function(x) {return x.matches(url)});
       callback(null, filtered);
    });
  };

  Template.remoteMethod ('findAllMatching', {
            http: {path: '/matching', verb: 'get'},
            accepts: {arg: 'url', type: 'string'},
            returns: {arg: 'response', type: 'array'}
  });


  /**
   * Retrieves the url given as an argument, finds all matching Templates, 
   * and creates items accordingly
   * @param {string} url A URL
   * @param {Function(Error)} callback
   */
  Template.harvest = function(url, callback) {
    Template.find(function(err, returned_instances) {
      var filtered = returned_instances.filter(function(x) {return x.matches(url)});
      var response = "Created/updated items with " + filtered.length + " matching templates";
      filtered.forEach(function(element) {
        element.harvest(url);
      }, this);
      callback(null, response);
    });
  };

  Template.remoteMethod ('harvest', {
            http: {path: '/harvest', verb: 'get'},
            accepts: {arg: 'url', type: 'string'},
            returns: {arg: 'response', type: 'string'}
  });


};
