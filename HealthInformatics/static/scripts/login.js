/**
 * Created by neal on 11/25/14.
 */

$(document).ready(function(){
    console.log("started");
    $("#image_holder").delay(1000).animate({
        width: "-=30%",
        top: "-=20%",
        left: "+=15%"
    }, 1000);
    $("#signon").delay(2000).fadeIn(200);
});
