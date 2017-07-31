var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject() {
  var xmlHttp;

  try {
    xmlHttp = new XMLHttpRequest();
  } catch(e){
    xmlHttp = false;
  }

  if(!xmlHttp) {
    alert("Object could not be created.");
  } else {
    return xmlHttp;
  }
}

function process() {

    if (xmlHttp.readyState==0 || xmlHttp.readyState==4){
        name = encodeURIComponent(document.getElementById("name").value);
        xmlHttp.open("GET", "vatxml.php?name="+name, true);
        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
              xmlResponse = xmlHttp.responseXML;
              handleXMLResponse(xmlResponse);
            }
          }
        };
        xmlHttp.send(null);

    } else {
        setTimeout("process()",1000);
    }
}

function handleXMLResponse(xmlResponse) {
  // var nodes = mysql_fetch_assoc($result);
  var nodes = xmlResponse.getElementsByTagName("name")[0].childNodes.length;
    for(i=0;i<13;i++){
      document.getElementById("added").innerHTML =
     xmlResponse.getElementsByTagName("name")[i].childNodes[0].nodeValue;
   }
}
