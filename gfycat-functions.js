
/**
 * form Data containing url, start, and duration parameters.
 * return Confirms input, calls the create HTTP POST call, and
 *     updates page with location of new Gfycat Gif.
 */
function createGfycat(form) {

  // Get variables from the form data
  var url = form.url.value;
  var start = form.start.value;
  var duration = form.duration.value;

  // Various checking of the input variables
  // URL
  if (!checkURL(url)) {
    alert("[Error - 'Video URL'] Please enter a valid URL. \n" +
      "Examples:\n" +
      "- https://www.youtube.com/watch?v=kv1IpEsHS3A\n" +
      "- https://youtu.be/SaVJyAwVUzY?t=49");
    return false
  }

  // Start
  start = findStart(start, url);
  if (!start) {
    alert("[Error - 'Start'] Please enter number greater than 0 for the start parameter or provide a url with a start time.");
    return false
  }

  // Duration
  if (!checkDuration(duration)) {
    alert("[Error - 'Duration'] Please enter number greater than 0 for the duration parameter.");
    return false
  }

  // Logging of input variables
  console.log("URL: " + url);
  console.log("Start: " + start);
  console.log("Duration: " + duration);

  // Create the gif
  callCreateGfycat(url, start, duration);

  return false;

}

/**
 * url The url to fetch the video from.
 * start Time to start the gif, in seconds.
 * duration How long the gif will, be in seconds.
 * result Calls post method to generate Gfycat gif. Updates html page with new link.
 */
function callCreateGfycat(url, start, duration) {

  // Http Post's payload
  var data = JSON.stringify({
    "fetchUrl": url,
    "noMd5" : "true",
    "noResize" : "true",
    "cut": {
        "start":start,
        "duration": duration
      }
  })

  // jQuery Ajax call to make HTTP Post request
  // https://api.jquery.com/jquery.post/
  $.ajax({
    type: "POST",
    beforeSend: function(request) {
      //request.setRequestHeader("Authentication", "Bearer " + access_token);
      request.setRequestHeader("Content-Type", "application/json");
    },
    url: "https://api.gfycat.com/v1/gfycats",
    data: data,
    success: function(msg) {
      // Once POST call returns, update the page
      updateGfycatList(msg.gfyname)
    }
  })
  .done(function(msg) {
    console.log("[Ok] callCreateGfycat:", msg);
  })
  .fail(function(msg) {
    console.log("[Error] callCreateGfycat:", msg);
    alert("[Error] Unable to create the Gfycat gif. Please try again.");
  });
}

/**
 * gfyname The unique name given to the Gif by the Gfycat API.
 * result Updates the HTML list with the new Gfycat's gif name and link.
 */
function updateGfycatList(gfyname) {
  var list = document.getElementById('gifResults');
  var newItemGfycat = document.createElement('li');
  var newLinkGfycat = document.createElement('a');
  newLinkGfycat.href = 'https://gfycat.com/' + gfyname
  var newNameGfycat = document.createTextNode("Gfycat - " + gfyname);
  newLinkGfycat.appendChild(newNameGfycat);
  newItemGfycat.appendChild(newLinkGfycat);
  list.appendChild(newItemGfycat);
}

/**
 * result Gfycat authentication secret returned (must specify client_id and client_secret)
 */
// function authenticateGfycat() {
//   console.log("Authenticating Gfycat..")
//   var data = {
//     "grant_type": "client_credentials",
//     "client_id": {{client_id}},
//     "client_secret": {{client_secret}}
//   }
//   $.post("https://api.gfycat.com/v1/oauth/token", JSON.stringify(data), function(data, status){
//         console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
//     });
// }

/**
 * prevColor Any color in Hex. Used to ensure repeat colors are not chosen.
 * result Random 1 or 20 colors in Hex that is not the prevColor
 */
// function randomColor(prevColor) {
//   var result;
//   var colors = ["#ff0000","#ff4000","#ff8000","#ffbf00","#ffff00","#bfff00","#80ff00",
//     "#40ff00","#00ff00","#00ff40","#00ff80","#00ffbf","#00ffff","#00bfff","#0080ff",
//     "#0040ff", "#0000ff", "#4000ff", "#8000ff", "#bf00ff", "#ff00ff", "#ff00bf",
//     "#ff0080", "#ff0040", "#ff0000"];
//
//    do {
//      result = Math.floor(Math.random() * colors.size())
//    } while(result != prevColor);
//
//   return result;
// }
