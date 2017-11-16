SIMPLE RSS READER
INTRO 
	This is a very simple example which aims to show how to xml based files convert to json format. Thats because We prefered regex  instead of xml parsers for php.


PROJECT FILES
- rssread.php 	: the main page which is working as a single page app
- rssjson.php 	: It parses  xml feeds and encode as json (title, description and link tags)
- rsstree.txt 	: json formated feed adresses
- scripting 	 
	- sinif.css a simple jss library including dom manupaliton an ajax classes
	- rssoku.js for ajax proccess
ATTENTION 
	You need to set a rewrite rule in your web server to turn rssjon.php?ad=xxx to rssjson/xxx
DEMO VIDEO
	https://youtu.be/d1nssPtDD0M
