
function createGfycat(form) {
  var url = form.url.value;
  var duration = form.duration.value;
  if (!url) {
    url = "https://youtu.be/SaVJyAwVUzY?t=49"
  }
  if (!duration || duration <= 0) {
    duration = 6
  }
  console.log("URL: " + url);
  console.log("Duration: " + duration);
  callGfycatPost(url, duration);
  return false;

}

function callGfycatPost(url, duration) {
  var start = getStartTime(url)
  var data = JSON.stringify({
    "fetchUrl": url,
    "noMd5" : "true",
    "noResize" : "true",
    "cut": {
        "start":start,
        "duration": duration
      }
  })

  $.ajax({
    type: "POST",
    beforeSend: function(request) {
      //request.setRequestHeader("Authentication", "Bearer " + access_token);
      request.setRequestHeader("Content-Type", "application/json");
    },
    url: "https://api.gfycat.com/v1/gfycats",
    data: data,
    success: function(msg) {
      console.log(msg)
      updatePage(msg.gfyname)
    }
  });
}

function getStartTime(url) {
  return url.split("=").pop()
}

function updatePage(gfyname) {
  var urlOutput = document.getElementById('gfycatResult');
  urlOutput.innerHTML = gfyname;
  urlOutput.setAttribute('href', 'https://gfycat.com/' + gfyname);
}


// function authenticateGfycat(url, duration) {
//   console.log("Authenticating Gfycat..")
//   var data = {
//     "grant_type": "client_credentials",
//     "client_id": {{client_id}},
//     "client_secret": {{client_secret}}
//   }
//   $.post("https://api.gfycat.com/v1/oauth/token", JSON.stringify(data), function(data, status){
//         console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
//         return callGfycatPost(url, duration, data.access_token)
//     });
// }

// function randomColor(prevColor) {
//   var result;
//   var colors = ["#ff0000","#ff4000","#ff8000","#ffbf00","#ffff00","#bfff00","#80ff00",
//     "#40ff00","#00ff00","#00ff40","#00ff80","#00ffbf","#00ffff","#00bfff","#0080ff",
//     "#0040ff", "#0000ff", "#4000ff", "#8000ff", "#bf00ff", "#ff00ff", "#ff00bf",
//     "#ff0080", "#ff0040", "#ff0000"];
//
//    do {
//      var result = Math.floor(Math.random() * colors.size())
//    } while(result != prevColor);
//
//   return "#ff0000";
// }
