$(document).ready(function(){
    getYaml();
	$("#navList").addClass("sidebar-nav");
    $("#main").addClass("sidebar-toggle")
});

function getYaml(){
    $.get('../../category.yaml', function(res){
        var obj = jsyaml.load(res);
        console.log(obj)
        genElm(obj)
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
    $("#main").append(html)
  
}