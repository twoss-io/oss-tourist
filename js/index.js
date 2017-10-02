$(document).ready(function(){
    getYaml()
});

function getYaml(){
    $.get('./category.yml', function(res){
        var obj = jsyaml.load(res);
        console.log(obj)
        genElm(obj)
    })
}

function genElm(obj){
    var html = '<ul>'
    for (var i = 0; i < obj.length; i++) {
        var el = obj[i];
        html+= '<li>'+el+'</li>'
    }
    html += '</ul>'
    console.log(html)
    //$("#main").append(html)
    $("#sidebar-wrapper").append(html)
}