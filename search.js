//var xmlHttp = createXmlHttpRequestObject();
var xmlHttp = new XMLHttpRequest();
function createXmlHttpRequestObject(){
  alert("It works!");
  var xmlHttp;
  if(window.ActiveXObject){
    try{
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }catch(e){
      xmlHttp = false;
    }
  }else{
    try{
      xmlHttp = new XMLHttpRequest();
    }catch(e){
      xmlHttp = false;
    }
  }
  if(!xmlHttp)
    alert("can't create that object boss!");
  else
    return xmlHttp;
}

function initialize(){
  xmlHttp.open("GET", "search.php", true);
  xmlHttp.send();
  xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState==4) {
      xmlResponse = xmlHttp.responseXML;
  }
}
}
function searchxml(){
  if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
    search = encodeURIComponent(document.getElementById('search').value);
    xmlHttp.open("GET","search.php?search="+search, true);
    alert(search);
    xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState == 4) {
    //  if (xmlHttp.status == 200) {
        alert("*****success call");
        xmlResponse = xmlHttp.responseXML;
        alert(xmlResponse);
        handleServerResponse(xmlResponse);
      //}
    }
  };
  alert("success call");
  xmlHttp.send(null);
  alert("success call");
  }
}
//else{
//   setTimeout('searchxml()', 1000);
// }
// }


function handleServerResponse(xmlResponse){
    alert("handle response success call");
  if(xmlHttp.readyState==4){
    //if(xmlHttp.status==200){
      xmlResponse = xmlHttp.responseXML;
      alert(xmlResponse);
      xmlDocumentElement = xmlResponse.documentElement;
      message = xmlDocumentElement.firstChild.data;
      document.getElementById("underSearch").innerHTML = message;
      setTimeout('searchxml()', 1000);
    }else{
      alert('Something went wrong!');
    }
  }
