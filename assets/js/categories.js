import * as $ from 'jquery';
require('jquery-validation');

(function(){
    'use strict';

    const categoriesForm = $("#js-categories-form");
    const categoriesCreateApiUrl = categoriesForm.data("categories-api-url");
    const categoriesCreateButton = $("#js-form-categories-create-button");
    const tableBody = $('#js-categories-table-body');
    const categoriesFindAllApiUrl = tableBody.data("categories-api-url");

    window.getCategories = function () {
        //TODO in future we need to add JWT :)
        const request = $.ajax({
            method: "GET",
            url: categoriesFindAllApiUrl,
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

        function render(category) {
            tableBody.append(
                '<tr>' +
                '<td>' + category.name + '</td>' +
                '<td> Update / Delete </td>' +
                '</tr>'
            );
        }
    };

    getCategories();

    categoriesCreateButton.on('click', function (e) {
        categoriesForm.validate({
            rules: {
                categoryName: {
                    required: true,
                    minlength: 2,
                    maxlength: 128
                }
            },
            messages: {
                categoryName: {
                    required: "Category name is required!",
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

        if (categoriesForm.valid()) {
            const categoryName = categoriesForm.find("[name=categoryName]").val();
            const copyOfText = categoriesCreateButton.html();

            const request = $.ajax({
                method: "POST",
                url: categoriesCreateApiUrl,
                data: JSON.stringify({name: categoryName}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    categoriesCreateButton.html('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
                }
            });

            request.done(function (response) {
                categoriesForm.trigger('reset');
                location.reload();
            });

            request.fail(function (response) {
                categoriesCreateButton.html(copyOfText);
                alert('Something went wrong:' + response.responseText + ' try again');
            });
        }

        return false;
    });
})();
