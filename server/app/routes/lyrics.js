
const request = require('request-promise');
const parser = require('xml2json');
const express = require('express');
const getLyrics = require('lyric-get').get;
const router = new express.Router();
module.exports = router;

router.get('/:artist/:song', (req, res, next) => {
    getLyrics(req.params.artist, req.params.song, (err, r) => {
        if (err) return next(err);
        res.send({ lyric: r });
    });
});

const lyricsAPIPrefix = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect';

router.get('/:artist/:song', (req, res, next) => {
  request.get(`${lyricsAPIPrefix}?artist=${req.params.artist}&song=${req.params.song}`)
    .then(body => {
      const lyric = parser.toJson(body, {object: true}).GetLyricResult.Lyric;
      res.send({lyric});
    })
    .catch(next);
});
