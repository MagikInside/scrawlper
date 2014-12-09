Scrawlper
========

In this very small project, I used the Web-Crawler [node-crawler](https://github.com/sylvinus/node-crawler) to crawl and scrap a job portal, [infojobs](http://www.infojobs.net/), to check this tool and extract some info into a json file.

Then I used this info, about job offers, to another small project using MEAN (MongoDB, Express, Angularjs and Nodejs), that you can check out in this link [hyperion](https://github.com/MagikInside/hyperion).

## How to use

+ Clone the project:

```
     $git clone https://github.com/MagikInside/scrawlper.git
```

+ Install dependencies:

```
     $cd scrawalper
```

```
     $npm install
```

+ Start:

```
     $ node app.js
```

> The program will process 1520 pages, so it will be running for a few minutes while before ending. Be patient. Then it will create a file "output.json" with the result.
