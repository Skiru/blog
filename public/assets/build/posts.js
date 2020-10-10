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
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);



jquery__WEBPACK_IMPORTED_MODULE_2__(document).ready(function () {
  var tableBody = jquery__WEBPACK_IMPORTED_MODULE_2__('#js-post-table-body');
  var postsApiUrl = tableBody.data('posts-api-url'); //TODO in future we need to add JWT :)

  var request = jquery__WEBPACK_IMPORTED_MODULE_2__["ajax"]({
    method: 'GET',
    url: postsApiUrl,
    headers: {
      "Accept": "application/json"
    } // beforeSend: function () {
    //     tagsCreateButton.html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
    // }

  });
  request.done(function (response) {
    response.data.forEach(function (element) {
      return render(element);
    });
  });
  request.fail(function (response) {
    alert('Something went wrong:' + response.responseText + ' try again');
  });

  function render(post) {
    tableBody.append('<tr>' + '<td class="list-image"> <img src="' + post.headerImage + '" class="img-fluid"></td>' + '<td>' + post.title + '</td>' + '<td>' + post.author + '</td>' + '<td>' + post.published + '</td>' + '<td>' + post.createdAt + '</td>' + '<td> Update / Delete </td>' + '</tr>');
  }
});

/***/ })

},[["./assets/js/posts.js","runtime","vendors~app~posts~tags","vendors~posts~tags"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcG9zdHMuanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ0YWJsZUJvZHkiLCJwb3N0c0FwaVVybCIsImRhdGEiLCJyZXF1ZXN0IiwibWV0aG9kIiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJyZXNwb25zZSIsImZvckVhY2giLCJlbGVtZW50IiwicmVuZGVyIiwiZmFpbCIsImFsZXJ0IiwicmVzcG9uc2VUZXh0IiwicG9zdCIsImFwcGVuZCIsImhlYWRlckltYWdlIiwidGl0bGUiLCJhdXRob3IiLCJwdWJsaXNoZWQiLCJjcmVhdGVkQXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBQSxtQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFZO0FBQzFCLE1BQU1DLFNBQVMsR0FBR0gsbUNBQUMsQ0FBQyxxQkFBRCxDQUFuQjtBQUNBLE1BQU1JLFdBQVcsR0FBR0QsU0FBUyxDQUFDRSxJQUFWLENBQWUsZUFBZixDQUFwQixDQUYwQixDQUkxQjs7QUFDQSxNQUFNQyxPQUFPLEdBQUdOLDJDQUFBLENBQU87QUFDbkJPLFVBQU0sRUFBRSxLQURXO0FBRW5CQyxPQUFHLEVBQUVKLFdBRmM7QUFHbkJLLFdBQU8sRUFBRTtBQUNMLGdCQUFXO0FBRE4sS0FIVSxDQU1uQjtBQUNBO0FBQ0E7O0FBUm1CLEdBQVAsQ0FBaEI7QUFXQUgsU0FBTyxDQUFDSSxJQUFSLENBQWEsVUFBVUMsUUFBVixFQUFvQjtBQUM5QkEsWUFBUSxDQUFDTixJQUFULENBQWNPLE9BQWQsQ0FBc0IsVUFBQUMsT0FBTztBQUFBLGFBQUlDLE1BQU0sQ0FBQ0QsT0FBRCxDQUFWO0FBQUEsS0FBN0I7QUFDRixHQUZEO0FBSUFQLFNBQU8sQ0FBQ1MsSUFBUixDQUFhLFVBQVVKLFFBQVYsRUFBb0I7QUFDN0JLLFNBQUssQ0FBQywwQkFBMEJMLFFBQVEsQ0FBQ00sWUFBbkMsR0FBa0QsWUFBbkQsQ0FBTDtBQUNILEdBRkQ7O0FBSUEsV0FBU0gsTUFBVCxDQUFnQkksSUFBaEIsRUFBc0I7QUFDbEJmLGFBQVMsQ0FBQ2dCLE1BQVYsQ0FDSSxTQUNJLG9DQURKLEdBQzJDRCxJQUFJLENBQUNFLFdBRGhELEdBQzhELDJCQUQ5RCxHQUVJLE1BRkosR0FFYUYsSUFBSSxDQUFDRyxLQUZsQixHQUUwQixPQUYxQixHQUdJLE1BSEosR0FHYUgsSUFBSSxDQUFDSSxNQUhsQixHQUcyQixPQUgzQixHQUlJLE1BSkosR0FJYUosSUFBSSxDQUFDSyxTQUpsQixHQUk4QixPQUo5QixHQUtJLE1BTEosR0FLYUwsSUFBSSxDQUFDTSxTQUxsQixHQUs4QixPQUw5QixHQU1JLDRCQU5KLEdBT0EsT0FSSjtBQVVIO0FBQ0osQ0FwQ0QsRSIsImZpbGUiOiJwb3N0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzICQgZnJvbSAnanF1ZXJ5JztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRhYmxlQm9keSA9ICQoJyNqcy1wb3N0LXRhYmxlLWJvZHknKTtcbiAgICBjb25zdCBwb3N0c0FwaVVybCA9IHRhYmxlQm9keS5kYXRhKCdwb3N0cy1hcGktdXJsJyk7XG5cbiAgICAvL1RPRE8gaW4gZnV0dXJlIHdlIG5lZWQgdG8gYWRkIEpXVCA6KVxuICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IHBvc3RzQXBpVXJsLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkFjY2VwdFwiIDogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgfVxuICAgICAgICAvLyBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICAgICB0YWdzQ3JlYXRlQnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsZHMtZWxsaXBzaXNcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAvLyB9XG4gICAgfSk7XG5cbiAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgcmVzcG9uc2UuZGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4gcmVuZGVyKGVsZW1lbnQpKVxuICAgIH0pO1xuXG4gICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBhbGVydCgnU29tZXRoaW5nIHdlbnQgd3Jvbmc6JyArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCArICcgdHJ5IGFnYWluJyk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXIocG9zdCkge1xuICAgICAgICB0YWJsZUJvZHkuYXBwZW5kKFxuICAgICAgICAgICAgJzx0cj4nICtcbiAgICAgICAgICAgICAgICAnPHRkIGNsYXNzPVwibGlzdC1pbWFnZVwiPiA8aW1nIHNyYz1cIicgKyBwb3N0LmhlYWRlckltYWdlICsgJ1wiIGNsYXNzPVwiaW1nLWZsdWlkXCI+PC90ZD4nICtcbiAgICAgICAgICAgICAgICAnPHRkPicgKyBwb3N0LnRpdGxlICsgJzwvdGQ+JyArXG4gICAgICAgICAgICAgICAgJzx0ZD4nICsgcG9zdC5hdXRob3IgKyAnPC90ZD4nICtcbiAgICAgICAgICAgICAgICAnPHRkPicgKyBwb3N0LnB1Ymxpc2hlZCArICc8L3RkPicgK1xuICAgICAgICAgICAgICAgICc8dGQ+JyArIHBvc3QuY3JlYXRlZEF0ICsgJzwvdGQ+JyArXG4gICAgICAgICAgICAgICAgJzx0ZD4gVXBkYXRlIC8gRGVsZXRlIDwvdGQ+JyArXG4gICAgICAgICAgICAnPC90cj4nXG4gICAgICAgICk7XG4gICAgfVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==