let uri = "./assets";
  //"https://raw.githubusercontent.com/nuojs/nuobinarybot/main/public/assets";
let jsonUrl = uri + "/latest-update.json";
let jsUrl = uri + "/bundle.js";

// $.get('./assets/notify.min.js', function (jsData, status) {
//       console.log("JS-Data Status: " + status, jsData);
// })
function onloadJs(jsScript) {
  var s = document.createElement("script");
  s.type = "text/javascript";
  var code = jsScript;
  try {
    s.appendChild(document.createTextNode(code));
    document.body.appendChild(s);
  } catch (e) {
    // s.type = "text/babel";
    s.text = code;
    document.body.appendChild(s);
  }
}
function setStorage(jsText, latestUpdate) {
  localStorage.setItem("latest-update", latestUpdate);
  localStorage.setItem("bundle-js", jsText);
  onloadJs(jsText);
}
$.getJSON(jsonUrl, (jsonData, success) => {
  console.log(jsonData, success);
  if (success != "success") return;
  if (
    (localStorage["latest-update"] != null &&
      localStorage["latest-update"] > jsonData["latest-update"]) ||
    localStorage["bundle-js"] == null
  ) {
    $.get(jsUrl, function (jsData, status) {
      console.log("JS-Data Status: " + status);
      if (status == "success") {
        setStorage(jsData, jsonData["latest-update"]);
      }
    });
  } else {
    onloadJs(localStorage["bundle-js"]);
  }
});
