$(document).ready(function () {
    document.getElementById("videocheck").checked = false;
    document.getElementById("slidecheck").checked = false;
    document.getElementById("blogcheck").checked = false;
    document.getElementById("myInput").value = '';
    getYaml();
    //Add css class sidebar-toggle to div main
    $("#sidebar-wrapper").toggleClass("sidebar-toggle", true);//.css('color','blue');
    //Add css class sidebar-nav to ul
    $("#navList").toggleClass("sidebar-nav", true);//.css('color','red');
    
    $( "#SearchInputText" ).keyup(function() { // sidebar搜尋指定類別 
      $('#sideLiBox').empty() ;
      
      var objCl_s = $(this).val() ;
      
      $.get('./content/category.yaml', function (res) {
        var obj = jsyaml.load(res);
        
        var obj = obj.filter(function (value) {
          return value.match( objCl_s );
        });
        
        obj.sort() ;
        genElm(obj);
        
      }).done(function () {
          console.log("done")
      }).fail(function () {
          console.log("fail");
      })
        
    });
       
});


function getYaml() {
    $.get('./content/category.yaml', function (res) {
        var obj = jsyaml.load(res);
        //console.log(obj)
        obj.sort() ;
        genElm(obj);
        
    }).done(function () {
        console.log("done")
    }).fail(function () {
        console.log("fail");
    })
}

function genElm(obj) {
    html = '' ;
    
    for (var i = 0; i < obj.length; i++) {
        var el = obj[i];
        console.log('el='+el);
        html += '<li class="sidebar-label pt15"><a class = "sidebar_clTitle" href="' + '#' + '" onclick="getCategory(' + '\'' + el + '\'' + ');">' + el + '</a></li>'
        //html+= '<li class="sidebar-label pt15"><a href="'+'?Category='+el+'" onclick="getCategory('+'\''+el+'\''+');">'+el+'</a></li>'
        //html+= '<li>'+el+'</li>'
    }
    //$("#main").append(html)
    $("#sideLiBox").append(html)

}

function getCategory(category) {
    //window.location.reload();
    //console.log(category);
    // $('#escalation').remove();
    // $('#escalation2').remove();
    // $('#escalation3').remove();
    $("#ctl").remove;
    document.getElementById("videocheck").checked = false;
    document.getElementById("slidecheck").checked = false;
    document.getElementById("blogcheck").checked = false;
    document.getElementById("myInput").value = '';
    $("#ctl").text(category);
    getVideoByCategory(category);
    getSlideByCategory(category);
    getBlogByCategory(category);

    //
    $("#videobody").fadeIn('fast');
    $("#slidebody").fadeIn('fast');
    $("#blogbody").fadeIn('fast');
}

function getVideoByCategory(category) {
    $("#videobody").empty();
    console.log('start in getVideoByCategory:' + category);
    //$.get('./'+category+'_Video.yaml', function(res){
    $.get('./content/' + category + '.yaml', function (res) {
        var obj = jsyaml.load(res);
        console.log(obj);
        genVideoElm(obj);
        //Get Yutube image and Set to iframe
        $(function () {
            var thumbSize = 'large',		// 設定要取得的縮圖是大圖還是小圖
                // 大圖寬高為 480X360；小圖寬高為 120X90
                //imgWidth = '300',			// 限制圖片的寬及 YouTube 影片的寬
                imgWidth = '100%',
                imgHeight = '100%',			// 限制圖片的高及 YouTube 影片的高
                autoPlay = '&autoplay=1',	// 是否載入 YouTube 影片後自動播放；若不要自動播放則設成 0
                fullScreen = '&fs=1';		// 是否允許播放 YouTube 影片時能全螢幕播放

            //$('ul.playlist>li>a').each(function () {
            // $('ul.playlist>a').each(function () {
            $('p>a').each(function () {
                //$('ul.playlist>table>tr>td>li>a').each(function(){
                // 取得要連結轉換的網址及訊息內容
                var _this = $(this),
                    _url = _this.attr('href'),
                    _info = _this.text(),
                    _type = (thumbSize == 'large') ? 0 : 2;
                //console.log('_type='+_type);  
                // 取得 vid
                var vid = _url.match('[\\?&]v=([^&#]*)')[1];
                //console.log('vid='+vid);  
                // 取得縮圖
                var thumbUrl = "https://img.youtube.com/vi/" + vid + "/" + _type + ".jpg";

                // 把目前超連結的內容轉換成圖片並加入 click 事件
                _this.html('<img src="' + thumbUrl + '" alt="' + _info + '" title="' + _info + '" width="' + imgWidth + '" height="' + imgHeight + '" />').click(function () {
                    return false;
                }).focus(function () {
                    this.blur();
                }).children('img').click(function () {
                    
                    window.open(_url, '_blank');
                   
                });
            });
        });
    }).done(function () {
        console.log("Video done")
    }).fail(function () {
        //alert(category +'video is not completed,please add or update '+category+'_Video.yaml');
        console.log("Video fail");
        $("#videobody").append("");
    })
}
function getSlideByCategory(category) {
    //console.log('start in getSlideByCategory:'+category);
    $("#slidebody").empty();
    $.get('./content/' + category + '.yaml', function (res) {
        var obj = jsyaml.load(res);
        //console.log(obj);
        genSlideElm(obj);
        //genElm(obj)
    }).done(function () {
        console.log("Slide done")
    }).fail(function () {
        //alert(category +'Slide is not completed,please add or update '+category+'_Slide.yaml');
        console.log("Slide fail");
        $("#slidebody").append("");
    })
}
function getBlogByCategory(category) {
    console.log('start in getBlogByCategory:' + category);
    $("#blogbody").empty();
    $.get('./content/' + category + '.yaml', function (res) {
        var obj = jsyaml.load(res);
        //console.log(obj);
        genBlogElm(obj);
        console.log('genBlogElm finished');
        $('img[data-url]').each(function() {
            console.log('start traversal in img[data-url]')
            $.ajax({
              url: 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?url=' + $(this).data('url') + '&screenshot=true',
              context: this,
              type: 'GET',
              dataType: 'json',
              success: function(data) {
                  console.log('start traversal in img[data-url]');
                   data = data.screenshot.data.replace(/_/g, '/').replace(/-/g, '+');
                  $(this).attr('src', 'data:image/jpeg;base64,' + data);
                }
            });
        });
    }).done(function () {
        console.log("Blog done")
    }).fail(function () {
        //alert(category +'Blog is not completed,please add or update '+category+'_Blog.yaml');
        console.log("Blog fail");
        $("#blogbody").append("");
    })
}


function genBlogElm(obj) {
    var dataSet = [];
    var html = ''//'<h4>Blog</h4>'//'<tr>'
    var b = 0;
    var exist = false ;
    html += '<h1 id = "blog">Blog</h1>'
    //console.log('genBlogElm obj:'+obj);
    for (var i in obj) {
        if (String(obj[i].dpl) == 'b') {
            exist = true ;
            var object1 = [obj[i].ttl, obj[i].url];
           
            // html += '<div class="col-md-4">'
            // html += '<a href="' + obj[i].url + '">'
            // html += obj[i].ttl
            // html += '</div>'
            html += '<div class="col-xs6 col-sm-4">'
            html += '<div class="panel">'
            html += '<div class="panel-heading">'
            html += '<span class="panel-title">'
            html += '<a href=\"'+obj[i].url+'\" '+'target=\"_blank\">'+obj[i].ttl+'<\/a>'
            html += '</span>'
            html += '</div>'
            html += '<div class="panel-body">'
            html += '<a href=\"'+obj[i].url+'\" '+'target=\"_blank\">' 
            html += '<p>'

            //html += '<a align="center" href="' + obj[i].url + '">' + ttlvalue + '</a>'
            html+='<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" width="80%" data-url=\"'+
            obj[i].url+
            //https://www.hkitblog.com/?p=28531
            '\">'

            html += '</p>'
            html += '<\/a>'
            html += '<hr class="m5">'
            html += '<div style="height:100px;overflow-y:auto;">'
            html += '<p>' + obj[i].ttl + '</p>' 
            html += '</div>'
            html += '</div>'
            html += '</div>'
            html += '</div>'
           
        }
    }
    //html+='</tr>'
    if ( exist == true ) $("#blogbody").append(html)

    
}

function genSlideElm(obj) {
    var html = ''//'<h4>Slide</h4>'//'<tr>'
    var s = 0;
    var exist = false ;
    html += '<h1 id = "slide">Slide</h1>'
    //console.log('genBlogElm obj:'+obj);
    for (var i in obj) {
        var desvalue = '';
        var ttlvalue = '';
        if (String(obj[i].dpl) == 's') {
            exist = true ;
            //if (String(obj[i].des) == null) { obj[i].des = ''; }

            if (typeof obj[i].des === 'undefined' || obj[i].des === null) {
                console.log('condition1 desvalue=' + desvalue);
            } else {
                desvalue = String(obj[i].des);
                console.log('condition2 desvalue=' + desvalue);
            }
            if (desvalue.length > 40) {
                desvalue = desvalue.substr(0, 40) + '...';
                console.log('condition4 desvalue=' + desvalue);
            }

            if (typeof obj[i].ttl === 'undefined' || obj[i].ttl === null) {

            } else if (String(String(obj[i].ttl)).length > 40) {
                ttlvalue = String(obj[i].ttl).substr(0, 40) + '...';
                console.log('condition4 desvalue=' + ttlvalue);
            } else {
                ttlvalue = String(obj[i].ttl);
            }
           
            html += '<div class="col-xs6 col-sm-4">'
            html += '<div class="panel">'
            html += '<div class="panel-heading">'
            html += '<span class="panel-title">'
            html += '<a href=\"'+obj[i].src+'\" '+'target=\"_blank\">'+obj[i].ttl+'<\/a>'
            html += '</span>'
            html += '</div>'
            html += '<div class="panel-body" >' 
            html += '<a class = "forSlideHref" href=\"'+obj[i].src+'\" '+'target=\"_blank\" ></a>'
            html += '<p style = "height:200px ;width : 100%; overflow:hidden">'
            html += '<iframe scrolling="no" frameborder="0" height="230px" src="' + obj[i].src + '" width="100%"  sandbox ></iframe>'
            html += '</p>'
            html += '<hr class="m5">'
            html += '<div style="height:10px;overflow-y:auto;">'
            html += '<p>' + desvalue + '</p>' 
            html += '</div>'
            html += '</div>'
            html += '</div>'
            html += '</div>'
        }
        
        
        
    }
    html += ''//'</tr>'
    if ( exist == true ) $("#slidebody").append(html)

}


function genVideoElm(obj) {
    var html = ''//'<h4>Video</h4>'//'<tr align="left">'
    var v1 = 0;
    var exist = false ;
    html += '<h1 id = "video">Video</h1>'
    //console.log('genBlogElm obj:'+obj);
    for (var i in obj) {
        var desvalue = '';
        var ttlvalue = '';
        if (String(obj[i].dpl) == 'v') {
            exist = true ;
            if (typeof obj[i].des === 'undefined' || obj[i].des === null) {

            } else {
                desvalue = String(obj[i].des);
            }
            if (desvalue.length > 40) {
                desvalue = desvalue.substr(0, 40) + '...';
            }

            if (typeof obj[i].ttl === 'undefined' || obj[i].ttl === null) {

            } else if (String(String(obj[i].ttl)).length > 40) {
                ttlvalue = String(obj[i].ttl).substr(0, 40) + '...';
            } else {
                ttlvalue = String(obj[i].ttl);
            }
            
            
            html += '<div class="col-xs6 col-sm-4 ">'
            html += '<div class="panel">'
            html += '<div class="panel-heading">'
            html += '<span class="panel-title">'
            html += '<a href=\"'+obj[i].url+'\" '+'target=\"_blank\">'+obj[i].ttl+'<\/a>'
            html += '</span>'
            html += '</div>'
            html += '<div class="panel-body">'
            html += '<p>'
            html += '<a align="center" href="' + obj[i].url + '">' + ttlvalue + '</a>'
            //html += '<a align=\"center\" href=\"'+obj[i].url+'\" '+'target=\"_blank\">'+obj[i].ttl+'<\/a>'
            html += '</p>'
            html += '<hr class="m5">'
            html += '<div style="height:10px;overflow-y:auto;">'
            html += '<p>' + desvalue + '</p>' 
            html += '</div>'
            html += '</div>'
            html += '</div>'
            html += '</div>'
            
        }
    }
    //html+='</tr>'
    if ( exist == true ) $("#videobody").append(html)
    //$('#escalation').paging({limit:1});
    //console.log('videobody='+html);  
}

function adjustIframes() {
    $('iframe').each(function () {
        var
            $this = $(this),
            proportion = $this.data('proportion'),
            w = $this.attr('width'),
            actual_w = $this.width();

        if (!proportion) {
            proportion = $this.attr('height') / w;
            $this.data('proportion', proportion);
        }

        if (actual_w != w) {
            $this.css('height', Math.round(actual_w * proportion) + 'px');
        }
    });
}
$(window).on('resize load', adjustIframes);

function changeScrollbarPosition( targetName ){
  var loc = $(targetName).offset().top ;
  $('html, body').animate({scrollTop:(loc-80)},1000);

}
