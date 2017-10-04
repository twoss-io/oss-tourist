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
        console.log(obj)
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
        html+= '<li>'+el+'</li>'
    }
    html += '</ul>'
    console.log(html)
    //$("#main").append(html)
    $("#sidebar-wrapper").append(html)
    
}