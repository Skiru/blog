import * as $ from 'jquery';

$(document).ready(function () {
    const tableBody = $('#js-post-table-body');
    const postsApiUrl = tableBody.data('posts-api-url');

    //TODO in future we need to add JWT :)
    const request = $.ajax({
        method: 'GET',
        url: postsApiUrl,
        headers: {
            "Accept" : "application/json"
        }
        // beforeSend: function () {
        //     tagsCreateButton.html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
        // }
    });

    request.done(function (response) {
       response.data.forEach(element => render(element))
    });

    request.fail(function (response) {
        alert('Something went wrong:' + response.responseText + ' try again');
    });

    window.updatePost = function (uuid) {
        window.location.href = '/dashboard/posts/' + uuid + '/update';
    };

    function render(post) {
        let uuid = '\'' + post.uuid + '\'';
        let updateButton = '<button onclick="updatePost('+ uuid +')" class="btn btn-yellow">Update</button>';
        tableBody.append(
            '<tr>' +
                '<td class="list-image"> <img src="' + post.headerImage + '" class="img-fluid"></td>' +
                '<td>' + post.title + '</td>' +
                '<td>' + post.author + '</td>' +
                '<td>' + post.published + '</td>' +
                '<td>' + post.created_at + '</td>' +
                '<td>' + post.updated_at + '</td>' +
                '<td> ' + updateButton + ' </td>' +
            '</tr>'
        );
    }
});