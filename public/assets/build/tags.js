(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tags"],{

/***/ "./assets/js/tags.js":
/*!***************************!*\
  !*** ./assets/js/tags.js ***!
  \***************************/
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

  window.getTags = function () {
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
  };

  getTags();
  tagsCreateButton.on('click', function (e) {
    tagsForm.validate({
      rules: {
        tagName: {
          required: true,
          minlength: 2,
          maxlength: 128
        }
      },
      messages: {
        tagName: {
          required: "Tag name is required!",
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

    if (tagsForm.valid()) {
      var tagName = tagsForm.find("[name=tagName]").val();
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
    }

    return false;
  });
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./assets/js/tags.js","runtime","vendors~app~categories~post_update~posts~tags","vendors~app~categories~tags","vendors~categories~tags"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGFncy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwidGFnc0Zvcm0iLCIkIiwidGFnc0NyZWF0ZUFwaVVybCIsImRhdGEiLCJ0YWdzQ3JlYXRlQnV0dG9uIiwidGFibGVCb2R5IiwidGFnc0ZpbmRBbGxVcmwiLCJ3aW5kb3ciLCJkZWxldGVUYWciLCJuYW1lIiwiY29uZmlybSIsInJlcXVlc3QiLCJtZXRob2QiLCJ1cmwiLCJoZWFkZXJzIiwiZG9uZSIsInJlc3BvbnNlIiwic3VjY2VzcyIsImFsZXJ0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJmYWlsIiwicmVzcCIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImVycm9yIiwiZ2V0VGFncyIsImZvckVhY2giLCJlbGVtZW50IiwicmVuZGVyIiwidGFnIiwiZGVsZXRlQnV0dG9uIiwiYXBwZW5kIiwib24iLCJlIiwidmFsaWRhdGUiLCJydWxlcyIsInRhZ05hbWUiLCJyZXF1aXJlZCIsIm1pbmxlbmd0aCIsIm1heGxlbmd0aCIsIm1lc3NhZ2VzIiwialF1ZXJ5IiwidmFsaWRhdG9yIiwiZm9ybWF0IiwiZXJyb3JFbGVtZW50IiwiZXJyb3JQbGFjZW1lbnQiLCJhZGRDbGFzcyIsInByb3AiLCJpbnNlcnRBZnRlciIsInBhcmVudCIsInN1Ym1pdEhhbmRsZXIiLCJmb3JtIiwidmFsaWQiLCJmaW5kIiwidmFsIiwiY29weU9mVGV4dCIsImh0bWwiLCJzdHJpbmdpZnkiLCJkYXRhVHlwZSIsImNvbnRlbnRUeXBlIiwiYmVmb3JlU2VuZCIsInRyaWdnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQUEsbUJBQU8sQ0FBQyxtRkFBRCxDQUFQOztBQUVBLENBQUMsWUFBVTtBQUNSOztBQUVDLE1BQU1DLFFBQVEsR0FBR0MsbUNBQUMsQ0FBQyxlQUFELENBQWxCO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdGLFFBQVEsQ0FBQ0cs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QUFDK0QsT0FBVCxDQUFpQixPQUFqQjtBQUNBNUMsZ0JBQVEsQ0FBQ0MsTUFBVDtBQUNILE9BSEQ7QUFLQVQsYUFBTyxDQUFDVSxJQUFSLENBQWEsVUFBVUwsUUFBVixFQUFvQjtBQUM3Qlosd0JBQWdCLENBQUNzRCxJQUFqQixDQUFzQkQsVUFBdEI7QUFDQXZDLGFBQUssQ0FBQywwQkFBMEJGLFFBQVEsQ0FBQ1MsWUFBbkMsR0FBa0QsWUFBbkQsQ0FBTDtBQUNILE9BSEQ7QUFJSDs7QUFFRCxXQUFPLEtBQVA7QUFDSCxHQXhERDtBQXlESCxDQTVIRCxJIiwiZmlsZSI6InRhZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyAkIGZyb20gJ2pxdWVyeSc7XG5yZXF1aXJlKCdqcXVlcnktdmFsaWRhdGlvbicpO1xuXG4oZnVuY3Rpb24oKXtcbiAgICd1c2Ugc3RyaWN0JztcblxuICAgIGNvbnN0IHRhZ3NGb3JtID0gJChcIiNqcy10YWdzLWZvcm1cIik7XG4gICAgY29uc3QgdGFnc0NyZWF0ZUFwaVVybCA9IHRhZ3NGb3JtLmRhdGEoXCJ0YWdzLWFwaS11cmxcIik7XG4gICAgY29uc3QgdGFnc0NyZWF0ZUJ1dHRvbiA9ICQoXCIjanMtZm9ybS10YWdzLWNyZWF0ZS1idXR0b25cIik7XG4gICAgY29uc3QgdGFibGVCb2R5ID0gJCgnI2pzLXRhZ3MtdGFibGUtYm9keScpO1xuICAgIGNvbnN0IHRhZ3NGaW5kQWxsVXJsID0gdGFibGVCb2R5LmRhdGEoXCJ0YWdzLWFwaS11cmxcIik7XG5cbiAgICB3aW5kb3cuZGVsZXRlVGFnID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBpZiAoY29uZmlybSgnRG8geW91IHJlYWxseSB3YW50IHRvIGRlbGV0ZSB0YWc/JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgdXJsOiB0YWdzQ3JlYXRlQXBpVXJsICsgJy8nICsgbmFtZSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0XCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1RhZyBoYXMgYmVlbiBkZWxldGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcCA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBhbGVydChyZXNwLmVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5nZXRUYWdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL1RPRE8gaW4gZnV0dXJlIHdlIG5lZWQgdG8gYWRkIEpXVCA6KVxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogdGFnc0ZpbmRBbGxVcmwsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIiA6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuZm9yRWFjaChlbGVtZW50ID0+IHJlbmRlcihlbGVtZW50KSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgYWxlcnQoJ1NvbWV0aGluZyB3ZW50IHdyb25nOicgKyByZXNwb25zZS5yZXNwb25zZVRleHQgKyAnIHRyeSBhZ2FpbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiByZW5kZXIodGFnKSB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9ICdcXCcnICsgdGFnLm5hbWUgKyAnXFwnJztcbiAgICAgICAgICAgIGxldCBkZWxldGVCdXR0b24gPSAnPGJ1dHRvbiBvbmNsaWNrPVwiZGVsZXRlVGFnKCcrIG5hbWUgKyAnKVwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj4nO1xuXG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kKFxuICAgICAgICAgICAgICAgICc8dHI+JyArXG4gICAgICAgICAgICAgICAgJzx0ZD4nICsgdGFnLm5hbWUgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICAgICAnPHRkPiBVcGRhdGUgPC90ZD4nICtcbiAgICAgICAgICAgICAgICAnPHRkPicgKyBkZWxldGVCdXR0b24gKyc8L3RkPicgK1xuICAgICAgICAgICAgICAgICc8L3RyPidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2V0VGFncygpO1xuXG4gICAgdGFnc0NyZWF0ZUJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0YWdzRm9ybS52YWxpZGF0ZSh7XG4gICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgIHRhZ05hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogMixcbiAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiAxMjhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBcIlRhZyBuYW1lIGlzIHJlcXVpcmVkIVwiLFxuICAgICAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiQXQgbGVhc3QgezB9IGNoYXJhY3RlcnMgcmVxdWlyZWQhXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yRWxlbWVudDogXCJlbVwiLFxuICAgICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uICggZXJyb3IsIGVsZW1lbnQgKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IuYWRkQ2xhc3MoIFwiaW52YWxpZC1mZWVkYmFja1wiICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGVsZW1lbnQucHJvcCggXCJ0eXBlXCIgKSA9PT0gXCJjaGVja2JveFwiICkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlciggZWxlbWVudC5wYXJlbnQoIFwibGFiZWxcIiApICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoIGVsZW1lbnQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0YWdzRm9ybS52YWxpZCgpKSB7XG4gICAgICAgICAgICBjb25zdCB0YWdOYW1lID0gdGFnc0Zvcm0uZmluZChcIltuYW1lPXRhZ05hbWVdXCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgY29weU9mVGV4dCA9IHRhZ3NDcmVhdGVCdXR0b24uaHRtbCgpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9ICQuYWpheCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRhZ3NDcmVhdGVBcGlVcmwsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe25hbWU6IHRhZ05hbWV9KSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnc0NyZWF0ZUJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGFnc0Zvcm0udHJpZ2dlcigncmVzZXQnKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGFnc0NyZWF0ZUJ1dHRvbi5odG1sKGNvcHlPZlRleHQpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZzonICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0ICsgJyB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=