$(document).on('click', 'button', function(event){
    event.preventDefault()
    let formData = new FormData()
    formData.append('file', $('input[type="file"]').val())
    for(let f of formData){
        console.log(f)
    }
    $.ajax({
        url: 'http://192.168.3.34:8000/upload_video',
        type:'POST',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        // contentType: 'application/json; charset=utf-8',
        data: formData,
        dataType:'json',
        xhr: function(){
            //upload Progress
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
                xhr.upload.addEventListener('progress', function(event) {
                    var percent = 0;
                    var position = event.loaded || event.position;
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }
                    //update progressbar
                    $(".progress .determinate").css("width", + percent +"%");
                }, true);
            }
            return xhr;

        }
    }).done(console.log).catch(console.log)
})