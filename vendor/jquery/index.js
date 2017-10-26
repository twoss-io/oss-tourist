$(document).ready(function(){
    document.getElementById("videocheck").checked =false;
    document.getElementById("slidecheck").checked =false;
    document.getElementById("blogcheck").checked =false;
    document.getElementById("myInput").value ='';
    getYaml();
    //Add css class sidebar-toggle to div main
    $("#sidebar-wrapper").toggleClass("sidebar-toggle",true);//.css('color','blue');
    //Add css class sidebar-nav to ul
    $("#navList").toggleClass("sidebar-nav",true);//.css('color','red');
});



function getYaml(){
    $.get('./category.yaml', function(res){
        var obj = jsyaml.load(res);
        //console.log(obj)
        genElm(obj)
    }).done(function(){
        console.log("done")
    }).fail(function() {
        console.log( "fail" );
      })
}

function genElm(obj){
    var html = '<ul id="navList" class="nav sidebar-menu">'
    for (var i = 0; i < obj.length; i++) {
        var el = obj[i];
         html+= '<li class="sidebar-label pt15"><a href="'+'#'+'" onclick="getCategory('+'\''+el+'\''+');">'+el+'</a></li>'
        //html+= '<li class="sidebar-label pt15"><a href="'+'?Category='+el+'" onclick="getCategory('+'\''+el+'\''+');">'+el+'</a></li>'
        //html+= '<li>'+el+'</li>'
    }
    html += '</ul>'
    //$("#main").append(html)
    $("#sidebar-wrapper").append(html)
    
}

function getCategory(category){
    //window.location.reload();
    //console.log(category);
    // $('#escalation').remove();
    // $('#escalation2').remove();
    // $('#escalation3').remove();
    $("#ctl").remove;
    document.getElementById("videocheck").checked =false;
    document.getElementById("slidecheck").checked =false;
    document.getElementById("blogcheck").checked =false;
    document.getElementById("myInput").value ='';
    $("#ctl").text(category);
    getVideoByCategory(category);
    getSlideByCategory(category);
    getBlogByCategory(category);
}

function getVideoByCategory(category){
    $("#videobody").empty();
    console.log('start in getVideoByCategory:'+category);
    //$.get('./'+category+'_Video.yaml', function(res){
        $.get('./'+category+'.yaml', function(res){
    var obj = jsyaml.load(res);
        console.log(obj);
        genVideoElm(obj);
        //Get Yutube image and Set to iframe
        $(function () {
            var thumbSize = 'large',		// 設定要取得的縮圖是大圖還是小圖
              // 大圖寬高為 480X360；小圖寬高為 120X90
              imgWidth = '300',			// 限制圖片的寬及 YouTube 影片的寬
              imgHeight = '240',			// 限制圖片的高及 YouTube 影片的高
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
                // 當點擊到圖片時就轉換成 YouTube 影片
                var swf = '<object width="' + imgWidth + '" height="' + imgHeight + '">';
                swf += '<param name="movie" value="https://www.youtube.com/v/' + vid + autoPlay + fullScreen + '"></param>';
                swf += '<param name="wmode" value="transparent"></param>';
                swf += (fullScreen == '&fs=1') ? '<param name="allowfullscreen" value="true"></param>' : '';
      
                swf += '<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + vid + autoPlay + fullScreen + '" ';
                swf += (fullScreen == '&fs=1') ? 'allowfullscreen="true" ' : '';
                swf += 'wmode="transparent" width="' + imgWidth + '" height="' + imgHeight + '""></embed>';
      
                swf += '</object/>';
      
                $(this).parent('a').html(swf);
      
                return false;
              });
            });
          });
    }).done(function(){
        console.log("Video done")
    }).fail(function() {
        //alert(category +'video is not completed,please add or update '+category+'_Video.yaml');
        console.log( "Video fail" );
        $("#videobody").append("");
      })
}
function getSlideByCategory(category){
    //console.log('start in getSlideByCategory:'+category);
    $("#slidebody").empty();
    $.get('./'+category+'.yaml', function(res){
        var obj = jsyaml.load(res);
        //console.log(obj);
        genSlideElm(obj);
        //genElm(obj)
    }).done(function(){
        console.log("Slide done")
    }).fail(function() {
        //alert(category +'Slide is not completed,please add or update '+category+'_Slide.yaml');
        console.log( "Slide fail" );
        $("#slidebody").append("");
      })
}
function getBlogByCategory(category){
    console.log('start in getBlogByCategory:'+category);
    $("#blogbody").empty();
    $.get('./'+category+'.yaml', function(res){
        var obj = jsyaml.load(res);
        //console.log(obj);
        genBlogElm(obj);
    }).done(function(){
        console.log("Blog done")
    }).fail(function() {
        //alert(category +'Blog is not completed,please add or update '+category+'_Blog.yaml');
        console.log( "Blog fail" );
        $("#blogbody").append(""); 
      })
}


function genBlogElm(obj){
    var dataSet = [];
    var html = '<tr>'
    var b =0;
    //console.log('genBlogElm obj:'+obj);
    for (var i in obj) {
        if(String(obj[i].dpl)=='b'){
        var object1 = [obj[i].ttl,obj[i].url];
        if(b %3==0 && b!=0){
            html+='</tr>'
            html+='<tr>'
        }
        //console.log(b +'in genBlogElm');
        html+='<td>'
        html+='<a href="'+obj[i].url+'">'
        html+=obj[i].ttl
        html+='</td>'
        // console.log('Url'+obj[i].Url)
        // console.log('Title'+obj[i].Title)
        // console.log('Blog'+':'+obj[i].Title+','+obj[i].Url)
        b=b+1;
        dataSet.push(object1);
        }
    }
    html+='</tr>'
    $("#blogbody").append(html) 
     
    //$('#escalation3').paging({limit:2});
    // $('#escalation3').dataTable({
    //     "oLanguage":{"sProcessing":"處理中...",
    //     "sLengthMenu":"顯示 _MENU_ 項結果",
    //     "sZeroRecords":"沒有匹配結果",
    //     "sInfo":"顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
    //     "sInfoEmpty":"顯示第 0 至 0 項結果，共 0 項",
    //     "sInfoFiltered":"(從 _MAX_ 項結果過濾)",
    //     "sSearch":"搜索:",
    //     "oPaginate":{"sFirst":"首頁",
    //                          "sPrevious":"上頁",
    //                          "sNext":"下頁",
    //                          "sLast":"尾頁"}
    //     }
    // });
}

function genSlideElm(obj){
    var html = '<tr>'
    var s =0;
    //console.log('genBlogElm obj:'+obj);
    for (var i in obj) {
        if(String(obj[i].dpl)=='s'){
        if(s %3==0 && s!=0){
            html+='</tr>'
            html+='<tr>'
        }
        //console.log(s +'in genSlideElm');
        html+='<td>'
        html+='<iframe frameborder="0" height="200" src="'+obj[i].src+'"width="300"></iframe>'
        html+='<div style="margin-bottom:5px"> <strong> <a href="'+obj[i].her+'" title="+'+obj[i].ttl+'target="_blank">'+obj[i].des+'</a> </strong>'
        html+='</td>'
        s=s+1;
        }
    }
    html+='</tr>'
    $("#slidebody").append(html)
    
    //$('#escalation2').paging({limit:1});  
}




function genVideoElm(obj){
    var html = '<tr align="left">'
    var v1 =0;
    //console.log('genBlogElm obj:'+obj);
    for (var i in obj) {
        console.log('dep:'+String(obj[i].dpl));
        console.log(String(obj[i].dpl)=='v');
        //console.log('dep==v:'+obj[i].ttl =='Introduction to OpenStack');
        if(String(obj[i].dpl)=='v'){
        if(v1 %3==0 && v1!=0){
            html+='</tr>'
            html+='<tr align="left">'
        }
        //console.log(v +'in genVideoElm');
        html+='<td>'
        html+='<div>'
        // html+='<ul class="playlist"">'
        //html+='<ul>'
        html+='<p>'
        html+='<a align="left" href="'+obj[i].url+'">'+obj[i].ttl+'</a>'
        //html+='<li><a href="'+obj[i].Url+'">'+obj[i].Title+'</a></li>'
        html+='</p>'
        //html+='</ul>'
        html+='<div>'
        html+='<h4>'
        html+='<a href="'+obj[i].url+'">'+obj[i].ttl+'</a>'
        html+='</h4>'
        html+='<p>'+obj[i].des+'</p>'
        html+='</div></div></div>'
        html+='</td>'
        // html+='<td>'
        // html+='<div>'
        // html+='<ul>'
        // html+='<li><a href="'+obj[i].Url+'">'+obj[i].Title+'</a></li>'
        // html+='</ul>'
        // html+='<div>'
        // html+='<h4>'
        // html+='<a href="'+obj[i].Url+'">'+obj[i].Title+'</a>'
        // html+='</h4>'
        // html+='<p>'+obj[i].Description+'</p>'
        // html+='</div></div></div>'
        // html+='</td>'

        v1=v1+1;
        }
    }
    html+='</tr>'
    $("#videobody").append(html)
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

