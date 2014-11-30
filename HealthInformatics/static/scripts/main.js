var nav_icon = $("#nav_toggle");

var num_tabs = 0;

var test_items = new vis.DataSet([
  ]);

// Sample data, this is now populated via JSON
/*
    {id: 1, content: 'Lasix 40mg', group: 'Medications', start: '2011-04-23'},
    {id: 4, content: 'cccccccccc', group: 'Encounters', start: '2013-04-25'},
    {id: 5, content: 'item 3', start: '2013-04-18'},
    {id: 6, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
*/


var tl_container = document.getElementById('timeline');

var options = {
  width: '98%',
  height: '250px',
  padding: 5,
  margin: {
    item: 8
  },
  start: '2005',
  end: '2015'
};


var timeline = new vis.Timeline(tl_container, test_items, options);
timeline.on('select', function (properties) {
    var id = properties.items[0];
    var data = findData(id);
    var id_widget = data["id"];
    if(id.match("^vitals") || id.match("^lab") ) {
        //Vitals and Lab have multiple entries so to map to proper id
        // we have to remove last 2 chars (ie lab-1-2 becomes lab-1 which
        // matches the element id to lookup for data)
        id_widget = id.slice(0,-2);
        data["id"] = id_widget;
    }
    var id_tag = "#" + id_widget + "_widget";
        if (!($(id_tag).length)) {
        draw_widget(data);
    }
});

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
    console.log(item_id);
    item_id = "#" + item_id.substring(0, item_id.length - 4);
    console.log(item_id);
    $(item_id).trigger("cm_toggle");
    content.trigger("nav_toggle");

});

groups = [
   {
     id: "Allergies",
     content: "Allergies"
   },
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
    id: "Functional Status",
    content: "Functional Status"
  },
  {
    id: "Immunization",
    content: "Immunization"
  },
  {
    id: "Declined Immunizations",
    content: "Declined Immunizations"
  },
  {
    id: "Problems",
    content: "Problems"
  },
  {
    id: "Procedures",
    content: "Procedures"
  },
  {
    id: "Lab Results",
    content: 'Lab Results'
  },
  {
    id: "Vitals",
    content: 'Vitals'
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
    drawTable();
});

function drawTable() {

}

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

var pretty_name = function(node){
    if (node["name"]){
        return node["name"];
    }
    else if (node["text"]){
        return(node["text"]);
    }
    else {
        return false;
    }
};

var findData = function(id){
    var data = $("#" + id).data("json-record");
    var name;
    if (pretty_name(data)) {
        name = pretty_name(data);
    }
    else {
        name = id;
    }
    var return_data = {"id": id, "name":name };
    return return_data;
};

var draw_tab = function(id, name) {
    var html = "<div class='tab' id='" + id + "_tab'>" +
        "<div class='header'>" + name +
        "</div><span class='glyphicon glyphicon-remove tab_remove' " + "name='" + id + "'></span></div>";
    if (num_tabs < 10) {
        num_tabs = num_tabs + 1;

        $("#clipboard_toolbar").append(html);
        resize_tabs();
        $(".tab_remove").unbind();
        $(".tab_remove").click(function () {
            console.log("close fired");
            var name = $(this).attr("name");
            console.log(name);
            num_tabs = num_tabs - 1;
            remove_widget(name);
            resize_tabs();
        });
    }
};

var resize_tabs = function() {
    if (num_tabs > 4) {
            tabwidth = String(75 / num_tabs) + "%";
            headerwidth = String(70 - num_tabs) + "%";
            $(".tab").css("width", tabwidth);
            $(".tab>.header").css("width", headerwidth);
        }
};



var check_nullity = function(node){
    if (!(node)) {
        return true;
    }
    if (typeof(node) != "object"){
        return false;
    }
    var helper_bool = true;
    for (index in node) {
        helper_bool = helper_bool && check_nullity(node[index]);
    }
    return helper_bool;
};

var render_node = function(key, node){

    var html_return = "";
    if (check_nullity(node)){
        return html_return;
    }

    if (typeof(node) != "object") {
        html_return = "<div class='leaf_header'>" + String(key) + ":</div><div class='leaf'>" + String(node) + "</div>";
        return html_return;
    }

    html_return = "<div class='node_header'>" + String(key) + ":</div><div class='node'>";
    for (index in node) {
        html_return = html_return + render_node(index, node[index]);
    }

    html_return = html_return + "</div>";
    return html_return;
};

var draw_widget = function(data) {
    // This needs to be cleaned up,
    // quick fix is to recursively iterate through json and print out leaf values

    var id = data["id"];
    var name = data["name"];
    var html = "<div class='textbox clipboard_widget' id= '" + id + "_widget'>" + "\
        <div class='header'> \
        <h3> " + data["name"] + "</h3></div> \
        <div class='widget_content'>";

    var $source_widget = $('#' + id);
    var $json_data = $source_widget.data("json-record");
    $.each($json_data, function(key, value) {
        if(value) {
            html = html +  render_node(key, value);
        }
    });

    html = html + "</div></div>";

    draw_tab(id, name);
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
};

$(".tab_remove").click(function() {
    console.log("close fired");
    var name = $(this).attr("name");
    remove_widget(name);
});

$("#accordion").accordion({ heightStyle : "content"});

var space_to_underscore = function(my_string){
    return my_string.split(" ").join("_");
};

function populateTable()  {
    var table_data = test_items.get();
    for (index in table_data) {
        var row = table_data[index];
        html = "<tr id='" + row['id'] + "' class='clipboard_trigger'>" +
        "<td>" + $.trim(row["start"]) + "</td>" +
        "<td>" + $.trim(row["end"]) + "</td>" +
        "<td>" + $.trim(row["group"]) + "</td>" +
        "<td>" + $.trim(row["content"]) + "</td>" +
        "</tr>";
    $('#patient_table_body').append(html);
    }
}
//register_trigger();

function updateDemographics(bbDoc) {
    var $patient_info = $('#patient_info');

    if(bbDoc.data.demographics.dob != null) {
        var $birthdate = $.datepicker.formatDate('MM dd, yy', new Date(bbDoc.data.demographics.dob));
    }

    var $patient_details = '<div class="textbox cm_textbox" id="patient_info"> ' +
                        '<div class="header">' +
                        '<h3> Patient Details</h3>' +
                        '</div>' +
                        '<div class="widget_content">' +
                            '<p> Last Name: ' + bbDoc.data.demographics.name.family + '</p>' +
                            '<p> First Name: ' + bbDoc.data.demographics.name.given + '</p>' +
                            '<p> Gender: ' + bbDoc.data.demographics.gender + '</p>' +
                            '<p> Date of Birth: </p>' + $birthdate + '</p>' +
                            '<p> Address: </p>' +
                            '<p>' + bbDoc.data.demographics.address.street + '</p>' +
                            '<p>' + bbDoc.data.demographics.address.city + ", " +
                            bbDoc.data.demographics.address.state + " " +
                            bbDoc.data.demographics.address.zip + '</p>' +
                            '<p>'
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

function updatePatientDemo(bbDoc) {
    var $custodian_info = $('#custodian_info');

    if(bbDoc.data.demographics.dob != null) {
        var $birthdate = $.datepicker.formatDate('MM dd, yy', new Date(bbDoc.data.demographics.dob));
        var dob = new Date($birthdate);
        var today = new Date();
        var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
    }

    var $custodian_details = '<div class="textbox cm_textbox" id="custodian_info"> ' +
                        '<div class="header">' +
                        '<h3>Patient Overview</h3>' +
                        '</div>' +
                        '<div class="widget_content">' +
                            '<p>Age: ' + age + '</p>' +
                            '<p>Sex: ' + bbDoc.data.demographics.gender + '</p>' +
                            '<p>Primary Language: ' + bbDoc.data.demographics.language + '</p>' +
                            '<p>Race: ' + bbDoc.data.demographics.race + '</p>' +
                            '<p><b>Contact Info:' + '</p>' +
                            '<p>Home Phone: ' + bbDoc.data.demographics.phone.home + '</p>' +
                            '<p>Work Phone: ' + bbDoc.data.demographics.phone.work + '</p>' +
                            '<p>Mobile Phone: ' + bbDoc.data.demographics.phone.mobile + '</p>' +
                            '</p>Email: ' + bbDoc.data.demographics.email + '</p>' +
                        '</div>' +
                    '</div>';
    $custodian_info.replaceWith($custodian_details);
}

function populateAllergies(bbDoc) {
    var $allergies_data = $('#allergies-data');
    var allergiesData = bbDoc.data.allergies;
    $.each(allergiesData, function(i, record) {
        var $allergy_record = $("<p class='clipboard_trigger' id='allergy-" + i + "'>Date Range:" +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date_range.start)) +
            " to " +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date_range.end)) +
            "  -  " + record.reaction.name + " - Allergen: " + record.allergen.name +
            "</p>");
        $allergy_record.data("json-record", record);
        $allergies_data.append($allergy_record);

           // Add formatted record to timeline data
        var timeline_start = $.datepicker.formatDate('yy-mm-dd', new Date(record.date_range.start));
        var timeline_end = $.datepicker.formatDate('yy-mm-dd', new Date(record.date_range.end));
        test_items.add({id: "allergy-" + i, content: "Allergen: " + record.allergen.name, group: 'Allergies', start: timeline_start, end: timeline_end});
    });
}

function populateCarePlan(bbDoc) {
    var $care_plan_data = $('#care-plan-data');
    var carePlanData = bbDoc.data.care_plan;
    $.each(carePlanData, function(i, record) {

        var care_plan_record_str = "<p class='clipboard_trigger' id='care-plan-" + i + "'>";
        if (record.text != null) {
            care_plan_record_str += record.text + " ";

        }
        if (record.name != null) {
            care_plan_record_str += " - " + record.name;
        }
        care_plan_record_str += "</p>";

        var $care_plan_record = $(care_plan_record_str);
        $care_plan_record.data("json-record", record);
        $care_plan_data.append($care_plan_record);
        // No date associated, so we don't add to timeline
    });
}


function populateEncounters(bbDoc) {
    // Each encounter record has an id of 'encounter-X', also the full
    // json record is attached via jquery.data/ for easy access in clipboard

    var $encounters_data = $('#encounters-data');
    var encountersData = bbDoc.data.encounters;
    $.each(encountersData, function(i, record) {
        var $encounter_record = $("<p class='clipboard_trigger' id='encounter-" + i + "'>Date:" +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date)) +
            "  -  Primary Reason : " + record.name +
            "</p>");
        $encounter_record.data("json-record", record);
        $encounters_data.append($encounter_record);

            // Add formatted record to timeline data
        var timeline_date = $.datepicker.formatDate('yy-mm-dd', new Date(record.date));
        test_items.add({id: "encounter-" + i, content: record.name, group: 'Encounters', start: timeline_date});
    });
}

function populateFunctionalStatus(bbDoc) {
    var $func_stat_data = $('#functional-status-data');
    var funcStatData = bbDoc.data.functional_statuses;
    $.each(funcStatData, function(i, record) {
        var $func_stat_record = $("<p class='clipboard_trigger' id='functional-status-" + i + "'>Date:" +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date)) +
            "  -  Functional Status : " + record.name +
            "</p>");
        $func_stat_record.data("json-record", record);
        $func_stat_data.append($func_stat_record);

            // Add formatted record to timeline data
        var timeline_date = $.datepicker.formatDate('yy-mm-dd', new Date(record.date));
        test_items.add({id: "functional-status-" + i, content: record.name, group: 'Functional Status', start: timeline_date});
    });
}

function populateImmunizationStatus(bbDoc) {
    var $immune_data = $('#immunizations-data');
    var immuneData = bbDoc.data.immunizations;
    $.each(immuneData, function(i, record) {
        var $immune_record = $("<p class='clipboard_trigger' id='immunization-" + i + "'>Date:" +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date)) +
            "  -  Immunization : " + record.product.name +
            "</p>");
        $immune_record.data("json-record", record);
        $immune_data.append($immune_record);

            // Add formatted record to timeline data
        var timeline_date = $.datepicker.formatDate('yy-mm-dd', new Date(record.date));
        test_items.add({id: "immunization-" + i, content: "Immunization:" + record.product.name, group: 'Immunization', start: timeline_date});
    });
}

function populateDelImmunizationStatus(bbDoc) {
    var $immune_data = $('#declined-immunizations-data');
    var immuneData = bbDoc.data.immunization_declines;
    $.each(immuneData, function(i, record) {
        var $immune_record = $("<p class='clipboard_trigger' id='declined-immunization-" + i + "'>Date:" +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date)) +
            "  -  Declined Immunization : " + record.product.name +
            "</p>");
        $immune_record.data("json-record", record);
        $immune_data.append($immune_record);

            // Add formatted record to timeline data
        var timeline_date = $.datepicker.formatDate('yy-mm-dd', new Date(record.date));
        test_items.add({id: "declined-immunization-" + i, content: "Declined Immunization:" + record.product.name, group: 'Declined Immunizations', start: timeline_date});
    });
}

function populateMedication(bbDoc) {
    var $medication_data = $('#medication-data');
    var medicationData = bbDoc.data.medications;
    $.each(medicationData, function(i, record) {
        var $medication_record = $("<p class='clipboard_trigger' id='medication-" + i + "'>Date Range:" +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date_range.start)) +
            " to " +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date_range.end)) +
            "  -  " + record.text +
            "</p>");
        $medication_record.data("json-record", record);
        $medication_data.append($medication_record);

    // Add formatted record to timeline data
        var timeline_start = $.datepicker.formatDate('yy-mm-dd', new Date(record.date_range.start));
        var timeline_end = $.datepicker.formatDate('yy-mm-dd', new Date(record.date_range.end));
        test_items.add({id: "medication-" + i, content: record.text, group: 'Medications', start: timeline_start, end: timeline_end});
    });
}

function populateProblems(bbDoc) {
    var $problems_data = $('#problems-data');
    var problemsData = bbDoc.data.problems;
    $.each(problemsData, function(i, record) {
        var $problem_record = $("<p class='clipboard_trigger' id='problem-" + i + "'>Date Range:" +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date_range.start)) +
            " to " +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date_range.end)) +
            "  -  " + record.name + " - Current Status: " + record.status +
            "</p>");
        $problem_record.data("json-record", record);
        $problems_data.append($problem_record);

    // Add formatted record to timeline data
        var timeline_start = $.datepicker.formatDate('yy-mm-dd', new Date(record.date_range.start));
        var timeline_end = $.datepicker.formatDate('yy-mm-dd', new Date(record.date_range.end));
        test_items.add({id: "problem-" + i, content: record.name, group: 'Problems', start: timeline_start, end: timeline_end});
    });
}

function populateProcedures(bbDoc) {
    var $procedure_data = $('#procedure-data');
    var procData = bbDoc.data.procedures;
    $.each(procData, function(i, record) {
        var $proc_record = $("<p class='clipboard_trigger' id='procedure-" + i + "'>Date:" +
            $.datepicker.formatDate('MM dd, yy', new Date(record.date)) +
            "  -  Procedure : " + record.name +
            "</p>");
        $proc_record.data("json-record", record);
        $procedure_data.append($proc_record);

            // Add formatted record to timeline data
        var timeline_date = $.datepicker.formatDate('yy-mm-dd', new Date(record.date));
        test_items.add({id: "procedure-" + i, content: record.name, group: 'Procedures', start: timeline_date});
    });
}

function populateResultsLab(bbDoc) {
    var $lab_data = $('#lab-data');
    var labData = bbDoc.data.results;
    $.each(labData, function(i, record) {
        var lab_record_str = "<p class='clipboard_trigger' id='lab-" + i + "'>Lab Work:" +
            "  -  Test Name : " + record.name;
            var testData = record.tests;
            $.each(testData, function(j , test_record) {
                lab_record_str += "<br>" + $.datepicker.formatDate('MM dd, yy', new Date(test_record.date));
                lab_record_str += " Name: " + test_record.name + " " + test_record.value + " " + test_record.unit;

                // Add individual lab report to timeline
                var timeline_date = $.datepicker.formatDate('yy-mm-dd', new Date(test_record.date));
                test_items.add({id: "lab-" + i + "-" + j, content: record.name + " " + test_record.value, group: 'Lab Results', start: timeline_date});
            });

        lab_record_str += "</p>";
        $lab_record = $(lab_record_str);
        $lab_record.data("json-record", record);
        $lab_data.append($lab_record);
    });
}

function populateVitals(bbDoc) {
    var $vitals_data = $('#vitals-data');
    var vitalsData = bbDoc.data.vitals;
    $.each(vitalsData, function(i, record) {
        var vitals_record_str = "<p class='clipboard_trigger' id='vitals-" + i + "'>Measurements :";
        var testData = record.results;
        $.each(testData, function(j , test_record) {
            vitals_record_str += "<br>" + $.datepicker.formatDate('MM dd, yy', new Date(record.date));
            vitals_record_str += " Name: " + test_record.name + " " + test_record.value + " " + test_record.unit;

            // Add individual vitals measurement to timeline
            var timeline_date = $.datepicker.formatDate('yy-mm-dd', new Date(record.date));
            test_items.add({id: "vitals-" + i + "-" + j, content: test_record.name + " " + test_record.value + " " + test_record.unit, group: 'Vitals Measurement', start: timeline_date});
        });

        vitals_record_str += "</p>";
        $vitals_record = $(vitals_record_str);
        $vitals_record.data("json-record", record);
        $vitals_data.append($vitals_record);
    });
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
    test_items.clear();

    updateHeaders(bbDoc);
    updateDemographics(bbDoc);
    updateAuthor(bbDoc);
    updatePatientDemo(bbDoc);
    populateAllergies(bbDoc);
    populateCarePlan(bbDoc);
    populateEncounters(bbDoc);
    populateFunctionalStatus(bbDoc);
    populateImmunizationStatus(bbDoc);
    populateDelImmunizationStatus(bbDoc);
    populateMedication(bbDoc);
    populateProblems(bbDoc);
    populateProcedures(bbDoc);
    populateResultsLab(bbDoc);
    populateVitals(bbDoc);

    populateTable();

    register_trigger();
    $("#patient_table").tablesorter();
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
