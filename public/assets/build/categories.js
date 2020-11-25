(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["categories"],{

/***/ "./assets/js/categories.js":
/*!*********************************!*\
  !*** ./assets/js/categories.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);






__webpack_require__(/*! jquery-validation */ "./node_modules/jquery-validation/dist/jquery.validate.js");

(function () {
  'use strict';

  var categoriesForm = jquery__WEBPACK_IMPORTED_MODULE_4__("#js-categories-form");
  var categoriesCreateApiUrl = categoriesForm.data("categories-api-url");
  var categoriesCreateButton = jquery__WEBPACK_IMPORTED_MODULE_4__("#js-form-categories-create-button");
  var tableBody = jquery__WEBPACK_IMPORTED_MODULE_4__('#js-categories-table-body');
  var categoriesFindAllApiUrl = tableBody.data("categories-api-url");

  window.getCategories = function () {
    //TODO in future we need to add JWT :)
    var request = jquery__WEBPACK_IMPORTED_MODULE_4__["ajax"]({
      method: "GET",
      url: categoriesFindAllApiUrl,
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

    function render(category) {
      tableBody.append('<tr>' + '<td>' + category.name + '</td>' + '<td> Update / Delete </td>' + '</tr>');
    }
  };

  getCategories();
  categoriesCreateButton.on('click', function (e) {
    categoriesForm.validate({
      rules: {
        categoryName: {
          required: true,
          minlength: 2,
          maxlength: 128
        }
      },
      messages: {
        categoryName: {
          required: "Category name is required!",
          minlength: jQuery.validator.format("At least {0} characters required!")
        }
      },
      errorElement: "em",
      errorPlacement: function errorPlacement(error, element) {
        error.addClass("invalid-feedback");

        if (element.prop("type") === "checkbox") {
          error.insertAfter(element.parent("label"));
        } else {
          error.insertAfter(element);
        }
      },
      submitHandler: function submitHandler(form) {
        return false;
      }
    });

    if (categoriesForm.valid()) {
      var categoryName = categoriesForm.find("[name=categoryName]").val();
      var copyOfText = categoriesCreateButton.html();
      var request = jquery__WEBPACK_IMPORTED_MODULE_4__["ajax"]({
        method: "POST",
        url: categoriesCreateApiUrl,
        data: JSON.stringify({
          name: categoryName
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function beforeSend() {
          categoriesCreateButton.html('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
        }
      });
      request.done(function (response) {
        categoriesForm.trigger('reset');
        location.reload();
      });
      request.fail(function (response) {
        categoriesCreateButton.html(copyOfText);
        alert('Something went wrong:' + response.responseText + ' try again');
      });
    }

    return false;
  });
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./assets/js/categories.js","runtime","vendors~app~categories~post_update~posts~tags","vendors~app~categories~tags","vendors~categories~tags"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY2F0ZWdvcmllcy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiY2F0ZWdvcmllc0Zvcm0iLCIkIiwiY2F0ZWdvcmllc0NyZWF0ZUFwaVVybCIsImRhdGEiLCJjYXRlZ29yaWVzQ3JlYXRlQnV0dG9uIiwidGFibGVCb2R5IiwiY2F0ZWdvcmllc0ZpbmRBbGxBcGlVcmwiLCJ3aW5kb3ciLCJnZXRDYXRlZ29yaWVzIiwicmVxdWVzdCIsIm1ldGhvZCIsInVybCIsImhlYWRlcnMiLCJkb25lIiwicmVzcG9uc2UiLCJmb3JFYWNoIiwiZWxlbWVudCIsInJlbmRlciIsImZhaWwiLCJhbGVydCIsInJlc3BvbnNlVGV4dCIsImNhdGVnb3J5IiwiYXBwZW5kIiwibmFtZSIsIm9uIiwiZSIsInZhbGlkYXRlIiwicnVsZXMiLCJjYXRlZ29yeU5hbWUiLCJyZXF1aXJlZCIsIm1pbmxlbmd0aCIsIm1heGxlbmd0aCIsIm1lc3NhZ2VzIiwialF1ZXJ5IiwidmFsaWRhdG9yIiwiZm9ybWF0IiwiZXJyb3JFbGVtZW50IiwiZXJyb3JQbGFjZW1lbnQiLCJlcnJvciIsImFkZENsYXNzIiwicHJvcCIsImluc2VydEFmdGVyIiwicGFyZW50Iiwic3VibWl0SGFuZGxlciIsImZvcm0iLCJ2YWxpZCIsImZpbmQiLCJ2YWwiLCJjb3B5T2ZUZXh0IiwiaHRtbCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhVHlwZSIsImNvbnRlbnRUeXBlIiwiYmVmb3JlU2VuZCIsInRyaWdnZXIiLCJsb2NhdGlvbiIsInJlbG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBQSxtQkFBTyxDQUFDLG1GQUFELENBQVA7O0FBRUEsQ0FBQyxZQUFVO0FBQ1A7O0FBRUEsTUFBTUMsY0FBYyxHQUFHQyxtQ0FBQyxDQUFDLHFCQUFELENBQXhCO0FBQ0EsTUFBTUMsc0JBQXNCLEdBQUdGLGNBQWMsQ0FBQ0csSUFBZixDQUFvQixv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O0FBS25CQyxtQkFBVyxFQUFFLGlDQUxNO0FBTW5CQyxrQkFBVSxFQUFFLHNCQUFZO0FBQ3BCbEQsZ0NBQXNCLENBQUM2QyxJQUF2QixDQUE0QiwwRUFBNUI7QUFDSDtBQVJrQixPQUFQLENBQWhCO0FBV0F4QyxhQUFPLENBQUNJLElBQVIsQ0FBYSxVQUFVQyxRQUFWLEVBQW9CO0FBQzdCZCxzQkFBYyxDQUFDdUQsT0FBZixDQUF1QixPQUF2QjtBQUNBQyxnQkFBUSxDQUFDQyxNQUFUO0FBQ0gsT0FIRDtBQUtBaEQsYUFBTyxDQUFDUyxJQUFSLENBQWEsVUFBVUosUUFBVixFQUFvQjtBQUM3QlYsOEJBQXNCLENBQUM2QyxJQUF2QixDQUE0QkQsVUFBNUI7QUFDQTdCLGFBQUssQ0FBQywwQkFBMEJMLFFBQVEsQ0FBQ00sWUFBbkMsR0FBa0QsWUFBbkQsQ0FBTDtBQUNILE9BSEQ7QUFJSDs7QUFFRCxXQUFPLEtBQVA7QUFDSCxHQXpERDtBQTBESCxDQWpHRCxJIiwiZmlsZSI6ImNhdGVnb3JpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyAkIGZyb20gJ2pxdWVyeSc7XG5yZXF1aXJlKCdqcXVlcnktdmFsaWRhdGlvbicpO1xuXG4oZnVuY3Rpb24oKXtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBjb25zdCBjYXRlZ29yaWVzRm9ybSA9ICQoXCIjanMtY2F0ZWdvcmllcy1mb3JtXCIpO1xuICAgIGNvbnN0IGNhdGVnb3JpZXNDcmVhdGVBcGlVcmwgPSBjYXRlZ29yaWVzRm9ybS5kYXRhKFwiY2F0ZWdvcmllcy1hcGktdXJsXCIpO1xuICAgIGNvbnN0IGNhdGVnb3JpZXNDcmVhdGVCdXR0b24gPSAkKFwiI2pzLWZvcm0tY2F0ZWdvcmllcy1jcmVhdGUtYnV0dG9uXCIpO1xuICAgIGNvbnN0IHRhYmxlQm9keSA9ICQoJyNqcy1jYXRlZ29yaWVzLXRhYmxlLWJvZHknKTtcbiAgICBjb25zdCBjYXRlZ29yaWVzRmluZEFsbEFwaVVybCA9IHRhYmxlQm9keS5kYXRhKFwiY2F0ZWdvcmllcy1hcGktdXJsXCIpO1xuXG4gICAgd2luZG93LmdldENhdGVnb3JpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vVE9ETyBpbiBmdXR1cmUgd2UgbmVlZCB0byBhZGQgSldUIDopXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBjYXRlZ29yaWVzRmluZEFsbEFwaVVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiIDogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVxdWVzdC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4gcmVuZGVyKGVsZW1lbnQpKVxuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0LmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBhbGVydCgnU29tZXRoaW5nIHdlbnQgd3Jvbmc6JyArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCArICcgdHJ5IGFnYWluJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlcihjYXRlZ29yeSkge1xuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZChcbiAgICAgICAgICAgICAgICAnPHRyPicgK1xuICAgICAgICAgICAgICAgICc8dGQ+JyArIGNhdGVnb3J5Lm5hbWUgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICAgICAnPHRkPiBVcGRhdGUgLyBEZWxldGUgPC90ZD4nICtcbiAgICAgICAgICAgICAgICAnPC90cj4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGdldENhdGVnb3JpZXMoKTtcblxuICAgIGNhdGVnb3JpZXNDcmVhdGVCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY2F0ZWdvcmllc0Zvcm0udmFsaWRhdGUoe1xuICAgICAgICAgICAgcnVsZXM6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeU5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogMixcbiAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiAxMjhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeU5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwiQ2F0ZWdvcnkgbmFtZSBpcyByZXF1aXJlZCFcIixcbiAgICAgICAgICAgICAgICAgICAgbWlubGVuZ3RoOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIkF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzIHJlcXVpcmVkIVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvckVsZW1lbnQ6IFwiZW1cIixcbiAgICAgICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbiAoIGVycm9yLCBlbGVtZW50ICkge1xuICAgICAgICAgICAgICAgIGVycm9yLmFkZENsYXNzKCBcImludmFsaWQtZmVlZGJhY2tcIiApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBlbGVtZW50LnByb3AoIFwidHlwZVwiICkgPT09IFwiY2hlY2tib3hcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoIGVsZW1lbnQucGFyZW50KCBcImxhYmVsXCIgKSApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKCBlbGVtZW50ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY2F0ZWdvcmllc0Zvcm0udmFsaWQoKSkge1xuICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnlOYW1lID0gY2F0ZWdvcmllc0Zvcm0uZmluZChcIltuYW1lPWNhdGVnb3J5TmFtZV1cIikudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBjb3B5T2ZUZXh0ID0gY2F0ZWdvcmllc0NyZWF0ZUJ1dHRvbi5odG1sKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBjYXRlZ29yaWVzQ3JlYXRlQXBpVXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtuYW1lOiBjYXRlZ29yeU5hbWV9KSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllc0NyZWF0ZUJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllc0Zvcm0udHJpZ2dlcigncmVzZXQnKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllc0NyZWF0ZUJ1dHRvbi5odG1sKGNvcHlPZlRleHQpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZzonICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0ICsgJyB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=