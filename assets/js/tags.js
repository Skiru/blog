import * as $ from 'jquery';

$(document).ready(function () {
    const tagsForm = $("#js-tags-form");
    const tagsApiUrl = tagsForm.data("tags-api-url");
    const tagsCreateButton = $("#js-form-tags-create-button");
    const tableBody = $('#js-tags-table-body');

    getTags();

    function getTags()
    {
        //TODO in future we need to add JWT :)
        const request = $.ajax({
            method: 'GET',
            url: tagsApiUrl,
            headers: {
                "Accept" : "application/json"
            }
        });

        request.done(function (response) {
            response.data.forEach(element => render(element))
        });

        request.fail(function (response) {
            alert('Something went wrong:' + response.responseText + ' try again');
        });

        function render(tag) {
            tableBody.append(
                '<tr>' +
                '<td>' + tag.name + '</td>' +
                '<td> Update / Delete </td>' +
                '</tr>'
            );
        }
    }

    tagsCreateButton.click(function (e) {
        e.preventDefault();
        const tagName = tagsForm.find("[name=tagName]").val();

        if ("" === tagName) {
            alert('Fill the name of the tag first!');
            return false;
        }

        const copyOfText = tagsCreateButton.html();

        const request = $.ajax({
            method: "POST",
            url: tagsApiUrl,
            data: JSON.stringify({name: tagName}),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {
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

        return false;
    });

});
