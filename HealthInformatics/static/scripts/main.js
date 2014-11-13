var nav_icon = $("#nav_toggle");

var menu_toggle = function(){
    var out = false;

    if (nav_icon.hasClass("glyphicon-chevron-right")){
        out = true;
    }

    var animation1 = "+=15%";
    var animation2 = "-=15%";

    if (out)
    {
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


$(".nav_content").click(function() {
    console.log("function called");
    $(this).children(".check_items").show();
    var notClicked = $('.nav_content').not(this);
    notClicked.each(function() {
        $(this).children(".check_items").hide();
    });
});

var container = document.getElementById('visualization');
var options = {
  width: '100%',
  padding: 5,
  height: '250px',
  margin: {
    item: 8
  }
};

var test_items = new vis.DataSet([
    {id: 1, content: 'Lasix 40mg', group: 'Medications', start: '2011-04-23'},
    {id: 2, content: 'Annual Physical Exam', group: 'Encounters', start: '2011-04-23'},
    {id: 3, content: 'bbbbbbbbbb', group: 'Encounters', start: '2011-04-24'},
    {id: 4, content: 'cccccccccc', group: 'Encounters', start: '2013-04-25'},
    {id: 5, content: 'item 3', start: '2013-04-18'},
    {id: 6, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
    {id: 7, content: 'item 5', start: '2013-04-25'},
    {id: 8, content: 'item 6', start: '2013-04-27'}
  ]);

var timeline = new vis.Timeline(container, test_items, options);

groups = [
  {
    id: "Medications",
    content: 'Medications'
    // Optional: a field 'className', 'style'
  },
  {
    id: "Encounters",
    content: 'Encounters'
    // Optional: a field 'className', 'style'
  },
  {
    id: "Conditions",
    content: 'Conditions'
    // Optional: a field 'className', 'style'
  },
  {
    id: "Lab Results",
    content: 'Lab Results'
    // Optional: a field 'className', 'style'
  },
  {
    id: "Social History",
    content: 'Social History'
    // Optional: a field 'className', 'style'
  },
  {
    id: "Procedures",
    content: 'Procedures'
    // Optional: a field 'className', 'style'
  }
];
var selected = [];
var timeline_groups = [];

var select_groups = function(){
    for (index in selected){
        if (selected[index]) {
            timeline_groups.push(groups[index]);
        }
    }
};

$(".check_items").change(function(){
    selected = [];
    timeline_groups = [];
    $(this).children('input').each(function(){
        selected.push($(this).prop('checked'));
    });
    select_groups();
    timeline.clear(groups);
    timeline.setGroups(timeline_groups);
});


timeline.setGroups(timeline_groups);

var create_timeline = function(){
};
/*$("#timeline_nav").click({

})*/


