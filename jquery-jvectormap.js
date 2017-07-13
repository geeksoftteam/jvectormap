/**
 * jVectorMap version 3.0
 *
 * Copyright 2011-2014, Kirill Lebedev
 *
 */

(function (factory) {
  if(typeof define === "function" && define.amd) {
    define(["jquery", "jquery-mousewheel"], factory);
  } else if(typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"), require("jquery-mousewheel"));
  } else {
    factory(jQuery);
  }
} (function( $, mousewheel ){
  var apiParams = {
        set: {
          colors: 1,
          values: 1,
          backgroundColor: 1,
          scaleColors: 1,
          normalizeFunction: 1,
          focus: 1
        },
        get: {
          selectedRegions: 1,
          selectedMarkers: 1,
          mapObject: 1,
          regionName: 1
        }
      };

  $.fn.vectorMap = function(options) {
    var map,
        methodName,
        map = this.children('.jvectormap-container').data('mapObject');

    if (options === 'addMap') {
      jvm.Map.maps[arguments[1]] = arguments[2];
    } else if ((options === 'set' || options === 'get') && apiParams[options][arguments[1]]) {
      methodName = arguments[1].charAt(0).toUpperCase()+arguments[1].substr(1);
      return map[options+methodName].apply(map, Array.prototype.slice.call(arguments, 2));
    } else {
      options = options || {};
      options.container = this;
      map = new jvm.Map(options);
    }

    return this;
  };
}));
