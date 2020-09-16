import * as $ from 'jquery';

const tagsForm = $("#js-tags-form");
const tagsApiUrl = tagsForm.data("tags-api-url");
const tagsCreateButton = $("#js-form-tags-create-button");
// const tagsModalClose = $("#js-tags-modal-close");
tagsCreateButton.click(function (e) {
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
        // beforeSend: function () {
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


