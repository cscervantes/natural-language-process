const buttonChoose = 'button'
const file  = 'input[type="file"]'
const formData = new FormData()

$(document).ready(function(){
    $('.sidenav').sidenav();
    $.ajax({
        'url': '/languages'
    }).then(function(response){
        const mapSelect = response.map(v=>{
            return `<option value="${v}">${v}</option>`
        }).join('\n')
        $('select').html(mapSelect)
        $('select').formSelect();
    })
});

$(document).on('change', 'select', function(e){
    // e.stopPropagation()
   const mapVal = $(this).val().map(v=>{
       return `<span class="chip">${v}</span>`
   }).join('')
   $('#chip-div').html(mapVal+'<label>Selected languages</label>')
})

$(document).on('click', buttonChoose, function(e){
    $(file).click()
})

$(window).on("dragover", function(e) { e.preventDefault(); e.stopPropagation(); });
$(window).on("drop", function(e) { e.preventDefault(); e.stopPropagation(); });
// Drag enter
$('#box').on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#drop-text').html('<h5>Drop file here</h5>');
});

$('#box').on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).css({'background-color': 'rgba(0,0,0,.1)'})
    $('#drop-text').html('<h5>Drop file here</h5>')
    // $('#drop-text').html('<h5>Drag and drop files here</h5><h6>or</h6>');
});

$('#box').on('dragstart', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#drop-text').html('<h5>Drop file here</h5>')
    // $('#drop-text').html('<h5>Drag and drop files here</h5><h6>or</h6>');
});

$('#box').on('dragleave', function (e) {
    e.stopPropagation();
    e.preventDefault();
    // $('#drop-text').text('Drop file here')
    $('#drop-text').html('<h5>Drag and drop files here</h5><h6>or</h6>');
});

$('#box').on('dragexit', function (e) {
    e.stopPropagation();
    e.preventDefault();
    // $('#drop-text').text('Drop file here')
    $('#drop-text').html('<h5>Drag and drop files here</h5><h6>or</h6>');
});

$('#box').on('drop', function(e){
    e.stopPropagation();
    e.preventDefault();
    let files = e.originalEvent.dataTransfer.files;
    console.log(files)
    formData.append('file', files)
    $('#drop-text').html('<h5>Uploading file...</h5>')
})