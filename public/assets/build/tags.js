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
      tableBody.append('<tr>' + '<td>' + tag.name + '</td>' + '<td>' + updateButton + deleteButton + '</td>' + '</tr>');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGFncy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwidGFnc0Zvcm0iLCIkIiwidGFnc0NyZWF0ZUFwaVVybCIsImRhdGEiLCJ0YWdzQ3JlYXRlQnV0dG9uIiwidGFibGVCb2R5IiwidGFnc0ZpbmRBbGxVcmwiLCJ1cGRhdGVUYWdGb3JtIiwidGFnVXBkYXRlQnV0dG9uIiwid2luZG93IiwiZGVsZXRlVGFnIiwibmFtZSIsImNvbmZpcm0iLCJyZXF1ZXN0IiwibWV0aG9kIiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJhbGVydCIsImxvY2F0aW9uIiwicmVsb2FkIiwiZmFpbCIsInJlc3AiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJlcnJvciIsInRyaWdnZXJVcGRhdGVNb2RhbCIsInRhZ05hbWUiLCJhdHRyIiwiZmluZCIsInZhbCIsImdldFRhZ3MiLCJmb3JFYWNoIiwiZWxlbWVudCIsInJlbmRlciIsInRhZyIsImRlbGV0ZUJ1dHRvbiIsInVwZGF0ZUJ1dHRvbiIsImFwcGVuZCIsIm9uIiwiZSIsInZhbGlkYXRlIiwicnVsZXMiLCJyZXF1aXJlZCIsIm1pbmxlbmd0aCIsIm1heGxlbmd0aCIsIm1lc3NhZ2VzIiwialF1ZXJ5IiwidmFsaWRhdG9yIiwiZm9ybWF0IiwiZXJyb3JFbGVtZW50IiwiZXJyb3JQbGFjZW1lbnQiLCJhZGRDbGFzcyIsInByb3AiLCJpbnNlcnRBZnRlciIsInBhcmVudCIsInN1Ym1pdEhhbmRsZXIiLCJmb3JtIiwidmFsaWQiLCJjb3B5T2ZUZXh0IiwiaHRtbCIsInN0cmluZ2lmeSIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJiZWZvcmVTZW5kIiwidHJpZ2dlciIsInByb2Nlc3NEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0FBLG1CQUFPLENBQUMsbUZBQUQsQ0FBUDs7QUFFQSxDQUFD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LEVBQUUsTUFMUztBQU1uQmxELFdBQUcsRUFBRVIsYUFBYSxDQUFDSixJQUFkLENBQW1CLG9CQUFuQixDQU5jO0FBT25CYSxlQUFPLEVBQUU7QUFDTCxvQkFBVztBQUROLFNBUFU7QUFVbkJtRCxrQkFBVSxFQUFFLHNCQUFZO0FBQ3BCM0QseUJBQWUsQ0FBQ3VELElBQWhCLENBQXFCLDBFQUFyQjtBQUNIO0FBWmtCLE9BQVAsQ0FBaEI7QUFlQWxELGFBQU8sQ0FBQ0ksSUFBUixDQUFhLFVBQVVDLFFBQVYsRUFBb0I7QUFDN0JYLHFCQUFhLENBQUM2RCxPQUFkLENBQXNCLE9BQXRCO0FBQ0EvQyxnQkFBUSxDQUFDQyxNQUFUO0FBQ0gsT0FIRDtBQUtBVCxhQUFPLENBQUNVLElBQVIsQ0FBYSxVQUFVTCxRQUFWLEVBQW9CO0FBQzdCVix1QkFBZSxDQUFDdUQsSUFBaEIsQ0FBcUJELFVBQXJCO0FBQ0ExQyxhQUFLLENBQUMsMEJBQTBCRixRQUFRLENBQUNTLFlBQW5DLEdBQWtELFlBQW5ELENBQUw7QUFDSCxPQUhEO0FBSUg7O0FBRUQsV0FBTyxLQUFQO0FBQ0gsR0E3REQ7QUE4REgsQ0FyTUQsSSIsImZpbGUiOiJ0YWdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgJCBmcm9tICdqcXVlcnknO1xucmVxdWlyZSgnanF1ZXJ5LXZhbGlkYXRpb24nKTtcblxuKGZ1bmN0aW9uKCl7XG4gICAndXNlIHN0cmljdCc7XG5cbiAgICBjb25zdCB0YWdzRm9ybSA9ICQoXCIjanMtdGFncy1mb3JtXCIpO1xuICAgIGNvbnN0IHRhZ3NDcmVhdGVBcGlVcmwgPSB0YWdzRm9ybS5kYXRhKFwidGFncy1hcGktdXJsXCIpO1xuICAgIGNvbnN0IHRhZ3NDcmVhdGVCdXR0b24gPSAkKFwiI2pzLWZvcm0tdGFncy1jcmVhdGUtYnV0dG9uXCIpO1xuICAgIGNvbnN0IHRhYmxlQm9keSA9ICQoJyNqcy10YWdzLXRhYmxlLWJvZHknKTtcbiAgICBjb25zdCB0YWdzRmluZEFsbFVybCA9IHRhYmxlQm9keS5kYXRhKFwidGFncy1hcGktdXJsXCIpO1xuXG4gICAgLy9VcGRhdGVcbiAgICBjb25zdCB1cGRhdGVUYWdGb3JtID0gJChcIiNqcy10YWctdXBkYXRlLWZvcm1cIik7XG4gICAgY29uc3QgdGFnVXBkYXRlQnV0dG9uID0gJChcIiNqcy1mb3JtLXRhZy11cGRhdGUtYnV0dG9uXCIpO1xuXG4gICAgd2luZG93LmRlbGV0ZVRhZyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKGNvbmZpcm0oJ0RvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgdGFnPycpKSB7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIHVybDogdGFnc0NyZWF0ZUFwaVVybCArICcvJyArIG5hbWUsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkFjY2VwdFwiIDogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVxdWVzdC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdUYWcgaGFzIGJlZW4gZGVsZXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3AgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgYWxlcnQocmVzcC5lcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cudHJpZ2dlclVwZGF0ZU1vZGFsID0gZnVuY3Rpb24odGFnTmFtZSkge1xuICAgICAgICBjb25zdCB1cmwgPSB0YWdzQ3JlYXRlQXBpVXJsICsgJy8nICsgdGFnTmFtZTtcbiAgICAgICAgdXBkYXRlVGFnRm9ybS5hdHRyKFwiZGF0YS10YWctdXBkYXRlLWFwaS11cmxcIiwgdXJsKTtcbiAgICAgICAgdXBkYXRlVGFnRm9ybS5maW5kKFwiW25hbWU9dGFnTmFtZV1cIikudmFsKHRhZ05hbWUpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuZ2V0VGFncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9UT0RPIGluIGZ1dHVyZSB3ZSBuZWVkIHRvIGFkZCBKV1QgOilcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9ICQuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IHRhZ3NGaW5kQWxsVXJsLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQWNjZXB0XCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLmZvckVhY2goZWxlbWVudCA9PiByZW5kZXIoZWxlbWVudCkpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZzonICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0ICsgJyB0cnkgYWdhaW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVuZGVyKHRhZykge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSAnXFwnJyArIHRhZy5uYW1lICsgJ1xcJyc7XG4gICAgICAgICAgICBsZXQgZGVsZXRlQnV0dG9uID0gJzxidXR0b24gb25jbGljaz1cImRlbGV0ZVRhZygnKyBuYW1lICsgJylcIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+JztcbiAgICAgICAgICAgIGxldCB1cGRhdGVCdXR0b24gPSAnPGJ1dHRvbiBvbmNsaWNrPVwidHJpZ2dlclVwZGF0ZU1vZGFsKCcrIG5hbWUgKyAnKVwiIGNsYXNzPVwiYnRuIGJ0bi15ZWxsb3dcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjdXBkYXRlVGFnTW9kYWxcIj5VcGRhdGU8L2J1dHRvbj4nO1xuXG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kKFxuICAgICAgICAgICAgICAgICc8dHI+JyArXG4gICAgICAgICAgICAgICAgJzx0ZD4nICsgdGFnLm5hbWUgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICAgICAnPHRkPicgKyB1cGRhdGVCdXR0b24gKyBkZWxldGVCdXR0b24gKyc8L3RkPicgK1xuICAgICAgICAgICAgICAgICc8L3RyPidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2V0VGFncygpO1xuXG4gICAgdGFnc0NyZWF0ZUJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0YWdzRm9ybS52YWxpZGF0ZSh7XG4gICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgIHRhZ05hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogMixcbiAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiAxMjhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBcIlRhZyBuYW1lIGlzIHJlcXVpcmVkIVwiLFxuICAgICAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiQXQgbGVhc3QgezB9IGNoYXJhY3RlcnMgcmVxdWlyZWQhXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yRWxlbWVudDogXCJlbVwiLFxuICAgICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uICggZXJyb3IsIGVsZW1lbnQgKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IuYWRkQ2xhc3MoIFwiaW52YWxpZC1mZWVkYmFja1wiICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGVsZW1lbnQucHJvcCggXCJ0eXBlXCIgKSA9PT0gXCJjaGVja2JveFwiICkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlciggZWxlbWVudC5wYXJlbnQoIFwibGFiZWxcIiApICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoIGVsZW1lbnQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0YWdzRm9ybS52YWxpZCgpKSB7XG4gICAgICAgICAgICBjb25zdCB0YWdOYW1lID0gdGFnc0Zvcm0uZmluZChcIltuYW1lPXRhZ05hbWVdXCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgY29weU9mVGV4dCA9IHRhZ3NDcmVhdGVCdXR0b24uaHRtbCgpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9ICQuYWpheCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRhZ3NDcmVhdGVBcGlVcmwsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe25hbWU6IHRhZ05hbWV9KSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnc0NyZWF0ZUJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGFnc0Zvcm0udHJpZ2dlcigncmVzZXQnKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGFnc0NyZWF0ZUJ1dHRvbi5odG1sKGNvcHlPZlRleHQpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZzonICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0ICsgJyB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgdGFnVXBkYXRlQnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHVwZGF0ZVRhZ0Zvcm0udmFsaWRhdGUoe1xuICAgICAgICAgICAgcnVsZXM6IHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IDIsXG4gICAgICAgICAgICAgICAgICAgIG1heGxlbmd0aDogMTI4XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgdGFnTmFtZToge1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJUYWcgbmFtZSBpcyByZXF1aXJlZCFcIixcbiAgICAgICAgICAgICAgICAgICAgbWlubGVuZ3RoOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIkF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzIHJlcXVpcmVkIVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvckVsZW1lbnQ6IFwiZW1cIixcbiAgICAgICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbiAoIGVycm9yLCBlbGVtZW50ICkge1xuICAgICAgICAgICAgICAgIGVycm9yLmFkZENsYXNzKCBcImludmFsaWQtZmVlZGJhY2tcIiApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBlbGVtZW50LnByb3AoIFwidHlwZVwiICkgPT09IFwiY2hlY2tib3hcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoIGVsZW1lbnQucGFyZW50KCBcImxhYmVsXCIgKSApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKCBlbGVtZW50ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodXBkYXRlVGFnRm9ybS52YWxpZCgpKSB7XG4gICAgICAgICAgICBjb25zdCB0YWdOYW1lID0gdXBkYXRlVGFnRm9ybS5maW5kKFwiW25hbWU9dGFnTmFtZV1cIikudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBjb3B5T2ZUZXh0ID0gdGFnVXBkYXRlQnV0dG9uLmh0bWwoKTtcbiAgICAgICAgICAgIC8vVE9ETyBpbiBmdXR1cmUgd2UgbmVlZCB0byBhZGQgSldUIDopXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe25hbWU6IHRhZ05hbWV9KSxcbiAgICAgICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgdXJsOiB1cGRhdGVUYWdGb3JtLmRhdGEoJ3RhZy11cGRhdGUtYXBpLXVybCcpLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIiA6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1VwZGF0ZUJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFnRm9ybS50cmlnZ2VyKCdyZXNldCcpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0YWdVcGRhdGVCdXR0b24uaHRtbChjb3B5T2ZUZXh0KTtcbiAgICAgICAgICAgICAgICBhbGVydCgnU29tZXRoaW5nIHdlbnQgd3Jvbmc6JyArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCArICcgdHJ5IGFnYWluJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9