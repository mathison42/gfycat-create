package com.sevendiscs.gifs

public class Clip {

  private def link
  private def start
  private def length
  private def title

  public Clip(def link, def start, def length, def title) {
    this.link = link
    this.start = start
    this.length = length
    if (title.length() > 200) {
      title = title.substring(0, 200)
    }
    this.title = title
  }

  public def getLink() {
    return link
  }

  public def getStart() {
    return start
  }

  public def getLength() {
    return length
  }

  public def getTitle() {
    return title
  }

  public def getEncodedTitle() {
    return java.net.URLEncoder.encode(title, "UTF-8")
  }

  public void print() {
    println "Link: " + link
    println "Start: " + start + " - Length: " + length
    println "Title: " + title
  }
}
