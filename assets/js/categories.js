import * as $ from 'jquery';

$(document).ready(function () {
    const categoriesForm = $("#js-categories-form");
    const categoriesCreateApiUrl = categoriesForm.data("categories-api-url");
    const categoriesCreateButton = $("#js-form-categories-create-button");
    const tableBody = $('#js-categories-table-body');
    const categoriesFindAllApiUrl = tableBody.data("categories-api-url");

    getCategories();

    function getCategories()
    {
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
    }

    categoriesForm.submit(function (e) {
        e.preventDefault();
        const categoryName = categoriesForm.find("[name=categoryName]").val();

        if ("" === categoryName) {
            alert('Fill the name of the category first!');
            return false;
        }

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

        return false;
    });

});
