var lastrecieved = 0;
$(document).ready(function () {
    initchat();
    initcontact();

});
$("#sendbtn").click(sendMessage);
function initcontact() {
    setInterval(ajaxcallContact, 8000);
}
function initchat() {
    setInterval(ajaxcallChat, 5000);
}
function ajaxcallChat() {
    //$('.msgRow').remove();
    $('.tablerow').remove();

    // var jsonDa = {"lastid": 0};
    $.ajax({url: "MainServlet", contentType: 'application/json', dataType: 'json', type: 'POST', success: function (result) {
            for (var i = 0; i < result.length; i++) {
                //  $('#chatarea').append('<div class="msgrow"><p class="msgname">' + result[i].name + ': </p><p class="msgbody">' + result[i].body + '</p></div>');
                $('#myTable').append('<tr class="tablerow"><td>' + result[i].name + '</td><td>' + result[i].body + '</td></tr>');

            }
//            if(result.length-1>0){
//            lastrecieved = result[result.length - 1].id;
//            }else{lastrecieved=0;}
        }});
}
function ajaxcallContact() {
    $('.tablerow2').remove();
    $.ajax({url: "LoadContacts", contentType: 'application/json', dataType: 'json', type: 'POST', success: function (result) {
            for (var i = 0; i < result.length; i++) {
                // $('#contactarea').append('<div class="contactrow"><p class="contactname">' + result[i].name + '</p><p class="contactstatus">' + result[i].status + '</p></div>');
                $('#myTable2').append('<tr class="tablerow2"><td>' + result[i].name + '</td><td>' + result[i].status + '</td></tr>');
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