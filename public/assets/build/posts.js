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
      var _request = jquery__WEBPACK_IMPORTED_MODULE_3__["ajax"]({
        method: 'DELETE',
        url: postsApiUrl + '/' + uuid,
        headers: {
          "Accept": "application/json"
        }
      });

      _request.done(function (response) {
        if (response.success === true) {
          alert('Post has been deleted successfully');
          window.location.reload();
        }
      });

      _request.fail(function (response) {
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
})();

/***/ })

},[["./assets/js/posts.js","runtime","vendors~app~categories~post_update~posts~tags","vendors~posts"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcG9zdHMuanMiXSwibmFtZXMiOlsidGFibGVCb2R5IiwiJCIsInBvc3RzQXBpVXJsIiwiZGF0YSIsIndpbmRvdyIsInVwZGF0ZVBvc3QiLCJ1dWlkIiwibG9jYXRpb24iLCJocmVmIiwiZGVsZXRlUG9zdCIsImNvbmZpcm0iLCJyZXF1ZXN0IiwibWV0aG9kIiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJhbGVydCIsInJlbG9hZCIsImZhaWwiLCJyZXNwb25zZVRleHQiLCJyZW5kZXIiLCJwb3N0IiwidXBkYXRlQnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwiYXBwZW5kIiwiaGVhZGVyX2ltYWdlIiwidGl0bGUiLCJhdXRob3IiLCJjYXRlZ29yeSIsIk9iamVjdCIsInZhbHVlcyIsInRhZ3MiLCJwdWJsaXNoZWQiLCJyZWFkX3RpbWUiLCJjcmVhdGVkX2F0IiwidXBkYXRlZF9hdCIsImZvckVhY2giLCJlbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsQ0FBQyxZQUFVO0FBQ1A7O0FBRUEsTUFBTUEsU0FBUyxHQUFHQyxtQ0FBQyxDQUFDLHFCQUFELENBQW5CO0FBQ0EsTUFBTUMsV0FBVyxHQUFHRixTQUFTLENBQUNHLElBQVYsQ0FBZSxlQUFmLENBQXBCOztBQUVBQyxRQUFNLENBQUNDLFVBQVAsR0FBb0IsVUFBVUMsSUFBVixFQUFnQjtBQUNoQ0YsVUFBTSxDQUFDRyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixzQkFBc0JGLElBQXRCLEdBQTZCLFNBQXBEO0FBQ0gsR0FGRDs7QUFJQUYsUUFBTSxDQUFDSyxVQUFQLEdBQW9CLFVBQVNILElBQVQsRUFBZTtBQUMvQixRQUFJSSxPQUFPLENBQUMsdUNBQUQsQ0FBWCxFQUFzRDtBQUNsRCxVQUFNQyxRQUFPLEdBQUdWLDJDQUFBLENBQU87QUFDbkJXLGNBQU0sRUFBRSxRQURXO0FBRW5CQyxXQUFHLEVBQUVYLFdBQVcsR0FBRyxHQUFkLEdBQW9CSSxJQUZOO0FBR25CUSxlQUFPLEVBQUU7QUFDTCxvQkFBVztBQUROO0FBSFUsT0FBUCxDQUFoQjs7QUFRQUgsY0FBTyxDQUFDSSxJQUFSLENBQWEsVUFBVUMsUUFBVixFQUFvQjtBQUM3QixZQUFJQSxRQUFRLENBQUNDLE9BQVQsS0FBcUIsSUFBekIsRUFBK0I7QUFDM0JDLGVBQUssQ0FBQyxvQ0FBRCxDQUFMO0FBQ0FkLGdCQUFNLENBQUNHLFFBQVAsQ0FBZ0JZLE1BQWhCO0FBQ0g7QUFDSixPQUxEOztBQU9BUixjQUFPLENBQUNTLElBQVIsQ0FBYSxVQUFVSixRQUFWLEVBQW9CO0FBQzdCRSxhQUFLLENBQUMsMkJBQTJCRixRQUFRLENBQUNLLFlBQXBDLEdBQW1ELFlBQXBELENBQUw7QUFDSCxPQUZEO0FBR0g7QUFDSixHQXJCRDs7QUF1QkEsV0FBU0MsTUFBVCxDQUFnQkMsSUFBaEIsRUFBc0I7QUFDbEIsUUFBSWpCLElBQUksR0FBRyxPQUFPaUIsSUFBSSxDQUFDakIsSUFBWixHQUFtQixJQUE5QjtBQUNBLFFBQUlrQixZQUFZLEdBQUcsaUNBQWdDbEIsSUFBaEMsR0FBdUMsMkNBQTFEO0FBQ0EsUUFBSW1CLFlBQVksR0FBRyxpQ0FBZ0NuQixJQUFoQyxHQUF1QywyQ0FBMUQ7QUFFQU4sYUFBUyxDQUFDMEIsTUFBVixDQUNJLFNBQ0Esb0NBREEsR0FDdUNILElBQUksQ0FBQ0ksWUFENUMsR0FDMkQsMkJBRDNELEdBRUEsTUFGQSxHQUVTSixJQUFJLENBQUNLLEtBRmQsR0FFc0IsT0FGdEIsR0FHQSxNQUhBLEdBR1NMLElBQUksQ0FBQ00sTUFIZCxHQUd1QixPQUh2QixHQUlBLE1BSkEsR0FJU04sSUFBSSxDQUFDTyxRQUpkLEdBSXlCLE9BSnpCLEdBS0EsTUFMQSxHQUtTQyxNQUFNLENBQUNDLE1BQVAsQ0FBY1QsSUFBSSxDQUFDVSxJQUFuQixDQUxULEdBS29DLE9BTHBDLEdBTUEsTUFOQSxHQU1TVixJQUFJLENBQUNXLFNBTmQsR0FNMEIsT0FOMUIsR0FPQSxNQVBBLEdBT1NYLElBQUksQ0FBQ1ksU0FQZCxHQU8wQixPQVAxQixHQVFBLE1BUkEsR0FRU1osSUFBSSxDQUFDYSxVQVJkLEdBUTJCLE9BUjNCLEdBU0EsTUFUQSxHQVNTYixJQUFJLENBQUNjLFVBVGQsR0FTMkIsT0FUM0IsR0FVQSxPQVZBLEdBVVViLFlBVlYsR0FVeUIsUUFWekIsR0FXQSxPQVhBLEdBV1VDLFlBWFYsR0FXeUIsUUFYekIsR0FZQSxPQWJKO0FBZUg7O0FBRUQsTUFBTWQsT0FBTyxHQUFHViwyQ0FBQSxDQUFPO0FBQ25CVyxVQUFNLEVBQUUsS0FEVztBQUVuQkMsT0FBRyxFQUFFWCxXQUZjO0FBR25CWSxXQUFPLEVBQUU7QUFDTCxnQkFBVztBQUROO0FBSFUsR0FBUCxDQUFoQjtBQVFBSCxTQUFPLENBQUNJLElBQVIsQ0FBYSxVQUFVQyxRQUFWLEVBQW9CO0FBQzdCQSxZQUFRLENBQUNiLElBQVQsQ0FBY21DLE9BQWQsQ0FBc0IsVUFBQUMsT0FBTztBQUFBLGFBQUlqQixNQUFNLENBQUNpQixPQUFELEVBQVV2QyxTQUFWLENBQVY7QUFBQSxLQUE3QjtBQUNILEdBRkQ7QUFJQVcsU0FBTyxDQUFDUyxJQUFSLENBQWEsVUFBVUosUUFBVixFQUFvQjtBQUM3QkUsU0FBSyxDQUFDLDBCQUEwQkYsUUFBUSxDQUFDSyxZQUFuQyxHQUFrRCxZQUFuRCxDQUFMO0FBQ0gsR0FGRDtBQUlILENBdkVELEkiLCJmaWxlIjoicG9zdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyAkIGZyb20gJ2pxdWVyeSc7XG5cbihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGNvbnN0IHRhYmxlQm9keSA9ICQoJyNqcy1wb3N0LXRhYmxlLWJvZHknKTtcbiAgICBjb25zdCBwb3N0c0FwaVVybCA9IHRhYmxlQm9keS5kYXRhKCdwb3N0cy1hcGktdXJsJyk7XG5cbiAgICB3aW5kb3cudXBkYXRlUG9zdCA9IGZ1bmN0aW9uICh1dWlkKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQvcG9zdHMvJyArIHV1aWQgKyAnL3VwZGF0ZSc7XG4gICAgfTtcblxuICAgIHdpbmRvdy5kZWxldGVQb3N0ID0gZnVuY3Rpb24odXVpZCkge1xuICAgICAgICBpZiAoY29uZmlybSgnRG8geW91IHJlYWxseSB3YW50IHRvIGRlbGV0ZSBhcnRpY2xlPycpKSB7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIHVybDogcG9zdHNBcGlVcmwgKyAnLycgKyB1dWlkLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIiA6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnUG9zdCBoYXMgYmVlbiBkZWxldGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnQ291bGQgbm90IGRlbGV0ZSBwb3N0OicgKyByZXNwb25zZS5yZXNwb25zZVRleHQgKyAnIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyKHBvc3QpIHtcbiAgICAgICAgbGV0IHV1aWQgPSAnXFwnJyArIHBvc3QudXVpZCArICdcXCcnO1xuICAgICAgICBsZXQgdXBkYXRlQnV0dG9uID0gJzxidXR0b24gb25jbGljaz1cInVwZGF0ZVBvc3QoJysgdXVpZCArICcpXCIgY2xhc3M9XCJidG4gYnRuLXllbGxvd1wiPlVwZGF0ZTwvYnV0dG9uPic7XG4gICAgICAgIGxldCBkZWxldGVCdXR0b24gPSAnPGJ1dHRvbiBvbmNsaWNrPVwiZGVsZXRlUG9zdCgnKyB1dWlkICsgJylcIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+JztcblxuICAgICAgICB0YWJsZUJvZHkuYXBwZW5kKFxuICAgICAgICAgICAgJzx0cj4nICtcbiAgICAgICAgICAgICc8dGQgY2xhc3M9XCJsaXN0LWltYWdlXCI+IDxpbWcgc3JjPVwiJyArIHBvc3QuaGVhZGVyX2ltYWdlICsgJ1wiIGNsYXNzPVwiaW1nLWZsdWlkXCI+PC90ZD4nICtcbiAgICAgICAgICAgICc8dGQ+JyArIHBvc3QudGl0bGUgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICc8dGQ+JyArIHBvc3QuYXV0aG9yICsgJzwvdGQ+JyArXG4gICAgICAgICAgICAnPHRkPicgKyBwb3N0LmNhdGVnb3J5ICsgJzwvdGQ+JyArXG4gICAgICAgICAgICAnPHRkPicgKyBPYmplY3QudmFsdWVzKHBvc3QudGFncykgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICc8dGQ+JyArIHBvc3QucHVibGlzaGVkICsgJzwvdGQ+JyArXG4gICAgICAgICAgICAnPHRkPicgKyBwb3N0LnJlYWRfdGltZSArICc8L3RkPicgK1xuICAgICAgICAgICAgJzx0ZD4nICsgcG9zdC5jcmVhdGVkX2F0ICsgJzwvdGQ+JyArXG4gICAgICAgICAgICAnPHRkPicgKyBwb3N0LnVwZGF0ZWRfYXQgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICc8dGQ+ICcgKyB1cGRhdGVCdXR0b24gKyAnIDwvdGQ+JyArXG4gICAgICAgICAgICAnPHRkPiAnICsgZGVsZXRlQnV0dG9uICsgJyA8L3RkPicgK1xuICAgICAgICAgICAgJzwvdHI+J1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IHBvc3RzQXBpVXJsLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkFjY2VwdFwiIDogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVxdWVzdC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXNwb25zZS5kYXRhLmZvckVhY2goZWxlbWVudCA9PiByZW5kZXIoZWxlbWVudCwgdGFibGVCb2R5KSlcbiAgICB9KTtcblxuICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgYWxlcnQoJ1NvbWV0aGluZyB3ZW50IHdyb25nOicgKyByZXNwb25zZS5yZXNwb25zZVRleHQgKyAnIHRyeSBhZ2FpbicpO1xuICAgIH0pO1xuXG59KSgpOyJdLCJzb3VyY2VSb290IjoiIn0=