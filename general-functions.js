/**
 * url Any type of url.
 * result Retrieves the string following the last '=' character. If a youtube video,
 *    this will be the start time.
 */
function getStartTime(url) {
  return url.split("=").pop()
}

/**
 * url Any type of url.
 * result Boolean determining validity of given url.
 */
function checkURL(url) {
  // Regex Magic - Note: It's not perfect
  // http://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url?page=1&tab=votes#tab-top
  var pattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
  if(!pattern.test(url)) {
    return false;
  } else {
    return true;
  }
}

/**
 * start Specifed start time of video.
 * url Any url to find start time if start == null.
 * result Return the valid start time if found, otherwise false.
 */
function findStart(start, url) {
  if (!start) {
    start = getStartTime(url);
  }
  if (isNaN(start) || start < 0) {
    return false;
  } else {
    return start;
  }
}

/**
 * duration The duration of the Gfycat gif, in seconds.
 * result Boolean determining validity of given duration.
 */
function checkDuration(duration) {
  if (isNaN(duration) || duration <= 0) {
    return false;
  } else {
    return true;
  }
}
