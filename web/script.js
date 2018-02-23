$(function() {
    var lastrecieved=0;

$(document).ready(function () {
    initchat();
    initcontact();

});

$("#sendbtn").click(sendMessage);


function initcontact() {
    setInterval(ajaxcallContact, 20000);
}
function initchat() {
    setInterval(ajaxcallChat, 10000);
}
function ajaxcallChat() {
    //$('.msgRow').remove();
  
    var jsonDa = {"lastid": 0};
    $.ajax({url: "MainServlet", contentType: 'application/json', data: jsonDa, dataType: 'json', type: 'POST', success: function (result) {
            for (var i = 0; i < result.length; i++) {
                $('#chatarea').append('<div class="msgrow"><p class="msgname">' + result[i].name + '</p><br><p class="msgbody">' + result[i].body + '</p></div>');
            }
            if(result.length-1>0){
            lastrecieved = result[result.length - 1].id;
            }else{lastrecieved=0;}
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
    
    var name = "owner";//$("#msgOwner").html;
    var body = $("#txtmsg").val();
    $("#txtmsg").val = "";

    var jsonData = {"name": name, "body": body};

    $.ajax({url: "MainServlet", contentType: 'application/json', data: jsonData, dataType: 'json', type: 'GET', success: function (result) {
            alert(result.body);//           

        }});

}
});