var nav_icon = $("#nav_toggle");

var timeline_options = {
    width: '100%',
    height: '300px',
};

var timeline_groups = {

};
var menu_toggle = function(){
    var out = false;
    if (nav_icon.hasClass("glyphicon-chevron-right")){
        out = true;
    }
    var animation1 = "+=20%";
    var animation2 = "-=20%";
    if (out){
        nav_icon.toggleClass("glyphicon-chevron-left");
        nav_icon.toggleClass("glyphicon-chevron-right")
    }
    else{
        temp = animation1;
        animation1 = animation2;
        animation2 = temp;
        nav_icon.toggleClass("glyphicon-chevron-left");
        nav_icon.toggleClass("glyphicon-chevron-right")
    }
    $(".left_nav").animate({
        left: animation1
    }, 1000);
    $("#content").animate({
        width: animation2
    }, 1000);
};

var create_timeline = function(){

};

/*var change_items = function(item_list){
    for (item in item_list) {

    }
};*/

nav_icon.click(function(){
    console.log("clicked");
    menu_toggle();
});

$("#menu_in").click(function(){
    menu_toggle(False, out_icon, in_icon);
});

/*$("#timeline_nav").click({

})*/


