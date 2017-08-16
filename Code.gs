var label="MailToReportLabel";
var msg_sent="message sent";
var sender="yourname@gmail.com";
function doGet() {
    return HtmlService.createTemplateFromFile('index')
        .evaluate() // evaluate MUST come before setting the Sandbox mode
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .getContent();
}

function getData(){
  var html = "";
  var threads = GmailApp.search(label);  
  html+="<b>Messages</b>: "+threads.length+"<hr/>";
  if (threads.length > 0) {
    for (var t=0; t<threads.length; t++) {
      var msgs = threads[t].getMessages();
      var subject = threads[t].getFirstMessageSubject();
      /* Append all the threads in a message in an HTML document */
      for (var m=0; m<msgs.length; m++) {
        var msg = msgs[m];
        html += "Date: " + msg.getDate() + "<br />";
        html += msg.getBody().replace(/<img[^>]*>/g,"").replace(/<a[^>]*>/g,"").replace(/<script[^>]*>/g,"");
        html += "<hr />";
      }
    }
  }
   return html; 
}

function sendMsg(msg)
{
  GmailApp.sendEmail(sender, label, msg );
  return msg_sent; 
}

