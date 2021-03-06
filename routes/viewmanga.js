var express = require('express');
const request = require('request');
const cheerio = require('cheerio');

var router = express.Router();

router.get('/', function(req, res, next) {
  var url = req.query.url;
  var details = {};
  request(url,(error, response, html) => {    
      if(!error && response.statusCode == 200){
          const $ = cheerio.load(html);
          var images = [];
            details.name = $('.info-top-chapter').find('h2').text();
            details.back = $('.btn-navigation-chap').find('.next').attr('href');
            details.next = $('.btn-navigation-chap').find('.back').attr('href');
            $('.vung-doc img').each((i,el) => {
                images.push($(el).attr('src'));
            });
          //res.send(images);
        res.render('viewmanga', { title: 'Anime Master' ,images : images,details : details});
      }
      else{
          console.log(error);
      }
  });
  });
module.exports = router;
