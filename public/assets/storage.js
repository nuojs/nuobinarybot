let uri = "./assets";
  //"https://raw.githubusercontent.com/nuojs/nuobinarybot/main/public/assets";
let jsonUrl = uri + "/latest-update.json";
let jsUrl = uri + "/bundle.js";
let latestUpdate = 7

// $.get('./assets/notify.min.js', function (jsData, status) {
//       console.log("JS-Data Status: " + status, jsData);
// })
var loading = new Loading({
					discription: 			'Loading...',
			    defaultApply: 	true,
});

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
  loading.out()
}
function setStorage(jsText, latestUpdate) {
  localStorage.setItem("bundle-js", jsText);
  localStorage.setItem("latest-update", latestUpdate);
  onloadJs(jsText);
  location.reload()
}
// $.getJSON(jsonUrl, (jsonData, success) => {
//   console.log(jsonData, success);
//   if (success != "success") return;
  
  if (
    (localStorage["latest-update"] != null &&
       latestUpdate > localStorage["latest-update"]) ||
    localStorage["bundle-js"] == null
  ) {
    $.get(jsUrl, function (jsData, status) {
      console.log("JS-Data Status: " + status);
      if (status == "success") {
        setStorage(jsData, latestUpdate);
      }
    });
  } else {
    onloadJs(localStorage["bundle-js"]);
  }
// });
