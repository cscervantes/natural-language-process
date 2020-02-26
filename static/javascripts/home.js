// function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

const upload = (data, obj) => {
    let o = {}
    $.each(obj, function(i, e){
        o[i] = e
    })
    $('video').remove()
    $('.progress').show()
    $.ajax({
        url: 'http://192.168.3.34:8000/upload_video',
        type:'POST',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        // contentType: 'application/json; charset=utf-8',
        data: data,
        dataType:'json',
        xhr: function(){
            //upload Progress
            var xhr = $.ajaxSettings.xhr();
            var started_at = new Date()
            if (xhr.upload) {
                xhr.upload.addEventListener('progress', function(event) {
                    var percent = 0;
                    var position = event.loaded || event.position;
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }

                    var elapsed = ( new Date().getTime() - started_at.getTime() )/1000;
                    //update progressbar
                    $(".progress .determinate").css("width", + percent +"%");
                    $('.percent').text(percent+'% Uploaded '+ elapsed +' kb/sec') 
                }, true);
            }
            return xhr;

        },
        beforeSend: function(){
            let loader = `
            <table>
                <tbody>
                    <tr>
                        <td class="center" width="5%">
                            <i class="material-icons" width="100">featured_video</i>
                        </td>
                        <td class="center" width="90%">
                            <small id="title-video" class="left">${o.name}</small>
                            <div class="progress">
                                <div class="determinate"></div>
                            </div>
                            <small class="percent left"></small>
                        </td>
                        <td class="center" width="5%" id="statusIcon">
                            <a id="cancelBtn"><i class="material-icons">cancel</i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            `
            $('#render-html').html(loader)
        }
    }).then(r=>{
        
        console.log(r)
        if(r.hasOwnProperty('error_message')){
            $('#render-html').html(JSON.stringify(r, null, 4))
        }else{
            let wrapper = `
                <video controls="true" width="100">
                    <source src="${r.upload_location}" type="${r.file_type}"
                </video>
            `
            $('tr > td').eq(0).html(wrapper)
            $('#statusIcon').html(`
                <a id="successBtn" data-target="modal1" class="modal-trigger"><i class="material-icons">check_circle</i></a>
            `)
            $('.percent').text('Done.')

            let wrapper2 = `
                <div class="row">
                    <div class="col s12 m12 center">
                        <video controls="true" width="250">
                            <source src="${r.upload_location}" type="${r.file_type}"
                        </video>
                    </div>
                </div>
                <div class="row">
                    
                    <div class="col s6" style="height:250px; overflow-x:auto">
                    <h4>Original Text</h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci ex. Praesent dictum ipsum quis justo dictum, eget rutrum turpis porta. Cras cursus augue ligula, et congue tellus laoreet ac. Nunc diam leo, aliquam sed neque et, ornare lobortis velit. In nec tempor lorem. Cras sodales vitae odio vel tincidunt. Maecenas eu iaculis sapien, ultrices scelerisque enim.

                    Donec commodo sem ligula, sed mattis nibh consequat ut. Proin volutpat, mauris vel suscipit consectetur, sem dui euismod felis, ut interdum orci ex non odio. Ut fermentum pulvinar laoreet. Praesent vitae lacus non velit aliquam vestibulum. Nulla aliquet metus et tortor fringilla venenatis. Sed lorem turpis, sodales id leo eu, venenatis interdum justo. Aliquam eu elit mi. Sed id porta enim. Donec gravida lorem posuere tortor ultricies maximus. Fusce eu quam odio. Morbi nisl ipsum, volutpat in blandit feugiat, convallis ac urna. Maecenas facilisis, velit ac condimentum suscipit, augue neque suscipit magna, vel sodales lacus neque id turpis. In et eros gravida, varius enim sodales, lobortis massa. Quisque pharetra aliquam neque non tristique.
                    
                    Maecenas malesuada ac felis at porttitor. Integer varius tempor placerat. Etiam vel neque ullamcorper, semper ipsum sed, vulputate purus. Cras pharetra, augue non laoreet elementum, sem odio consectetur justo, in vulputate velit arcu ac massa. Fusce sed diam libero. Nullam tristique turpis vitae consequat rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst. Nullam accumsan massa in velit vestibulum, eu posuere tellus placerat.
                    
                    Sed at semper elit. Pellentesque laoreet pretium ligula, non condimentum orci commodo nec. Aenean porttitor auctor diam, ut tincidunt quam rhoncus vel. Aenean quis est nec leo aliquam viverra sit amet ut nibh. Duis id purus sed augue suscipit consectetur. In fringilla metus eget ultricies pellentesque. Proin pharetra rhoncus tortor tristique elementum. Nulla in varius nulla. Suspendisse lacinia facilisis dui eu malesuada. Curabitur lacinia bibendum scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras laoreet vestibulum convallis. Aenean tristique laoreet eros vitae ultrices. Vivamus pulvinar nibh dui, vel ullamcorper sem pellentesque in. Aliquam in mauris rhoncus, sodales mi sit amet, mollis turpis. Cras volutpat, sem vitae consectetur egestas, sapien lorem venenatis arcu, ac aliquet augue arcu non libero.
                    
                    Phasellus accumsan magna ut nisl elementum, condimentum varius erat blandit. Nunc lacus massa, volutpat ut nisl quis, aliquet egestas dolor. Vivamus vulputate luctus erat, iaculis consequat libero hendrerit eu. Mauris vehicula ullamcorper justo, eget malesuada erat laoreet ac. Nam nunc neque, tincidunt sit amet magna at, pulvinar pretium erat. Nam ullamcorper sit amet mauris vel laoreet. Sed pellentesque risus ut nisl fermentum, et mattis leo gravida.
                    </div>

                    <div class="col s6" style="height:250px; overflow-x:auto">
                        <h4>Translated Text</h4>
                        <div class="col s12">
                            <ul class="tabs">
                                <li class="tab col s3"><a class="active" href="#test1">English</a></li>
                                <li class="tab col s3"><a  href="#test2">Filipino</a></li>
                            </ul>
                        </div>
                        <div id="test1" class="col s12">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci ex. Praesent dictum ipsum quis justo dictum, eget rutrum turpis porta. Cras cursus augue ligula, et congue tellus laoreet ac. Nunc diam leo, aliquam sed neque et, ornare lobortis velit. In nec tempor lorem. Cras sodales vitae odio vel tincidunt. Maecenas eu iaculis sapien, ultrices scelerisque enim.

                        Donec commodo sem ligula, sed mattis nibh consequat ut. Proin volutpat, mauris vel suscipit consectetur, sem dui euismod felis, ut interdum orci ex non odio. Ut fermentum pulvinar laoreet. Praesent vitae lacus non velit aliquam vestibulum. Nulla aliquet metus et tortor fringilla venenatis. Sed lorem turpis, sodales id leo eu, venenatis interdum justo. Aliquam eu elit mi. Sed id porta enim. Donec gravida lorem posuere tortor ultricies maximus. Fusce eu quam odio. Morbi nisl ipsum, volutpat in blandit feugiat, convallis ac urna. Maecenas facilisis, velit ac condimentum suscipit, augue neque suscipit magna, vel sodales lacus neque id turpis. In et eros gravida, varius enim sodales, lobortis massa. Quisque pharetra aliquam neque non tristique.

                        Maecenas malesuada ac felis at porttitor. Integer varius tempor placerat. Etiam vel neque ullamcorper, semper ipsum sed, vulputate purus. Cras pharetra, augue non laoreet elementum, sem odio consectetur justo, in vulputate velit arcu ac massa. Fusce sed diam libero. Nullam tristique turpis vitae consequat rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst. Nullam accumsan massa in velit vestibulum, eu posuere tellus placerat.

                        Sed at semper elit. Pellentesque laoreet pretium ligula, non condimentum orci commodo nec. Aenean porttitor auctor diam, ut tincidunt quam rhoncus vel. Aenean quis est nec leo aliquam viverra sit amet ut nibh. Duis id purus sed augue suscipit consectetur. In fringilla metus eget ultricies pellentesque. Proin pharetra rhoncus tortor tristique elementum. Nulla in varius nulla. Suspendisse lacinia facilisis dui eu malesuada. Curabitur lacinia bibendum scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras laoreet vestibulum convallis. Aenean tristique laoreet eros vitae ultrices. Vivamus pulvinar nibh dui, vel ullamcorper sem pellentesque in. Aliquam in mauris rhoncus, sodales mi sit amet, mollis turpis. Cras volutpat, sem vitae consectetur egestas, sapien lorem venenatis arcu, ac aliquet augue arcu non libero.

                        Phasellus accumsan magna ut nisl elementum, condimentum varius erat blandit. Nunc lacus massa, volutpat ut nisl quis, aliquet egestas dolor. Vivamus vulputate luctus erat, iaculis consequat libero hendrerit eu. Mauris vehicula ullamcorper justo, eget malesuada erat laoreet ac. Nam nunc neque, tincidunt sit amet magna at, pulvinar pretium erat. Nam ullamcorper sit amet mauris vel laoreet. Sed pellentesque risus ut nisl fermentum, et mattis leo gravida.
                        </div>
                        <div id="test2" class="col s12">Filipino</div>
                    </div>

                </div>

                <div class="row">
                    <div class="col s6">
                        <h4>Entities</h4>
                        <div class="parent-chip">
                            <span class="chip">Lorem</span>
                            <span class="chip">Ipsum</span>
                        </div>
                    </div>

                    <div class="col s6">
                        <h4>Part of Speech</h4>
                        <div class="parent-chip">
                            <span class="chip">Lorem</span>
                            <span class="chip">Ipsum</span>
                        </div>
                    </div>
                </div>
            `
            $('.modal-content').html(wrapper2)
            $('.tabs').tabs();
        }
    }).catch(e=>{
        console.log(e)
        $('#render-html').html(JSON.stringify(e, null, 4))
    })
}



const buttonChoose = 'button'
const file  = 'input[type="file"]'

$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('.tabs').tabs();
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
   $('#chip-div').html(mapVal)
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
});

$('#box').on('dragstart', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#drop-text').html('<h5>Drop file here</h5>')
});

$('#box').on('dragleave', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#drop-text').html('<h5>Drag and drop files here</h5><h6>or</h6>');
});

$('#box').on('dragexit', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#drop-text').html('<h5>Drag and drop files here</h5><h6>or</h6>');
});

$('#box').on('drop', function(e){
    e.stopPropagation();
    e.preventDefault();
    let files = e.originalEvent.dataTransfer.files;
    let filesData = []
    let titleOnly = $('input[type="checkbox"]').prop('checked')
    let transLang = $('select').val()
    let linkUrl = $('input[type="url"]').val() || null
    
    if(transLang.length > 0){
        var transLangSelected = transLang
    }else{
        var transLangSelected = ['English']
    }
    $.each(files, (i, e)=>{
        filesData[i] = e
    })

    // console.log(filesData)
    
    filesData.map(v=>{
        let newData = new FormData()
        newData.append('file', v)
        newData.append('titleOnly', titleOnly)
        newData.append('transLang', transLangSelected)
        newData.append('linkUrl', linkUrl)
        // for(let ent of newData.entries()){
        //     console.log(ent)
        // }
        upload(newData, v)
    })
    $('#drop-text').html('<h5>Uploading file...</h5>')
})



$(document).on('change', 'input[type="file"]', async function(e){
    e.preventDefault()
    let filesData = []
    let titleOnly = $('input[type="checkbox"]').prop('checked')
    let transLang = $('select').val()
    let linkUrl = $('input[type="url"]').val() || null
    
    if(transLang.length > 0){
        var transLangSelected = transLang
    }else{
        var transLangSelected = ['English']
    }
    $.each(this.files, (i, e)=>{
        filesData[i] = e
    })

    // console.log(filesData)
    
    filesData.map(v=>{
        let newData = new FormData()
        newData.append('file', v)
        newData.append('titleOnly', titleOnly)
        newData.append('transLang', transLangSelected)
        newData.append('linkUrl', linkUrl)
        // console.log(newData)
        // for(let ent of newData.entries()){
        //     console.log(ent)
        // }
        upload(newData, v)
    })

    // console.log(mapData)

    // let result = await Promise.all(mapData.map(async fd => await upload(fd)))
    // console.log(result)
})

$(document).on('keypress', 'input[type="url"]', async function(event){
    event.preventDefault()
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        let filesData = []
        let titleOnly = $('input[type="checkbox"]').prop('checked')
        let transLang = $('select').val()
        let linkUrl = $(this).val() || null
        alert(linkUrl)
        if(transLang.length > 0){
            var transLangSelected = transLang
        }else{
            var transLangSelected = ['English']
        }

        // $.each(this.files, (i, e)=>{
        //     filesData[i] = e
        // })

        let newData = new FormData()
        // newData.append('titleOnly', titleOnly)
        // newData.append('transLang', transLangSelected)
        // newData.append('linkUrl', linkUrl)
        // upload(newData)
        filesData.map(v=>{
            let newData = new FormData()
            newData.append('file', v)
            newData.append('titleOnly', titleOnly)
            newData.append('transLang', transLangSelected)
            newData.append('linkUrl', linkUrl)
            console.log(newData)
            for(let ent of newData.entries()){
                console.log(ent)
            }
            upload(newData)
        })
    }
});

$(document).on('click', 'a#cancelBtn', function(e){
    e.preventDefault()
    e.stopPropagation()
    upload.abort()
    upload = null;
    console.log('Upload cancelled.')
})