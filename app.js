var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


//Crawler
var Crawler = require("crawler");

//This array will contain the different jobs
var jobs = [];

var c = new Crawler({
    maxConnections : 30,
    //This two options allow the crawler to convert the encoding from "ISO-8859-15" (the enconding the page uses) to "UTF-8"
    forceUTF8:true,
    incomingEncoding :"ISO-8859-15",
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        i++;
        console.log('Grabbed', result.body.length, 'bytes');


        $('#offer-list>li').filter(function () {
            var job = {};
            job.title = $(this).find(".result-list-title>a").text().toLowerCase();
            //The page has some entries with no info, I'll check for that and push the info just in the case I got a valid entry
            if(job.title) {
                job.company = $(this).find(".result-list-subtitle > .ellipsis >a").text().toLowerCase();
                job.city = $(this).find(".tag-group .ellipsis").text().toLowerCase();
                job.time = $(this).find(".tag-group>li:nth-child(2)>span:nth-child(1)").text().toLowerCase();

                jobs.push(job);
            }
        });
    },

    onDrain: function(){
        //I'll do this after I got the last page
        fs.writeFile('output.json', JSON.stringify(jobs, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the output.json file');
            process.exit(0);
        })
    }
});


c.queue('http://www.infojobs.net/jobsearch/search-results/list.xhtml');
for(var i = 2; i<1519 ; i++){
    c.queue('http://www.infojobs.net/ofertas-trabajo/' + i);
}

console.log('Processing pages...');

