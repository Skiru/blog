import * as $ from 'jquery';

(function(){
    'use strict';

    const tableBody = $('#js-post-table-body');
    const postsApiUrl = tableBody.data('posts-api-url');

    window.updatePost = function (uuid) {
        window.location.href = '/dashboard/posts/' + uuid + '/update';
    };

    window.deletePost = function(uuid) {
        if (confirm('Do you really want to delete article?')) {
            const request = $.ajax({
                method: 'DELETE',
                url: postsApiUrl + '/' + uuid,
                headers: {
                    "Accept" : "application/json"
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
        let uuid = '\'' + post.uuid + '\'';
        let updateButton = '<button onclick="updatePost('+ uuid + ')" class="btn btn-yellow">Update</button>';
        let deleteButton = '<button onclick="deletePost('+ uuid + ')" class="btn btn-danger">Delete</button>';

        tableBody.append(
            '<tr>' +
            '<td class="list-image"> <img src="' + post.header_image + '" class="img-fluid"></td>' +
            '<td>' + post.title + '</td>' +
            '<td>' + post.author + '</td>' +
            '<td>' + post.category + '</td>' +
            '<td>' + post.tags + '</td>' +
            '<td>' + post.published + '</td>' +
            '<td>' + post.read_time + '</td>' +
            '<td>' + post.created_at + '</td>' +
            '<td>' + post.updated_at + '</td>' +
            '<td> ' + updateButton + ' </td>' +
            '<td> ' + deleteButton + ' </td>' +
            '</tr>'
        );
    }

    $(document).ready(function () {
        const request = $.ajax({
            method: 'GET',
            url: postsApiUrl,
            headers: {
                "Accept" : "application/json"
            }
        });

        request.done(function (response) {
            response.data.forEach(element => render(element, tableBody))
        });

        request.fail(function (response) {
            alert('Something went wrong:' + response.responseText + ' try again');
        });
    });
})();