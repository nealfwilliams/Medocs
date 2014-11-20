var nav_icon = $("#nav_toggle");

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

var tl_container = document.getElementById('timeline');

var options = {
  width: '98%',
  height: '250px',
  padding: 5,
  margin: {
    item: 8
  }
};

var timeline = new vis.Timeline(tl_container, test_items, options);

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

var clipboard_position = 1;

var clipboard_resize = function(amt1, amt2) {

    $("#clipboard").animate({
        height: amt1,
        top: amt2
    }, 1000);
    $("#clipboard_toolbar").animate({
        top: amt2
    }, 1000);

    $("#content_manager").animate({
        height: amt2
    }, 1000);
    timeline.setOptions(options);
};

var clipboard_toggle = function(direction){
    if (direction == "up") {
        if (clipboard_position == 1) {
            clipboard_resize("+=50%", "-=50%");
            clipboard_position ++;
        }
        if (clipboard_position == 0) {
            options["height"] = "250px";
            clipboard_resize("+=45%", "-=45%");
            clipboard_position ++;
        }
    }
    else {
        if (clipboard_position == 1) {
            options["height"] = "450px";
            clipboard_resize("-=45%", "+=45%");
            clipboard_position --;
        }
        if (clipboard_position == 2) {
            options["height"] = "250px";
            clipboard_resize("-=50%", "+=50%");
            clipboard_position --;
        }
    }
};

$("#clipboard_slider_up").click(function(){
    clipboard_toggle("up");
});

$("#clipboard_slider_down").click(function(){
    clipboard_toggle("down");
});

nav_icon.click(function(){
    console.log("clicked");
    menu_toggle();
});

$("#menu_in").click(function(){
    menu_toggle(False, out_icon, in_icon);
});

$(".nav_content").on("nav_toggle", function() {
    console.log("nav toggle called");
    $(this).children(".check_items").show();
    var notClicked = $('.nav_content').not(this);
    notClicked.each(function() {
        $(this).children(".check_items").hide();
    });
});

$(".cm_widget").on("cm_toggle", function()  {
    console.log("cm toggle called");
    $(this).show();
    var name = $(this).attr("name");
    var patient = "Marla";
    $("#cm_header").html(patient + "'s " + name);
    var notTriggered = $('.cm_widget').not(this);
    notTriggered.each(function() {
        $(this).hide();
    });
});

$(".nav_item").click(function(){
    var content = $(this).children(".nav_content");
    var item_id = $(this).attr("id");
    item_id = "#" + item_id.substring(0, item_id.length - 4);
    console.log(item_id);
    $(item_id).trigger("cm_toggle");
    content.trigger("nav_toggle");
});

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
var selected_groups = [];

var select_groups = function(){
    for (index in selected){
        if (selected[index]) {
            selected_groups.push(groups[index]);
        }
    }
};

$(".check_items").change(function(){
    selected = [];
    selected_groups = [];
    $(this).children('input').each(function(){
        selected.push($(this).prop('checked'));
    });
    select_groups();
    timeline.clear(groups);
    timeline.setGroups(selected_groups);
    drawTable(selected_groups);
});

timeline.setGroups(selected_groups);
$("#profile").trigger("cm_toggle");

var full_table = [
    {
        "date1": "01-01-1984",
        "date2": "01-01-2014",
        "encounter": null,
        "medication": null,
        "problem": null,
        "procedure": null,
        "results": null,
        "social history": "Former Smoker"
    },
    {
        "date1": "04-23-11",
        "date2": null,
        "encounter": "Annual Physical Exam",
        "medication": "Lasix 40mg",
        "problem": null,
        "procedure": null,
        "results": "Lab Results",
        "social history": null
    },
    {
        "date1": "04-23-11",
        "date2": null,
        "encounter": null,
        "medication": "Propranolol Extended Release 60 mg",
        "problem": null,
        "procedure": null,
        "results": null,
        "social history": null
    },
    {
        "date1": "04-24-11",
        "date2": null,
        "encounter": "Annual Physical Exam",
        "medication": null,
        "problem": null,
        "procedure": null,
        "results": null,
        "social history": null
    },
    {
        "date1": "04-25-11",
        "date2": null,
        "encounter": "Annual Physical Exam",
        "medication": null,
        "problem": null,
        "procedure": null,
        "results": null,
        "social history": null
    },
    {
        "date1": "N/A",
        "date2": null,
        "encounter": null,
        "medication": null,
        "problem": "Diabetes Mellitus",
        "procedure": null,
        "results": null,
        "social history": null
    },
    {
        "date1": "N/A",
        "date2": null,
        "encounter": null,
        "medication": null,
        "problem": "Essential Hyptertension",
        "procedure": null,
        "results": null,
        "social history": null
    },
    {
        "date1": "N/A",
        "date2": null,
        "encounter": null,
        "medication": null,
        "problem": "Simple chronic bronchitis",
        "procedure": null,
        "results": null,
        "social history": null
    },
    {
        "date1": "N/A",
        "date2": null,
        "encounter": null,
        "medication": null,
        "problem": "Coronary artery disease",
        "procedure": null,
        "results": null,
        "social history": null
    }
];

$(".clipboard_trigger").click(function(){
    var id = $(this).attr("id");
    var data = findData(id);
    draw_widget(data);
});

var findData = function(id){
    data = {"id": id, "name":"Example "+ id};
    return data;
};

var draw_widget = function(data) {
    var html = "<div class='textbox clipboard_widget' id= '" + data["id"] + "_widget'>" + "\
        <div class='header'> \
        <h3> " + data["name"] + "</h3></div>";
    $("#default_text").hide();
    $("#clipboard").prepend(html);
};
/*var drawTable = function(){
    for ();

};*/

