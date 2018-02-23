$(document).ready(function () {
    var lastrecievedmasg=0;
   // var lastrecievedmasg=0;
    initcontact();
    initchat();
    $("#sendbtn").click(sendMessage);

});
//$(document).ready(function(){
//});

//$(document).ready(setInterval(ajaxcall, 5000));
function initcontact() {
    setInterval(ajaxcallContact, 10000);
}
function initchat() {
    setInterval(ajaxcallChat, 3000);
}
function ajaxcallChat() {
  //  $('.msgRow').remove();
    $.ajax({url: "MainServlet", contentType: 'application/json', dataType: 'json', type: 'POST', success: function (result) {
            for (var i = 0; i < result.length; i++) {
                $('#chatarea').append('<div class="msgrow"><p class="msgname">' + result[i].name + '</p><br><p class="msgbody">' + result[i].body + '</p></div>');
            }
            lastrecieved=result[result.length-1].id;

        }});
}
function ajaxcallContact() {
     $('.contactrow').remove();
     $.ajax({url: "LoadContacts", contentType: 'application/json', dataType: 'json', type: 'POST', success: function (result) {
            for (var i = 0; i < result.length; i++) {
                $('#contactarea').append('<div class="contactrow"><p class="contactname">' + result[i].name + '</p><p class="contactstatus">' + result[i].status + '</p></div>');
            }
            

        }});
}
function sendMessage() {
    var id=lastrecieved;
    var name = $("#chatOwner").html();
    var body = $("#txtmsg").val();
    $("#txtmsg").val = "";

    var jsonData = {"id": id,"name": name, "body": body};

    $.ajax({url: "MainServlet", contentType: 'application/json', data: jsonData, dataType: 'json', type: 'GET', success: function (result) {
//            $("#done").html("");
//            $("#done").html("done");
        }});

}
