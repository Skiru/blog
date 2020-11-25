import * as $ from 'jquery';
require('jquery-validation');

(function(){
   'use strict';

    const tagsForm = $("#js-tags-form");
    const tagsCreateApiUrl = tagsForm.data("tags-api-url");
    const tagsCreateButton = $("#js-form-tags-create-button");
    const tableBody = $('#js-tags-table-body');
    const tagsFindAllUrl = tableBody.data("tags-api-url");

    window.deleteTag = function(name) {
        if (confirm('Do you really want to delete tag?')) {
            const request = $.ajax({
                method: 'DELETE',
                url: tagsCreateApiUrl + '/' + name,
                headers: {
                    "Accept" : "application/json"
                }
            });

            request.done(function (response) {
                if (response.success === true) {
                    alert('Tag has been deleted successfully');
                    window.location.reload();
                }
            });

            request.fail(function (response) {
                let resp = JSON.parse(response.responseText);
                alert(resp.error);
            });
        }
    };

    window.getTags = function () {
        //TODO in future we need to add JWT :)
        const request = $.ajax({
            method: "GET",
            url: tagsFindAllUrl,
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
            let name = '\'' + tag.name + '\'';
            let deleteButton = '<button onclick="deleteTag('+ name + ')" class="btn btn-danger">Delete</button>';

            tableBody.append(
                '<tr>' +
                '<td>' + tag.name + '</td>' +
                '<td> Update </td>' +
                '<td>' + deleteButton +'</td>' +
                '</tr>'
            );
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
            errorPlacement: function ( error, element ) {
                error.addClass( "invalid-feedback" );

                if ( element.prop( "type" ) === "checkbox" ) {
                    error.insertAfter( element.parent( "label" ) );
                } else {
                    error.insertAfter( element );
                }
            },
            submitHandler: function (form) {
                return false;
            }
        });

        if (tagsForm.valid()) {
            const tagName = tagsForm.find("[name=tagName]").val();
            const copyOfText = tagsCreateButton.html();
            const request = $.ajax({
                method: "POST",
                url: tagsCreateApiUrl,
                data: JSON.stringify({name: tagName}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
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
        }

        return false;
    });
})();
