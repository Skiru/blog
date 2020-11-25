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
  var tagsFindAllUrl = tableBody.data("tags-api-url"); //Update

  var updateTagForm = jquery__WEBPACK_IMPORTED_MODULE_4__("#js-tag-update-form");
  var tagUpdateButton = jquery__WEBPACK_IMPORTED_MODULE_4__("#js-form-tag-update-button");

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

  window.triggerUpdateModal = function (tagName) {
    var url = tagsCreateApiUrl + '/' + tagName;
    updateTagForm.attr("data-tag-update-api-url", url);
    updateTagForm.find("[name=tagName]").val(tagName);
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
      var updateButton = '<button onclick="triggerUpdateModal(' + name + ')" class="btn btn-yellow" data-toggle="modal" data-target="#updateTagModal">Update</button>';
      tableBody.append('<tr>' + '<td>' + tag.name + '</td>' + '<td>' + updateButton + '</td>' + '<td>' + deleteButton + '</td>' + '</tr>');
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
  tagUpdateButton.on('click', function (e) {
    updateTagForm.validate({
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

    if (updateTagForm.valid()) {
      var tagName = updateTagForm.find("[name=tagName]").val();
      var copyOfText = tagUpdateButton.html(); //TODO in future we need to add JWT :)

      var request = jquery__WEBPACK_IMPORTED_MODULE_4__["ajax"]({
        method: 'PATCH',
        data: JSON.stringify({
          name: tagName
        }),
        processData: false,
        contentType: false,
        dataType: 'json',
        url: updateTagForm.data('tag-update-api-url'),
        headers: {
          "Accept": "application/json"
        },
        beforeSend: function beforeSend() {
          tagUpdateButton.html('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
        }
      });
      request.done(function (response) {
        updateTagForm.trigger('reset');
        location.reload();
      });
      request.fail(function (response) {
        tagUpdateButton.html(copyOfText);
        alert('Something went wrong:' + response.responseText + ' try again');
      });
    }

    return false;
  });
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./assets/js/tags.js","runtime","vendors~app~categories~post_update~posts~tags","vendors~app~categories~tags","vendors~categories~tags"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGFncy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwidGFnc0Zvcm0iLCIkIiwidGFnc0NyZWF0ZUFwaVVybCIsImRhdGEiLCJ0YWdzQ3JlYXRlQnV0dG9uIiwidGFibGVCb2R5IiwidGFnc0ZpbmRBbGxVcmwiLCJ1cGRhdGVUYWdGb3JtIiwidGFnVXBkYXRlQnV0dG9uIiwid2luZG93IiwiZGVsZXRlVGFnIiwibmFtZSIsImNvbmZpcm0iLCJyZXF1ZXN0IiwibWV0aG9kIiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJhbGVydCIsImxvY2F0aW9uIiwicmVsb2FkIiwiZmFpbCIsInJlc3AiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJlcnJvciIsInRyaWdnZXJVcGRhdGVNb2RhbCIsInRhZ05hbWUiLCJhdHRyIiwiZmluZCIsInZhbCIsImdldFRhZ3MiLCJmb3JFYWNoIiwiZWxlbWVudCIsInJlbmRlciIsInRhZyIsImRlbGV0ZUJ1dHRvbiIsInVwZGF0ZUJ1dHRvbiIsImFwcGVuZCIsIm9uIiwiZSIsInZhbGlkYXRlIiwicnVsZXMiLCJyZXF1aXJlZCIsIm1pbmxlbmd0aCIsIm1heGxlbmd0aCIsIm1lc3NhZ2VzIiwialF1ZXJ5IiwidmFsaWRhdG9yIiwiZm9ybWF0IiwiZXJyb3JFbGVtZW50IiwiZXJyb3JQbGFjZW1lbnQiLCJhZGRDbGFzcyIsInByb3AiLCJpbnNlcnRBZnRlciIsInBhcmVudCIsInN1Ym1pdEhhbmRsZXIiLCJmb3JtIiwidmFsaWQiLCJjb3B5T2ZUZXh0IiwiaHRtbCIsInN0cmluZ2lmeSIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJiZWZvcmVTZW5kIiwidHJpZ2dlciIsInByb2Nlc3NEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0FBLG1CQUFPLENBQUMsbUZBQUQsQ0FBUDs7QUFFQSxDQUFD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QUUsS0FKTTtBQUtuQkQsZ0JBQVEsRUFBRSxNQUxTO0FBTW5CbEQsV0FBRyxFQUFFUixhQUFhLENBQUNKLElBQWQsQ0FBbUIsb0JBQW5CLENBTmM7QUFPbkJhLGVBQU8sRUFBRTtBQUNMLG9CQUFXO0FBRE4sU0FQVTtBQVVuQm1ELGtCQUFVLEVBQUUsc0JBQVk7QUFDcEIzRCx5QkFBZSxDQUFDdUQsSUFBaEIsQ0FBcUIsMEVBQXJCO0FBQ0g7QUFaa0IsT0FBUCxDQUFoQjtBQWVBbEQsYUFBTyxDQUFDSSxJQUFSLENBQWEsVUFBVUMsUUFBVixFQUFvQjtBQUM3QlgscUJBQWEsQ0FBQzZELE9BQWQsQ0FBc0IsT0FBdEI7QUFDQS9DLGdCQUFRLENBQUNDLE1BQVQ7QUFDSCxPQUhEO0FBS0FULGFBQU8sQ0FBQ1UsSUFBUixDQUFhLFVBQVVMLFFBQVYsRUFBb0I7QUFDN0JWLHVCQUFlLENBQUN1RCxJQUFoQixDQUFxQkQsVUFBckI7QUFDQTFDLGFBQUssQ0FBQywwQkFBMEJGLFFBQVEsQ0FBQ1MsWUFBbkMsR0FBa0QsWUFBbkQsQ0FBTDtBQUNILE9BSEQ7QUFJSDs7QUFFRCxXQUFPLEtBQVA7QUFDSCxHQTdERDtBQThESCxDQXRNRCxJIiwiZmlsZSI6InRhZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyAkIGZyb20gJ2pxdWVyeSc7XG5yZXF1aXJlKCdqcXVlcnktdmFsaWRhdGlvbicpO1xuXG4oZnVuY3Rpb24oKXtcbiAgICd1c2Ugc3RyaWN0JztcblxuICAgIGNvbnN0IHRhZ3NGb3JtID0gJChcIiNqcy10YWdzLWZvcm1cIik7XG4gICAgY29uc3QgdGFnc0NyZWF0ZUFwaVVybCA9IHRhZ3NGb3JtLmRhdGEoXCJ0YWdzLWFwaS11cmxcIik7XG4gICAgY29uc3QgdGFnc0NyZWF0ZUJ1dHRvbiA9ICQoXCIjanMtZm9ybS10YWdzLWNyZWF0ZS1idXR0b25cIik7XG4gICAgY29uc3QgdGFibGVCb2R5ID0gJCgnI2pzLXRhZ3MtdGFibGUtYm9keScpO1xuICAgIGNvbnN0IHRhZ3NGaW5kQWxsVXJsID0gdGFibGVCb2R5LmRhdGEoXCJ0YWdzLWFwaS11cmxcIik7XG5cbiAgICAvL1VwZGF0ZVxuICAgIGNvbnN0IHVwZGF0ZVRhZ0Zvcm0gPSAkKFwiI2pzLXRhZy11cGRhdGUtZm9ybVwiKTtcbiAgICBjb25zdCB0YWdVcGRhdGVCdXR0b24gPSAkKFwiI2pzLWZvcm0tdGFnLXVwZGF0ZS1idXR0b25cIik7XG5cbiAgICB3aW5kb3cuZGVsZXRlVGFnID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBpZiAoY29uZmlybSgnRG8geW91IHJlYWxseSB3YW50IHRvIGRlbGV0ZSB0YWc/JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgdXJsOiB0YWdzQ3JlYXRlQXBpVXJsICsgJy8nICsgbmFtZSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0XCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1RhZyBoYXMgYmVlbiBkZWxldGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcCA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBhbGVydChyZXNwLmVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy50cmlnZ2VyVXBkYXRlTW9kYWwgPSBmdW5jdGlvbih0YWdOYW1lKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRhZ3NDcmVhdGVBcGlVcmwgKyAnLycgKyB0YWdOYW1lO1xuICAgICAgICB1cGRhdGVUYWdGb3JtLmF0dHIoXCJkYXRhLXRhZy11cGRhdGUtYXBpLXVybFwiLCB1cmwpO1xuICAgICAgICB1cGRhdGVUYWdGb3JtLmZpbmQoXCJbbmFtZT10YWdOYW1lXVwiKS52YWwodGFnTmFtZSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5nZXRUYWdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL1RPRE8gaW4gZnV0dXJlIHdlIG5lZWQgdG8gYWRkIEpXVCA6KVxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogdGFnc0ZpbmRBbGxVcmwsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIiA6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuZm9yRWFjaChlbGVtZW50ID0+IHJlbmRlcihlbGVtZW50KSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgYWxlcnQoJ1NvbWV0aGluZyB3ZW50IHdyb25nOicgKyByZXNwb25zZS5yZXNwb25zZVRleHQgKyAnIHRyeSBhZ2FpbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiByZW5kZXIodGFnKSB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9ICdcXCcnICsgdGFnLm5hbWUgKyAnXFwnJztcbiAgICAgICAgICAgIGxldCBkZWxldGVCdXR0b24gPSAnPGJ1dHRvbiBvbmNsaWNrPVwiZGVsZXRlVGFnKCcrIG5hbWUgKyAnKVwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj4nO1xuICAgICAgICAgICAgbGV0IHVwZGF0ZUJ1dHRvbiA9ICc8YnV0dG9uIG9uY2xpY2s9XCJ0cmlnZ2VyVXBkYXRlTW9kYWwoJysgbmFtZSArICcpXCIgY2xhc3M9XCJidG4gYnRuLXllbGxvd1wiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiN1cGRhdGVUYWdNb2RhbFwiPlVwZGF0ZTwvYnV0dG9uPic7XG5cbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJzx0cj4nICtcbiAgICAgICAgICAgICAgICAnPHRkPicgKyB0YWcubmFtZSArICc8L3RkPicgK1xuICAgICAgICAgICAgICAgICc8dGQ+JyArIHVwZGF0ZUJ1dHRvbiArICc8L3RkPicgK1xuICAgICAgICAgICAgICAgICc8dGQ+JyArIGRlbGV0ZUJ1dHRvbiArJzwvdGQ+JyArXG4gICAgICAgICAgICAgICAgJzwvdHI+J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBnZXRUYWdzKCk7XG5cbiAgICB0YWdzQ3JlYXRlQnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRhZ3NGb3JtLnZhbGlkYXRlKHtcbiAgICAgICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgICAgICAgdGFnTmFtZToge1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWlubGVuZ3RoOiAyLFxuICAgICAgICAgICAgICAgICAgICBtYXhsZW5ndGg6IDEyOFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXNzYWdlczoge1xuICAgICAgICAgICAgICAgIHRhZ05hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwiVGFnIG5hbWUgaXMgcmVxdWlyZWQhXCIsXG4gICAgICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoXCJBdCBsZWFzdCB7MH0gY2hhcmFjdGVycyByZXF1aXJlZCFcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JFbGVtZW50OiBcImVtXCIsXG4gICAgICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24gKCBlcnJvciwgZWxlbWVudCApIHtcbiAgICAgICAgICAgICAgICBlcnJvci5hZGRDbGFzcyggXCJpbnZhbGlkLWZlZWRiYWNrXCIgKTtcblxuICAgICAgICAgICAgICAgIGlmICggZWxlbWVudC5wcm9wKCBcInR5cGVcIiApID09PSBcImNoZWNrYm94XCIgKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKCBlbGVtZW50LnBhcmVudCggXCJsYWJlbFwiICkgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlciggZWxlbWVudCApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRhZ3NGb3JtLnZhbGlkKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSB0YWdzRm9ybS5maW5kKFwiW25hbWU9dGFnTmFtZV1cIikudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBjb3B5T2ZUZXh0ID0gdGFnc0NyZWF0ZUJ1dHRvbi5odG1sKCk7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIHVybDogdGFnc0NyZWF0ZUFwaVVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7bmFtZTogdGFnTmFtZX0pLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0YWdzQ3JlYXRlQnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0YWdzRm9ybS50cmlnZ2VyKCdyZXNldCcpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0YWdzQ3JlYXRlQnV0dG9uLmh0bWwoY29weU9mVGV4dCk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1NvbWV0aGluZyB3ZW50IHdyb25nOicgKyByZXNwb25zZS5yZXNwb25zZVRleHQgKyAnIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0YWdVcGRhdGVCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdXBkYXRlVGFnRm9ybS52YWxpZGF0ZSh7XG4gICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgIHRhZ05hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogMixcbiAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiAxMjhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBcIlRhZyBuYW1lIGlzIHJlcXVpcmVkIVwiLFxuICAgICAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiQXQgbGVhc3QgezB9IGNoYXJhY3RlcnMgcmVxdWlyZWQhXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yRWxlbWVudDogXCJlbVwiLFxuICAgICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uICggZXJyb3IsIGVsZW1lbnQgKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IuYWRkQ2xhc3MoIFwiaW52YWxpZC1mZWVkYmFja1wiICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGVsZW1lbnQucHJvcCggXCJ0eXBlXCIgKSA9PT0gXCJjaGVja2JveFwiICkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlciggZWxlbWVudC5wYXJlbnQoIFwibGFiZWxcIiApICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoIGVsZW1lbnQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh1cGRhdGVUYWdGb3JtLnZhbGlkKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSB1cGRhdGVUYWdGb3JtLmZpbmQoXCJbbmFtZT10YWdOYW1lXVwiKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvcHlPZlRleHQgPSB0YWdVcGRhdGVCdXR0b24uaHRtbCgpO1xuICAgICAgICAgICAgLy9UT0RPIGluIGZ1dHVyZSB3ZSBuZWVkIHRvIGFkZCBKV1QgOilcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7bmFtZTogdGFnTmFtZX0pLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICB1cmw6IHVwZGF0ZVRhZ0Zvcm0uZGF0YSgndGFnLXVwZGF0ZS1hcGktdXJsJyksXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkFjY2VwdFwiIDogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnVXBkYXRlQnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWdGb3JtLnRyaWdnZXIoJ3Jlc2V0Jyk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRhZ1VwZGF0ZUJ1dHRvbi5odG1sKGNvcHlPZlRleHQpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZzonICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0ICsgJyB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=