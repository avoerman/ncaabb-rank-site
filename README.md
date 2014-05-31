ncaabb-rank-site
================

NCAA Basketball Ranking Site

This app is intended to cumulate NCAA basketball data from various ranking sites and bring them together in one easy to read, sort, and filter list.

I have written a separate scraper app here: https://github.com/avoerman/ncaabb-scraper
All data right now comes from \app\data\rankings\alldata.json. I'm looking for a better way for the two apps to interact.

### Setup ###

To run:

npm install

bower install

grunt serve


### Sources ###
Uses data from the following sources:
* http://www.rpiforecast.com/live-rpi.html
* http://espn.go.com/mens-college-basketball/bpi
* http://kenpom.com/
* http://bracketmatrix.com/
