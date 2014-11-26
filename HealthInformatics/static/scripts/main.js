var nav_icon = $("#nav_toggle");

var num_tabs = 0;

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
    var patient = selectedPatient;
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
        "encounter": "",
        "medication": "",
        "problem": "",
        "procedure": "",
        "results": "",
        "social history": "Former Smoker"
    },
    {
        "date1": "04-23-11",
        "date2": "",
        "encounter": "Annual Physical Exam",
        "medication": "Lasix 40mg",
        "problem": "",
        "procedure": "",
        "results": "Lab Results",
        "social history": ""
    },
    {
        "date1": "04-23-11",
        "date2": "",
        "encounter": "",
        "medication": "Propranolol Extended Release 60 mg",
        "problem": "",
        "procedure": "",
        "results": "",
        "social history": ""
    },
    {
        "date1": "04-24-11",
        "date2": "",
        "encounter": "Annual Physical Exam",
        "medication": "",
        "problem": "",
        "procedure": "",
        "results": "",
        "social history": ""
    },
    {
        "date1": "04-25-11",
        "date2": "",
        "encounter": "Annual Physical Exam",
        "medication": "",
        "problem": "",
        "procedure": "",
        "results": "",
        "social history": ""
    },
    {
        "date1": "N/A",
        "date2": "",
        "encounter": "",
        "medication": "",
        "problem": "Diabetes Mellitus",
        "procedure": "",
        "results": "",
        "social history": ""
    },
    {
        "date1": "N/A",
        "date2": "",
        "encounter": "",
        "medication": "",
        "problem": "Essential Hyptertension",
        "procedure": "",
        "results": "",
        "social history": ""
    },
    {
        "date1": "N/A",
        "date2": "",
        "encounter": "",
        "medication": "",
        "problem": "Simple chronic bronchitis",
        "procedure": "",
        "results": "",
        "social history": ""
    },
    {
        "date1": "N/A",
        "date2": "",
        "encounter": "",
        "medication": "",
        "problem": "Coronary artery disease",
        "procedure": "",
        "results": "",
        "social history": ""
    }
];

var register_trigger = function(){
    $(".clipboard_trigger").click(function(){
        var id = $(this).attr("id");
        var data = findData(id);
        var id_tag = "#" + data["id"] + "_widget";
        if (!($(id_tag).length)) {
            draw_widget(data);
        }
    });
};

var findData = function(id){
    data = {"id": id, "name":"Example "+ id};
    return data;
};

var draw_tab = function(id) {
    var html = "<div class='tab' id='" + id + "_tab'>" +
        "<div class='header'> Example " +
        "<span class='glyphicon glyphicon-remove tab_remove' " + "name='" + id + "'></span></div></div>";
    if (num_tabs < 10) {
        num_tabs = num_tabs + 1;
        if (num_tabs > 4) {
            tabwidth = str(80 / num_tabs) + "%";
            $(".tab").css("width", tabwidth);
        }
        $("#clipboard_toolbar").append(html);
        $(".tab_remove").unbind();
        $(".tab_remove").click(function () {
            console.log("close fired");
            var name = $(this).attr("name");
            console.log(name);
            remove_widget(name);
        });
    }
};

var draw_widget = function(data) {
    var id = data["id"];
    var html = "<div class='textbox clipboard_widget' id= '" + id + "_widget'>" + "\
        <div class='header'> \
        <h3> " + data["name"] + "</h3></div> \
        <div class='widget_content'></div></div>";
    draw_tab(id);
    $("#default_text").hide();
    $("#clipboard").prepend(html);
    $(".clipboard_widget").draggable({ containment: "parent", stack: ".clipboard_widget" });
    $(".clipboard_widget").resizable();
};

var remove_widget = function(name) {
    var widget_id = "#" + name + "_widget";
    var tab_id = "#" + name + "_tab";
    $(widget_id).remove();
    $(tab_id).remove();
    num_widgets --;
};

$(".tab_remove").click(function() {
    console.log("close fired");
    var name = $(this).attr("name");
    remove_widget(name);
});

$("#accordion").accordion();
/*var drawTable = function(){
    for ();

};*/

var space_to_underscore = function(my_string){
    return my_string.split(" ").join("_");

};
for (index in full_table){
    var row = full_table[index];
    console.log(row);
    html = "<tr>" +
        "<td id='" + row["date1"] + "'>" + row["date1"] + "</td>" +
        "<td id='" + row["date2"] + "'>" + row["date2"] + "</td>" +
        "<td class='clipboard_trigger' id='" + space_to_underscore(row["medication"]) + "'>" + row["medication"] + "</td>" +
        "<td class='clipboard_trigger' id='" + space_to_underscore(row["procedure"]) + "'>" + row["procedure"] + "</td>" +
        "<td class='clipboard_trigger' id='" + space_to_underscore(row["encounter"]) + "'>" + row["encounter"] + "</td>" +
        "<td class='clipboard_trigger' id='" + space_to_underscore(row["problem"]) + "'>" + row["problem"] + "</td>" +
        "<td class='clipboard_trigger' id='" + space_to_underscore(row["results"]) + "'>" + row["results"] + "</td>" +
        "<td class='clipboard_trigger' id='" + space_to_underscore(row["social history"]) + "'>" + row["social history"] + "</td>" +
        "</tr>";
    console.log(html);
    $('#patient_table tr:last').after(html);
};
register_trigger();

function updateDemographics(bbDoc) {
    var $patient_info = $('#patient_info');
    var $patient_details = '<div class="textbox cm_textbox" id="patient_info"> ' +
                        '<div class="header">' +
                        '<h3> Patient Details</h3>' +
                        '</div>' +
                        '<div class="widget_content">' +
                            '<p> Last Name: ' + bbDoc.data.demographics.name.family + '</p>' +
                            '<p> First Name: ' + bbDoc.data.demographics.name.given + '</p>' +
                            '<p> Gender: ' + bbDoc.data.demographics.gender + '</p>' +
                            '<p> Date of Birth: </p>' + bbDoc.data.demographics.dob + '</p>' +
                            '<p> Address: </p>' +
                            '<p>' + bbDoc.data.demographics.address.street + '</p>' +
                            '<p>' + bbDoc.data.demographics.address.city + ", " +
                            bbDoc.data.demographics.address.state + " " +
                            bbDoc.data.demographics.address.zip + '</p>' +
                        '</div>' +
                    '</div>';
    $patient_info.replaceWith($patient_details);
}

function updateAuthor(bbDoc) {
    var $author_info = $('#author_info');
    var $author_details = '<div class="textbox cm_textbox" id="author_info"> ' +
                        '<div class="header">' +
                        '<h3> Author Details</h3>' +
                        '</div>' +
                        '<div class="widget_content">' +
                            '<p>' + bbDoc.data.document.author.name.prefix + '.' +
                            bbDoc.data.document.author.name.given  + ' ' +
                            bbDoc.data.document.author.name.family +
                            '</p>' +
                            '<p> Address: </p>' +
                            '<p>' + bbDoc.data.document.author.address.street + '</p>' +
                            '<p>' + bbDoc.data.document.author.address.city + ", " +
                            bbDoc.data.document.author.address.state + " " +
                            bbDoc.data.document.author.address.zip + '</p>' +
                            '<p>' + bbDoc.data.document.author.phone.work + '</p>' +

                        '</div>' +
                    '</div>';
    $author_info.replaceWith($author_details);
}

function readCcd(xmlFilename) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '../static/ccd/' + xmlFilename, false);
    xhr.send();

    var bbDoc = BlueButton(xhr.responseText);
    updatePatient(bbDoc);
    updateButton(xmlFilename)
}

function updatePatient(bbDoc) {
    updateHeaders(bbDoc);
    updateDemographics(bbDoc);
    updateAuthor(bbDoc);
}

function updateHeaders(bbDoc) {
    var $header = $('#cm_header');
    $header.html(bbDoc.data.demographics.name.given + "'s Profile");

    var $nav_header = $('#patient-nav-header');
    $nav_header.html("Patient: " + bbDoc.data.demographics.name.given +
        " " + bbDoc.data.demographics.name.family);

    selectedPatient = bbDoc.data.demographics.name.given;
}

function updateButton(xmlFilename) {
    var $download_link = $('#download-link');
    $download_link.attr("download",  xmlFilename)
    $download_link.attr("href", "../static/ccd/" + xmlFilename)
}

$('#patient-select').on('change', function() {
  readCcd( this.value );

});


var selectedPatient = "Marla";

$( document ).ready(function() {
    readCcd("MarlaCCD.xml");
});
