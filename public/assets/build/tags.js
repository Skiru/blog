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
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);


var tagsForm = jquery__WEBPACK_IMPORTED_MODULE_1__("#js-tags-form");
var tagsApiUrl = tagsForm.data("tags-api-url");
var tagsCreateButton = jquery__WEBPACK_IMPORTED_MODULE_1__("#js-form-tags-create-button"); // const tagsModalClose = $("#js-tags-modal-close");

tagsCreateButton.click(function (e) {
  var tagName = tagsForm.find("[name=tagName]").val();

  if ("" === tagName) {
    alert('Fill the name of the tag first!');
    return false;
  }

  var copyOfText = tagsCreateButton.html();
  var request = jquery__WEBPACK_IMPORTED_MODULE_1__["ajax"]({
    method: "POST",
    url: tagsApiUrl,
    data: JSON.stringify({
      name: tagName
    }),
    dataType: "json",
    contentType: 'application/json; charset=utf-8' // beforeSend: function () {
    //     tagsCreateButton.html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
    // }

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

/***/ })

},[["./assets/js/tags.js","runtime","vendors~app~tags","vendors~tags"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGFncy5qcyJdLCJuYW1lcyI6WyJ0YWdzRm9ybSIsIiQiLCJ0YWdzQXBpVXJsIiwiZGF0YSIsInRhZ3NDcmVhdGVCdXR0b24iLCJjbGljayIsImUiLCJ0YWdOYW1lIiwiZmluZCIsInZhbCIsImFsZXJ0IiwiY29weU9mVGV4dCIsImh0bWwiLCJyZXF1ZXN0IiwibWV0aG9kIiwidXJsIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJkYXRhVHlwZSIsImNvbnRlbnRUeXBlIiwiZG9uZSIsInJlc3BvbnNlIiwidHJpZ2dlciIsImxvY2F0aW9uIiwicmVsb2FkIiwiZmFpbCIsInJlc3BvbnNlVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBTUEsUUFBUSxHQUFHQyxtQ0FBQyxDQUFDLGVBQUQsQ0FBbEI7QUFDQSxJQUFNQyxVQUFVLEdBQUdGLFFBQVEsQ0FBQ0csSUFBVCxDQUFjLGNBQWQsQ0FBbkI7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBR0gsbUNBQUMsQ0FBQyw2QkFBRCxDQUExQixDLENBQ0E7O0FBQ0FHLGdCQUFnQixDQUFDQyxLQUFqQixDQUF1QixVQUFVQyxDQUFWLEVBQWE7QUFDaEMsTUFBTUMsT0FBTyxHQUFHUCxRQUFRLENBQUNRLElBQVQsQ0FBYyxnQkFBZCxFQUFnQ0MsR0FBaEMsRUFBaEI7O0FBRUEsTUFBSSxPQUFPRixPQUFYLEVBQW9CO0FBQ2hCRyxTQUFLLENBQUMsaUNBQUQsQ0FBTDtBQUNBLFdBQU8sS0FBUDtBQUNIOztBQUVELE1BQU1DLFVBQVUsR0FBR1AsZ0JBQWdCLENBQUNRLElBQWpCLEVBQW5CO0FBRUEsTUFBTUMsT0FBTyxHQUFHWiwyQ0FBQSxDQUFPO0FBQ25CYSxVQUFNLEVBQUUsTUFEVztBQUVuQkMsT0FBRyxFQUFFYixVQUZjO0FBR25CQyxRQUFJLEVBQUVhLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQUNDLFVBQUksRUFBRVg7QUFBUCxLQUFmLENBSGE7QUFJbkJZLFlBQVEsRUFBRSxNQUpTO0FBS25CQyxlQUFXLEVBQUUsaUNBTE0sQ0FNbkI7QUFDQTtBQUNBOztBQVJtQixHQUFQLENBQWhCO0FBV0FQLFNBQU8sQ0FBQ1EsSUFBUixDQUFhLFVBQVVDLFFBQVYsRUFBb0I7QUFDN0J0QixZQUFRLENBQUN1QixPQUFULENBQWlCLE9BQWpCO0FBQ0FDLFlBQVEsQ0FBQ0MsTUFBVDtBQUNILEdBSEQ7QUFLQVosU0FBTyxDQUFDYSxJQUFSLENBQWEsVUFBVUosUUFBVixFQUFvQjtBQUM3QmxCLG9CQUFnQixDQUFDUSxJQUFqQixDQUFzQkQsVUFBdEI7QUFDQUQsU0FBSyxDQUFDLDBCQUEwQlksUUFBUSxDQUFDSyxZQUFuQyxHQUFrRCxZQUFuRCxDQUFMO0FBQ0gsR0FIRDtBQUtBLFNBQU8sS0FBUDtBQUNILENBaENELEUiLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzICQgZnJvbSAnanF1ZXJ5JztcblxuY29uc3QgdGFnc0Zvcm0gPSAkKFwiI2pzLXRhZ3MtZm9ybVwiKTtcbmNvbnN0IHRhZ3NBcGlVcmwgPSB0YWdzRm9ybS5kYXRhKFwidGFncy1hcGktdXJsXCIpO1xuY29uc3QgdGFnc0NyZWF0ZUJ1dHRvbiA9ICQoXCIjanMtZm9ybS10YWdzLWNyZWF0ZS1idXR0b25cIik7XG4vLyBjb25zdCB0YWdzTW9kYWxDbG9zZSA9ICQoXCIjanMtdGFncy1tb2RhbC1jbG9zZVwiKTtcbnRhZ3NDcmVhdGVCdXR0b24uY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gdGFnc0Zvcm0uZmluZChcIltuYW1lPXRhZ05hbWVdXCIpLnZhbCgpO1xuXG4gICAgaWYgKFwiXCIgPT09IHRhZ05hbWUpIHtcbiAgICAgICAgYWxlcnQoJ0ZpbGwgdGhlIG5hbWUgb2YgdGhlIHRhZyBmaXJzdCEnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGNvcHlPZlRleHQgPSB0YWdzQ3JlYXRlQnV0dG9uLmh0bWwoKTtcblxuICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICB1cmw6IHRhZ3NBcGlVcmwsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtuYW1lOiB0YWdOYW1lfSksXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgLy8gYmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgdGFnc0NyZWF0ZUJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibGRzLWVsbGlwc2lzXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgLy8gfVxuICAgIH0pO1xuXG4gICAgcmVxdWVzdC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB0YWdzRm9ybS50cmlnZ2VyKCdyZXNldCcpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdGFnc0NyZWF0ZUJ1dHRvbi5odG1sKGNvcHlPZlRleHQpO1xuICAgICAgICBhbGVydCgnU29tZXRoaW5nIHdlbnQgd3Jvbmc6JyArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCArICcgdHJ5IGFnYWluJyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KTtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9