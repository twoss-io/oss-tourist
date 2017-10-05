$(document).ready(function(){
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
    var html = '<ul id="navList">'
    for (var i = 0; i < obj.length; i++) {
        var el = obj[i];
        html+= '<li><a href="'+'#'+'" onclick="getCategory('+'\''+el+'\''+');">'+el+'</a></li>'
        //html+= '<li>'+el+'</li>'
    }
    html += '</ul>'
    //$("#main").append(html)
    $("#sidebar-wrapper").append(html)
    
}

function getCategory(category){
    console.log(category);
    getVideoByCategory(category);
    getSlideByCategory(category);
    getBlogByCategory(category);
}

function getVideoByCategory(category){
    //Todo
    console.log('start in getVideoByCategory:'+category);
    $.get('./'+category+'_Video.yaml', function(res){
        var obj = jsyaml.load(res);
        console.log(obj);
        genVideoElm(obj);
    }).done(function(){
        console.log("Video done")
    }).fail(function() {
        //alert(category +'video is not completed,please add or update '+category+'_Video.yaml');
        console.log( "Video fail" );
        $("#videobody").append("");
      })
}
function getSlideByCategory(category){
    console.log('start in getSlideByCategory:'+category);
    $.get('./'+category+'_Slide.yaml', function(res){
        var obj = jsyaml.load(res);
        console.log(obj);
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
    //Todo
    console.log('start in getBlogByCategory:'+category);
    $.get('./'+category+'_Blog.yaml', function(res){
        var obj = jsyaml.load(res);
        console.log(obj);
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
    var html = '<tr>'
    //console.log('genBlogElm obj:'+obj);
    for (var i in obj) {
        html+='<td>'
        html+='<a href="'+obj[i].Url+'">'
        html+=obj[i].Title
        html+='</td>'
        console.log('Url'+obj[i].Url)
        console.log('Title'+obj[i].Title)
    }
    html+='</tr>'
    $("#blogbody").append(html)  
}

function genSlideElm(obj){
    var html = '<tr>'
    //console.log('genBlogElm obj:'+obj);
    for (var i in obj) {
        html+='<td>'
        html+='<iframe frameborder="0" height="200" src="'+obj[i].Src+'"width="300"></iframe>'
        html+='<div style="margin-bottom:5px"> <strong> <a href="'+obj[i].Href+'" title="+'+obj[i].Title+'target="_blank">'+obj[i].Description+'</a> </strong>'
        html+='</td>'
    }
    html+='</tr>'
    $("#slidebody").append(html)  
}




function genVideoElm(obj){
    var html = '<tr>'
    //console.log('genBlogElm obj:'+obj);
    for (var i in obj) {
        html+='<td>'
        html+='<div class="card h-100">'
        html+='<ul class="playlist">'
        html+='<li><a href="'+obj[i].Url+'">'+obj[i].Title+'</a></li>'
        html+='</ul>'
        html+='<div class="card-body">'
        html+='<h4 class="card-title">'
        html+='<a href="'+obj[i].Url+'">'+obj[i].Title+'</a>'
        html+='</h4>'
        html+='<p class="card-text">'+obj[i].Description+'</p>'
        html+='</div></div></div>'
        html+='</td>'
        
    }
    html+='</tr>'
    $("#videobody").append(html)
      
}

