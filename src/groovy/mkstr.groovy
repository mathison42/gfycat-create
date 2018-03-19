
import groovy.util.CliBuilder
import com.sevendiscs.gifs.StreamableHelper

def cli = new CliBuilder(usage:'mkstr [credentials] [<link> <start> <duration>] [<csv>]')
cli.u(longOpt:'username', required:true, args:1, 'Streamable username/email')
cli.p(longOpt:'password', required:true, args:1, 'Streamable password')
cli.l(longOpt:'link', required:false, args:1,  'Youtube URL link')
cli.s(longOpt:'start', required:false, args:1,  'Start time in seconds')
cli.d(longOpt:'length', required:false, args:1,  'Length in seconds')
cli.t(longOpt:'title', required:false, args:1, 'Title to give the clip')

def options = cli.parse(args)

if (!options) {
  System.exit(1)
}

def args = options.arguments()
def username = options.u
def password = options.p
File csv
def link
def start
def length
def title
StreamableHelper sh

if (args.size()) {
  if (args.size() > 1) {
    println "[Error] Too many args."
    System.exit(1)
  }
  csv = new File(args[0]);
  if (!csv.isFile()){
    println "[Error] Given csv file not found."
    System.exit(1)
  }

  sh = new StreamableHelper(username, password, csv)

} else if (options.l && options.s && options.d) {
  link = options.l
  start = options.s
  length = options.d
  title = options.t

  try {
    URI temp = new URI(link)
  } catch (URISyntaxException ex) {
    println "[Error] Given link value is not a valid URL."
    System.exit(1)
  }

  if (!start.isInteger()) {
    println "[Error] Given start value is not a integer."
    System.exit(1)
  }

  if (!length.isInteger()) {
    println "[Error] Given length value is not a integer."
    System.exit(1)
  }

  sh = new StreamableHelper(username, password, link, start, length, title)

} else {
  println "[Error] Invalid syntax."
  println "[Possible Solution] Specify a CSV file."
  println "[Possible Solution] Specify values for the link, start, and duration parameters."
  System.exit(1)
}


sh.createStreamables()
