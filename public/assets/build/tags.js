(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tags"],{

/***/ "./assets/js/tags.js":
/*!***************************!*\
  !*** ./assets/js/tags.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);






(function () {
  'use strict';

  var tagsForm = jquery__WEBPACK_IMPORTED_MODULE_4__("#js-tags-form");
  var tagsCreateApiUrl = tagsForm.data("tags-api-url");
  var tagsCreateButton = jquery__WEBPACK_IMPORTED_MODULE_4__("#js-form-tags-create-button");
  var tableBody = jquery__WEBPACK_IMPORTED_MODULE_4__('#js-tags-table-body');
  var tagsFindAllUrl = tableBody.data("tags-api-url");

  window.deleteTag = function (name) {
    if (confirm('Do you really want to delete tag?')) {
      var request = jquery__WEBPACK_IMPORTED_MODULE_4__["ajax"]({
        method: 'DELETE',
        url: tagsCreateApiUrl + '/' + name,
        headers: {
          "Accept": "application/json"
        }
      });
      request.done(function (response) {
        if (response.success === true) {
          alert('Tag has been deleted successfully');
          window.location.reload();
        }
      });
      request.fail(function (response) {
        var resp = JSON.parse(response.responseText);
        alert(resp.error);
      });
    }
  };

  jquery__WEBPACK_IMPORTED_MODULE_4__(document).ready(function () {
    getTags();

    function getTags() {
      //TODO in future we need to add JWT :)
      var request = jquery__WEBPACK_IMPORTED_MODULE_4__["ajax"]({
        method: "GET",
        url: tagsFindAllUrl,
        headers: {
          "Accept": "application/json"
        }
      });
      request.done(function (response) {
        response.data.forEach(function (element) {
          return render(element);
        });
      });
      request.fail(function (response) {
        alert('Something went wrong:' + response.responseText + ' try again');
      });

      function render(tag) {
        var name = '\'' + tag.name + '\'';
        var deleteButton = '<button onclick="deleteTag(' + name + ')" class="btn btn-danger">Delete</button>';
        tableBody.append('<tr>' + '<td>' + tag.name + '</td>' + '<td> Update </td>' + '<td>' + deleteButton + '</td>' + '</tr>');
      }
    }

    tagsForm.on('submit', function () {
      return false;
    });
    tagsCreateButton.click(function (e) {
      e.preventDefault();
      var tagName = tagsForm.find("[name=tagName]").val();

      if ("" === tagName) {
        alert('Fill the name of the tag first!');
        return false;
      }

      var copyOfText = tagsCreateButton.html();
      var request = jquery__WEBPACK_IMPORTED_MODULE_4__["ajax"]({
        method: "POST",
        url: tagsCreateApiUrl,
        data: JSON.stringify({
          name: tagName
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function beforeSend() {
          tagsCreateButton.html('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
        }
      });
      request.done(function (response) {
        tagsForm.trigger('reset');
        location.reload();
      });
      request.fail(function (response) {
        tagsCreateButton.html(copyOfText);
        alert('Something went wrong:' + response.responseText + ' try again');
      });
      return false;
    });
  });
})();

/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-uses-to-length.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-uses-to-length.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.find.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.find.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $find = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").find;
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.for-each.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.for-each.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.function.name.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.function.name.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ })

},[["./assets/js/tags.js","runtime","vendors~app~categories~post_update~posts~tags","vendors~app~categories~tags"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGFncy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmZ1bmN0aW9uLm5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoLmpzIl0sIm5hbWVzIjpbInRhZ3NGb3JtIiwiJCIsInRhZ3NDcmVhdGVBcGlVcmwiLCJkYXRhIiwidGFnc0NyZWF0ZUJ1dHRvbiIsInRhYmxlQm9keSIsInRhZ3NGaW5kQWxsVXJsIiwid2luZG93IiwiZGVsZXRlVGFnIiwibmFtZSIsImNvbmZpcm0iLCJyZXF1ZXN0IiwibWV0aG9kIiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJhbGVydCIsImxvY2F0aW9uIiwicmVsb2FkIiwiZmFpbCIsInJlc3AiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJlcnJvciIsImRvY3VtZW50IiwicmVhZHkiLCJnZXRUYWdzIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJyZW5kZXIiLCJ0YWciLCJkZWxldGVCdXR0b24iLCJhcHBlbmQiLCJvbiIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGFnTmFtZSIsImZpbmQiLCJ2YWwiLCJjb3B5T2ZUZXh0IiwiaHRtbCIsInN0cmluZ2lmeSIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJiZWZvcmVTZW5kIiwidHJpZ2dlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBLENBQUMsWUFBVTtBQUNSOztBQUVDLE1BQU1BLFFBQVEsR0FBR0MsbUNBQUMsQ0FBQyxlQUFELENBQWxCO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdGLFFBQVEsQ0FBQ0csSUFBVCxDQUFjLGNBQWQsQ0FBekI7QUFDQSxNQUFNQyxnQkFBZ0IsR0FBR0gsbUNBQUMsQ0FBQyw2QkFBRCxDQUExQjtBQUNBLE1BQU1JLFNBQVMsR0FBR0osbUNBQUMsQ0FBQyxxQkFBRCxDQUFuQjtBQUNBLE1BQU1LLGNBQWMsR0FBR0QsU0FBUyxDQUFDRixJQUFWLENBQWUsY0FBZixDQUF2Qjs7QUFFQUksUUFBTSxDQUFDQyxTQUFQLEdBQW1CLFVBQVNDLElBQVQsRUFBZTtBQUM5QixRQUFJQyxPQUFPLENBQUMsbUNBQUQsQ0FBWCxFQUFrRDtBQUM5QyxVQUFNQyxPQUFPLEdBQUdWLDJDQUFBLENBQU87QUFDbkJXLGNBQU0sRUFBRSxRQURXO0FBRW5CQyxXQUFHLEVBQUVYLGdCQUFnQixHQUFHLEdBQW5CLEdBQXlCTyxJQUZYO0FBR25CSyxlQUFPLEVBQUU7QUFDTCxvQkFBVztBQUROO0FBSFUsT0FBUCxDQUFoQjtBQVFBSCxhQUFPLENBQUNJLElBQVIsQ0FBYSxVQUFVQyxRQUFWLEVBQW9CO0FBQzdCLFlBQUlBLFFBQVEsQ0FBQ0MsT0FBVCxLQUFxQixJQUF6QixFQUErQjtBQUMzQkMsZUFBSyxDQUFDLG1DQUFELENBQUw7QUFDQVgsZ0JBQU0sQ0FBQ1ksUUFBUCxDQUFnQkMsTUFBaEI7QUFDSDtBQUNKLE9BTEQ7QUFPQVQsYUFBTyxDQUFDVSxJQUFSLENBQWEsVUFBVUwsUUFBVixFQUFv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QUNqRTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ1JELGtCQUFrQixtQkFBTyxDQUFDLGlGQUEwQjtBQUNwRCxxQkFBcUIsbUJBQU8sQ0FBQyx1R0FBcUM7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7QUNyQkEsYUFBYSxtQkFBTyxDQUFDLHVFQUFxQjtBQUMxQyxtQkFBbUIsbUJBQU8sQ0FBQyxxRkFBNEI7QUFDdkQsY0FBYyxtQkFBTyxDQUFDLHVGQUE2QjtBQUNuRCxrQ0FBa0MsbUJBQU8sQ0FBQyx1SEFBNkM7O0FBRXZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EiLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzICQgZnJvbSAnanF1ZXJ5JztcblxuKGZ1bmN0aW9uKCl7XG4gICAndXNlIHN0cmljdCc7XG5cbiAgICBjb25zdCB0YWdzRm9ybSA9ICQoXCIjanMtdGFncy1mb3JtXCIpO1xuICAgIGNvbnN0IHRhZ3NDcmVhdGVBcGlVcmwgPSB0YWdzRm9ybS5kYXRhKFwidGFncy1hcGktdXJsXCIpO1xuICAgIGNvbnN0IHRhZ3NDcmVhdGVCdXR0b24gPSAkKFwiI2pzLWZvcm0tdGFncy1jcmVhdGUtYnV0dG9uXCIpO1xuICAgIGNvbnN0IHRhYmxlQm9keSA9ICQoJyNqcy10YWdzLXRhYmxlLWJvZHknKTtcbiAgICBjb25zdCB0YWdzRmluZEFsbFVybCA9IHRhYmxlQm9keS5kYXRhKFwidGFncy1hcGktdXJsXCIpO1xuXG4gICAgd2luZG93LmRlbGV0ZVRhZyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKGNvbmZpcm0oJ0RvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgdGFnPycpKSB7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIHVybDogdGFnc0NyZWF0ZUFwaVVybCArICcvJyArIG5hbWUsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkFjY2VwdFwiIDogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVxdWVzdC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdUYWcgaGFzIGJlZW4gZGVsZXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3AgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgYWxlcnQocmVzcC5lcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldFRhZ3MoKTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRUYWdzKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy9UT0RPIGluIGZ1dHVyZSB3ZSBuZWVkIHRvIGFkZCBKV1QgOilcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRhZ3NGaW5kQWxsVXJsLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIiA6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLmZvckVhY2goZWxlbWVudCA9PiByZW5kZXIoZWxlbWVudCkpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZzonICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0ICsgJyB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiByZW5kZXIodGFnKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSAnXFwnJyArIHRhZy5uYW1lICsgJ1xcJyc7XG4gICAgICAgICAgICAgICAgbGV0IGRlbGV0ZUJ1dHRvbiA9ICc8YnV0dG9uIG9uY2xpY2s9XCJkZWxldGVUYWcoJysgbmFtZSArICcpXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiPkRlbGV0ZTwvYnV0dG9uPic7XG5cbiAgICAgICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAnPHRyPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHRkPicgKyB0YWcubmFtZSArICc8L3RkPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHRkPiBVcGRhdGUgPC90ZD4nICtcbiAgICAgICAgICAgICAgICAgICAgJzx0ZD4nICsgZGVsZXRlQnV0dG9uICsnPC90ZD4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvdHI+J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0YWdzRm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICB0YWdzQ3JlYXRlQnV0dG9uLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSB0YWdzRm9ybS5maW5kKFwiW25hbWU9dGFnTmFtZV1cIikudmFsKCk7XG5cbiAgICAgICAgICAgIGlmIChcIlwiID09PSB0YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0ZpbGwgdGhlIG5hbWUgb2YgdGhlIHRhZyBmaXJzdCEnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNvcHlPZlRleHQgPSB0YWdzQ3JlYXRlQnV0dG9uLmh0bWwoKTtcblxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9ICQuYWpheCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRhZ3NDcmVhdGVBcGlVcmwsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe25hbWU6IHRhZ05hbWV9KSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnc0NyZWF0ZUJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGFnc0Zvcm0udHJpZ2dlcigncmVzZXQnKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGFnc0NyZWF0ZUJ1dHRvbi5odG1sKGNvcHlPZlRleHQpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZzonICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0ICsgJyB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnZm9yRWFjaCcpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG5tb2R1bGUuZXhwb3J0cyA9ICghU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEgpID8gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBjYWNoZSA9IHt9O1xuXG52YXIgdGhyb3dlciA9IGZ1bmN0aW9uIChpdCkgeyB0aHJvdyBpdDsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIG9wdGlvbnMpIHtcbiAgaWYgKGhhcyhjYWNoZSwgTUVUSE9EX05BTUUpKSByZXR1cm4gY2FjaGVbTUVUSE9EX05BTUVdO1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgdmFyIEFDQ0VTU09SUyA9IGhhcyhvcHRpb25zLCAnQUNDRVNTT1JTJykgPyBvcHRpb25zLkFDQ0VTU09SUyA6IGZhbHNlO1xuICB2YXIgYXJndW1lbnQwID0gaGFzKG9wdGlvbnMsIDApID8gb3B0aW9uc1swXSA6IHRocm93ZXI7XG4gIHZhciBhcmd1bWVudDEgPSBoYXMob3B0aW9ucywgMSkgPyBvcHRpb25zWzFdIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiBjYWNoZVtNRVRIT0RfTkFNRV0gPSAhIW1ldGhvZCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIGlmIChBQ0NFU1NPUlMgJiYgIURFU0NSSVBUT1JTKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgTyA9IHsgbGVuZ3RoOiAtMSB9O1xuXG4gICAgaWYgKEFDQ0VTU09SUykgZGVmaW5lUHJvcGVydHkoTywgMSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IHRocm93ZXIgfSk7XG4gICAgZWxzZSBPWzFdID0gMTtcblxuICAgIG1ldGhvZC5jYWxsKE8sIGFyZ3VtZW50MCwgYXJndW1lbnQxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGZpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZmluZDtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgRklORCA9ICdmaW5kJztcbnZhciBTS0lQU19IT0xFUyA9IHRydWU7XG5cbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKEZJTkQpO1xuXG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYgKEZJTkQgaW4gW10pIEFycmF5KDEpW0ZJTkRdKGZ1bmN0aW9uICgpIHsgU0tJUFNfSE9MRVMgPSBmYWxzZTsgfSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogU0tJUFNfSE9MRVMgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgZmluZDogZnVuY3Rpb24gZmluZChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcyhGSU5EKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9IGZvckVhY2ggfSwge1xuICBmb3JFYWNoOiBmb3JFYWNoXG59KTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgRnVuY3Rpb25Qcm90b3R5cGVUb1N0cmluZyA9IEZ1bmN0aW9uUHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIG5hbWVSRSA9IC9eXFxzKmZ1bmN0aW9uIChbXiAoXSopLztcbnZhciBOQU1FID0gJ25hbWUnO1xuXG4vLyBGdW5jdGlvbiBpbnN0YW5jZXMgYC5uYW1lYCBwcm9wZXJ0eVxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZnVuY3Rpb24taW5zdGFuY2VzLW5hbWVcbmlmIChERVNDUklQVE9SUyAmJiAhKE5BTUUgaW4gRnVuY3Rpb25Qcm90b3R5cGUpKSB7XG4gIGRlZmluZVByb3BlcnR5KEZ1bmN0aW9uUHJvdG90eXBlLCBOQU1FLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uUHJvdG90eXBlVG9TdHJpbmcuY2FsbCh0aGlzKS5tYXRjaChuYW1lUkUpWzFdO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERPTUl0ZXJhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20taXRlcmFibGVzJyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSAmJiBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggIT09IGZvckVhY2gpIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsICdmb3JFYWNoJywgZm9yRWFjaCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgQ29sbGVjdGlvblByb3RvdHlwZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==