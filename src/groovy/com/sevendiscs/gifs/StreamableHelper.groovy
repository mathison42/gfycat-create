
package com.sevendiscs.gifs

public class StreamableHelper {

  final String STREAMABLE_API = "https://api.streamable.com/import?"
  def username
  def password
  List<Clip> clips = new ArrayList<Clip>()

  public StreamableHelper(def username, def password,
      def link, def start, def length, def title) {
    this.username = username
    this.password = password
    this.clips = [new Clip(link, start, length, title)]
  }

  public StreamableHelper(def username, def password, File csv) {
    this.username = username
    this.password = password
    this.clips = parseCSV(csv)
  }


  private List<Clip> parseCSV(File csv) {
    List<Clip> result = new ArrayList<Clip>()

    def lines = csv.readLines()
    // Need to clean up
    for(int i = 1; i < lines.size(); i++) {
      def line = lines[i].split(",", 3)*.trim()
      def linkStart = line[0].split("\\?t=", 2)
      String link = linkStart[0]
      int start = Integer.parseInt(linkStart[1])
      int end = Integer.parseInt(line[1].split("\\?t=")[1])
      def length = end - start
      String title = line[2]
      Clip clip = new Clip(link, start, length, title)
      result << clip

    }

    return result
  }

  public void createStreamables() {

    String token = "${username}:${password}".bytes.encodeBase64().toString()

    for (clip in clips) {
      def connection = new URL(STREAMABLE_API +
          "url=${clip.getLink()}" +
          "&start=${clip.getStart()}" +
          "&length=${clip.getLength()}" +
          "&title=${clip.getEncodedTitle()}")
        .openConnection() as HttpURLConnection

      connection.setRequestProperty('Accept', 'application/json')
      connection.setRequestProperty('Authorization', "Basic ${token}")

      println connection.responseCode + ": " + connection.inputStream.text}
  }

}
