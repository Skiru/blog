(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["posts"],{

/***/ "./assets/js/posts.js":
/*!****************************!*\
  !*** ./assets/js/posts.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.values */ "./node_modules/core-js/modules/es.object.values.js");
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);





(function () {
  'use strict';

  var tableBody = jquery__WEBPACK_IMPORTED_MODULE_3__('#js-post-table-body');
  var postsApiUrl = tableBody.data('posts-api-url');

  window.updatePost = function (uuid) {
    window.location.href = '/dashboard/posts/' + uuid + '/update';
  };

  window.deletePost = function (uuid) {
    if (confirm('Do you really want to delete article?')) {
      var request = jquery__WEBPACK_IMPORTED_MODULE_3__["ajax"]({
        method: 'DELETE',
        url: postsApiUrl + '/' + uuid,
        headers: {
          "Accept": "application/json"
        }
      });
      request.done(function (response) {
        if (response.success === true) {
          alert('Post has been deleted successfully');
          window.location.reload();
        }
      });
      request.fail(function (response) {
        alert('Could not delete post:' + response.responseText + ' try again');
      });
    }
  };

  function render(post) {
    var uuid = '\'' + post.uuid + '\'';
    var updateButton = '<button onclick="updatePost(' + uuid + ')" class="btn btn-yellow">Update</button>';
    var deleteButton = '<button onclick="deletePost(' + uuid + ')" class="btn btn-danger">Delete</button>';
    tableBody.append('<tr>' + '<td class="list-image"> <img src="' + post.header_image + '" class="img-fluid"></td>' + '<td>' + post.title + '</td>' + '<td>' + post.author + '</td>' + '<td>' + post.category + '</td>' + '<td>' + Object.values(post.tags) + '</td>' + '<td>' + post.published + '</td>' + '<td>' + post.read_time + '</td>' + '<td>' + post.created_at + '</td>' + '<td>' + post.updated_at + '</td>' + '<td> ' + updateButton + ' </td>' + '<td> ' + deleteButton + ' </td>' + '</tr>');
  }

  jquery__WEBPACK_IMPORTED_MODULE_3__(document).ready(function () {
    var request = jquery__WEBPACK_IMPORTED_MODULE_3__["ajax"]({
      method: 'GET',
      url: postsApiUrl,
      headers: {
        "Accept": "application/json"
      }
    });
    request.done(function (response) {
      response.data.forEach(function (element) {
        return render(element, tableBody);
      });
    });
    request.fail(function (response) {
      alert('Something went wrong:' + response.responseText + ' try again');
    });
  });
})();

/***/ })

},[["./assets/js/posts.js","runtime","vendors~app~categories~post_update~posts~tags","vendors~posts"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcG9zdHMuanMiXSwibmFtZXMiOlsidGFibGVCb2R5IiwiJCIsInBvc3RzQXBpVXJsIiwiZGF0YSIsIndpbmRvdyIsInVwZGF0ZVBvc3QiLCJ1dWlkIiwibG9jYXRpb24iLCJocmVmIiwiZGVsZXRlUG9zdCIsImNvbmZpcm0iLCJyZXF1ZXN0IiwibWV0aG9kIiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJhbGVydCIsInJlbG9hZCIsImZhaWwiLCJyZXNwb25zZVRleHQiLCJyZW5kZXIiLCJwb3N0IiwidXBkYXRlQnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwiYXBwZW5kIiwiaGVhZGVyX2ltYWdlIiwidGl0bGUiLCJhdXRob3IiLCJjYXRlZ29yeSIsIk9iamVjdCIsInZhbHVlcyIsInRhZ3MiLCJwdWJsaXNoZWQiLCJyZWFkX3RpbWUiLCJjcmVhdGVkX2F0IiwidXBkYXRlZF9hdCIsImRvY3VtZW50IiwicmVhZHkiLCJmb3JFYWNoIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBLENBQUMsWUFBVTtBQUNQOztBQUVBLE1BQU1BLFNBQVMsR0FBR0MsbUNBQUMsQ0FBQyxxQkFBRCxDQUFuQjtBQUNBLE1BQU1DLFdBQVcsR0FBR0YsU0FBUyxDQUFDRyxJQUFWLENBQWUsZUFBZixDQUFwQjs7QUFFQUMsUUFBTSxDQUFDQyxVQUFQLEdBQW9CLFVBQVVDLElBQVYsRUFBZ0I7QUFDaENGLFVBQU0sQ0FBQ0csUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsc0JBQXNCRixJQUF0QixHQUE2QixTQUFwRDtBQUNILEdBRkQ7O0FBSUFGLFFBQU0sQ0FBQ0ssVUFBUCxHQUFvQixVQUFTSCxJQUFULEVBQWU7QUFDL0IsUUFBSUksT0FBTyxDQUFDLHVDQUFELENBQVgsRUFBc0Q7QUFDbEQsVUFBTUMsT0FBTyxHQUFHViwyQ0FBQSxDQUFPO0FBQ25CVyxjQUFNLEVBQUUsUUFEVztBQUVuQkMsV0FBRyxFQUFFWCxXQUFXLEdBQUcsR0FBZCxHQUFvQkksSUFGTjtBQUduQlEsZUFBTyxFQUFFO0FBQ0wsb0JBQVc7QUFETjtBQUhVLE9BQVAsQ0FBaEI7QUFRQUgsYUFBTyxDQUFDSSxJQUFSLENBQWEsVUFBVUMsUUFBVixFQUFvQjtBQUM3QixZQUFJQSxRQUFRLENBQUNDLE9BQVQsS0FBcUIsSUFBekIsRUFBK0I7QUFDM0JDLGVBQUssQ0FBQyxvQ0FBRCxDQUFMO0FBQ0FkLGdCQUFNLENBQUNHLFFBQVAsQ0FBZ0JZLE1BQWhCO0FBQ0g7QUFDSixPQUxEO0FBT0FSLGFBQU8sQ0FBQ1MsSUFBUixDQUFhLFVBQVVKLFFBQVYsRUFBb0I7QUFDN0JFLGFBQUssQ0FBQywyQkFBMkJGLFFBQVEsQ0FBQ0ssWUFBcEMsR0FBbUQsWUFBcEQsQ0FBTDtBQUNILE9BRkQ7QUFHSDtBQUNKLEdBckJEOztBQXVCQSxXQUFTQyxNQUFULENBQWdCQyxJQUFoQixFQUFzQjtBQUNsQixRQUFJakIsSUFBSSxHQUFHLE9BQU9pQixJQUFJLENBQUNqQixJQUFaLEdBQW1CLElBQTlCO0FBQ0EsUUFBSWtCLFlBQVksR0FBRyxpQ0FBZ0NsQixJQUFoQyxHQUF1QywyQ0FBMUQ7QUFDQSxRQUFJbUIsWUFBWSxHQUFHLGlDQUFnQ25CLElBQWhDLEdBQXVDLDJDQUExRDtBQUVBTixhQUFTLENBQUMwQixNQUFWLENBQ0ksU0FDQSxvQ0FEQSxHQUN1Q0gsSUFBSSxDQUFDSSxZQUQ1QyxHQUMyRCwyQkFEM0QsR0FFQSxNQUZBLEdBRVNKLElBQUksQ0FBQ0ssS0FGZCxHQUVzQixPQUZ0QixHQUdBLE1BSEEsR0FHU0wsSUFBSSxDQUFDTSxNQUhkLEdBR3VCLE9BSHZCLEdBSUEsTUFKQSxHQUlTTixJQUFJLENBQUNPLFFBSmQsR0FJeUIsT0FKekIsR0FLQSxNQUxBLEdBS1NDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjVCxJQUFJLENBQUNVLElBQW5CLENBTFQsR0FLb0MsT0FMcEMsR0FNQSxNQU5BLEdBTVNWLElBQUksQ0FBQ1csU0FOZCxHQU0wQixPQU4xQixHQU9BLE1BUEEsR0FPU1gsSUFBSSxDQUFDWSxTQVBkLEdBTzBCLE9BUDFCLEdBUUEsTUFSQSxHQVFTWixJQUFJLENBQUNhLFVBUmQsR0FRMkIsT0FSM0IsR0FTQSxNQVRBLEdBU1NiLElBQUksQ0FBQ2MsVUFUZCxHQVMyQixPQVQzQixHQVVBLE9BVkEsR0FVVWIsWUFWVixHQVV5QixRQVZ6QixHQVdBLE9BWEEsR0FXVUMsWUFYVixHQVd5QixRQVh6QixHQVlBLE9BYko7QUFlSDs7QUFFRHhCLHFDQUFDLENBQUNxQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFZO0FBQzFCLFFBQU01QixPQUFPLEdBQUdWLDJDQUFBLENBQU87QUFDbkJXLFlBQU0sRUFBRSxLQURXO0FBRW5CQyxTQUFHLEVBQUVYLFdBRmM7QUFHbkJZLGFBQU8sRUFBRTtBQUNMLGtCQUFXO0FBRE47QUFIVSxLQUFQLENBQWhCO0FBUUFILFdBQU8sQ0FBQ0ksSUFBUixDQUFhLFVBQVVDLFFBQVYsRUFBb0I7QUFDN0JBLGNBQVEsQ0FBQ2IsSUFBVCxDQUFjcUMsT0FBZCxDQUFzQixVQUFBQyxPQUFPO0FBQUEsZUFBSW5CLE1BQU0sQ0FBQ21CLE9BQUQsRUFBVXpDLFNBQVYsQ0FBVjtBQUFBLE9BQTdCO0FBQ0gsS0FGRDtBQUlBVyxXQUFPLENBQUNTLElBQVIsQ0FBYSxVQUFVSixRQUFWLEVBQW9CO0FBQzdCRSxXQUFLLENBQUMsMEJBQTBCRixRQUFRLENBQUNLLFlBQW5DLEdBQWtELFlBQW5ELENBQUw7QUFDSCxLQUZEO0FBR0gsR0FoQkQ7QUFpQkgsQ0F4RUQsSSIsImZpbGUiOiJwb3N0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzICQgZnJvbSAnanF1ZXJ5JztcblxuKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgY29uc3QgdGFibGVCb2R5ID0gJCgnI2pzLXBvc3QtdGFibGUtYm9keScpO1xuICAgIGNvbnN0IHBvc3RzQXBpVXJsID0gdGFibGVCb2R5LmRhdGEoJ3Bvc3RzLWFwaS11cmwnKTtcblxuICAgIHdpbmRvdy51cGRhdGVQb3N0ID0gZnVuY3Rpb24gKHV1aWQpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Rhc2hib2FyZC9wb3N0cy8nICsgdXVpZCArICcvdXBkYXRlJztcbiAgICB9O1xuXG4gICAgd2luZG93LmRlbGV0ZVBvc3QgPSBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIGlmIChjb25maXJtKCdEbyB5b3UgcmVhbGx5IHdhbnQgdG8gZGVsZXRlIGFydGljbGU/JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgdXJsOiBwb3N0c0FwaVVybCArICcvJyArIHV1aWQsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkFjY2VwdFwiIDogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVxdWVzdC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQb3N0IGhhcyBiZWVuIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdDb3VsZCBub3QgZGVsZXRlIHBvc3Q6JyArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCArICcgdHJ5IGFnYWluJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXIocG9zdCkge1xuICAgICAgICBsZXQgdXVpZCA9ICdcXCcnICsgcG9zdC51dWlkICsgJ1xcJyc7XG4gICAgICAgIGxldCB1cGRhdGVCdXR0b24gPSAnPGJ1dHRvbiBvbmNsaWNrPVwidXBkYXRlUG9zdCgnKyB1dWlkICsgJylcIiBjbGFzcz1cImJ0biBidG4teWVsbG93XCI+VXBkYXRlPC9idXR0b24+JztcbiAgICAgICAgbGV0IGRlbGV0ZUJ1dHRvbiA9ICc8YnV0dG9uIG9uY2xpY2s9XCJkZWxldGVQb3N0KCcrIHV1aWQgKyAnKVwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj4nO1xuXG4gICAgICAgIHRhYmxlQm9keS5hcHBlbmQoXG4gICAgICAgICAgICAnPHRyPicgK1xuICAgICAgICAgICAgJzx0ZCBjbGFzcz1cImxpc3QtaW1hZ2VcIj4gPGltZyBzcmM9XCInICsgcG9zdC5oZWFkZXJfaW1hZ2UgKyAnXCIgY2xhc3M9XCJpbWctZmx1aWRcIj48L3RkPicgK1xuICAgICAgICAgICAgJzx0ZD4nICsgcG9zdC50aXRsZSArICc8L3RkPicgK1xuICAgICAgICAgICAgJzx0ZD4nICsgcG9zdC5hdXRob3IgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICc8dGQ+JyArIHBvc3QuY2F0ZWdvcnkgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICc8dGQ+JyArIE9iamVjdC52YWx1ZXMocG9zdC50YWdzKSArICc8L3RkPicgK1xuICAgICAgICAgICAgJzx0ZD4nICsgcG9zdC5wdWJsaXNoZWQgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICc8dGQ+JyArIHBvc3QucmVhZF90aW1lICsgJzwvdGQ+JyArXG4gICAgICAgICAgICAnPHRkPicgKyBwb3N0LmNyZWF0ZWRfYXQgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICc8dGQ+JyArIHBvc3QudXBkYXRlZF9hdCArICc8L3RkPicgK1xuICAgICAgICAgICAgJzx0ZD4gJyArIHVwZGF0ZUJ1dHRvbiArICcgPC90ZD4nICtcbiAgICAgICAgICAgICc8dGQ+ICcgKyBkZWxldGVCdXR0b24gKyAnIDwvdGQ+JyArXG4gICAgICAgICAgICAnPC90cj4nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IHBvc3RzQXBpVXJsLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQWNjZXB0XCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLmZvckVhY2goZWxlbWVudCA9PiByZW5kZXIoZWxlbWVudCwgdGFibGVCb2R5KSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgYWxlcnQoJ1NvbWV0aGluZyB3ZW50IHdyb25nOicgKyByZXNwb25zZS5yZXNwb25zZVRleHQgKyAnIHRyeSBhZ2FpbicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==