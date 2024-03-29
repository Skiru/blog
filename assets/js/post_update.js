import * as $ from 'jquery';

$(document).ready(function () {
    const updateForm = $("#js-post-update-form");
    const updateButton = $("#js-post-update-button");

    function upload(file) {
        let uploadForm = new FormData();
        uploadForm.append('file', file);
        return $.ajax({
            method: 'POST',
            data: uploadForm,
            processData: false,
            contentType: false,
            url: '/api/v1/posts/upload',
            headers: {
                "Accept": "application/json"
            }
        });
    }

    function updatePostCall(headerImageUrl, postUpdateFormData)
    {
        let data = {
            "title": postUpdateFormData.get('post[title]'),
            "content": tinymce.activeEditor.getContent(),
            "readTime": parseInt(postUpdateFormData.get('post[readTime]')),
            "category": postUpdateFormData.get('post[category]'),
            "tags": postUpdateFormData.getAll('post[tags][]'),
            "published": postUpdateFormData.get('post[published]') !== null,
            "headerImage": headerImageUrl
        };

        //TODO in future we need to add JWT :)
        const request = $.ajax({
            method: 'PATCH',
            data: JSON.stringify(data),
            processData: false,
            contentType: false,
            dataType: 'json',
            url: updateForm.data('post-update-api-url'),
            headers: {
                "X-CSRF-TOKEN": postUpdateFormData.get(['post[_token]']),
                "Accept" : "application/json"
            }
        });

        request.done(function (response) {
            window.location.href = '/dashboard/posts';
        });

        request.fail(function (response) {
            alert('Something went wrong:' + response.responseText + ' try again');
        });
    }

    updateButton.click(function (e) {
        e.preventDefault();

        let formData = new FormData(updateForm[0]);
        let headerImageFile = formData.get('post[headerImage]');
        const copyOfText = updateButton.html();
        //Update the spinner!
        updateButton.html('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');

        if (headerImageFile.size !== 0) {
            if ((headerImageFile.size/1000) > 2048) {
                alert('Image is too large('+ parseFloat(headerImageFile.size/1000000).toFixed(2)  + 'MB). Maximum image size is: 2048 kB (2MB)');
                return false;
            }

            const request = upload(headerImageFile);
            request.done(function (response) {
                updatePostCall(response.location, formData);
                updateButton.html(copyOfText);
                return false;
            });

            request.fail(function (response) {
                alert('Something went wrong during upload of a image:' + response.responseText + ' try again');
                updateButton.html(copyOfText);
                return false;
            });
        } else {
            updatePostCall(null, formData);
            updateButton.html(copyOfText);
        }

        return false;
    });
});