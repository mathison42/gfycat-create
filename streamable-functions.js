
/**
 * form Data containing url, start, and duration parameters.
 * return Confirms input, calls the create HTTP POST call, and
 *     updates page with location of new Streamable Gif.
 */
function createStreamable(form) {

  // Get variables from the form data
  var url = form.url.value;
  var start = form.start.value;
  var duration = form.duration.value;
  var username = form.streamUsername.value;
  var password = form.streamPassword.value;

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

  // Username and password
  if (!username || !password) {
    alert("[Error - 'Credentials'] Gifs can only be uploaded to Streamable with valid credentials.");
    return false
  }

  // Logging of input variables
  console.log("URL: " + url);
  console.log("Start: " + start);
  console.log("Duration: " + duration);
  console.log("Username: " + username);
  console.log("Password: sike!");

  // Create the gif
  callCreateStremable(url, start, duration, username, password);

  return false;

}

/**
 * url The url to fetch the video from.
 * start Time to start the gif, in seconds.
 * length How long the gif will, be in seconds.
 * username Username/email to authenticate with Streamable
 * password Password to authenticate with Streamable
 * result Calls post method to generate Streamable gif. Updates html page with new link.
 */
function callCreateStremable(url, start, length, username, password) {
  var STREAMABLE_API_URL = "https://api.streamable.com/import"

  var url = STREAMABLE_API_URL + "?url=" + url +
    "&start=" + start + "&length=" + length

  // jQuery Ajax call to make HTTP Post request
  // https://api.jquery.com/jquery.post/
  $.ajax({
    type: "GET",
    beforeSend: function(request) {
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
    },
    url: url,
    success: function(msg) {
      // Once POST call returns, update the page
      updateStreamableList(msg.shortcode)
    }
  })
  .done(function(msg) {
    console.log("[Ok] callCreateStremable:", msg);
  })
  .fail(function(msg) {
    console.log("[Error] callCreateStremable:", msg);
    alert("[Error] Unable to create the Streamable gif. Please try again.");
  });
}

/**
 * shortcode The unique name given to the Gif by the Streamable API.
 * result Updates the HTML list with the new Streamable's Gif name and link.
 */
function updateStreamableList(shortcode) {
  var list = document.getElementById('gifResults');
  var newItemStreamable = document.createElement('li');
  var newLinkStreamable = document.createElement('a');
  newLinkStreamable.href = 'https://streamable.com/' + shortcode
  var newNameStreamable = document.createTextNode("Streamable - " + shortcode);
  newLinkStreamable.appendChild(newNameStreamable);
  newItemStreamable.appendChild(newLinkStreamable);
  list.appendChild(newItemStreamable);
}
