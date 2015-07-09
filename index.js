#! /usr/bin/env node

'use strict';

/**
 * @description
 * A tool that downloads a given number of pug images to the directory where it is run.
 *
 * @example
 * node pugbalm 5 // download 5 pugs
 */

var request = require('request'),
    http = require('http'),
    _ = require('lodash'),
    fs = require('fs'),

    baseUrl = 'http://api.giphy.com/v1/gifs/search',
    apiKey = 'dc6zaTOxFJmzC',
    params,
    imageIds = [],
    imageUrls = [];

params = {
    q: 'pugs',
    limit: process.argv[2] || 5,
    fmt: 'json',
    api_key: apiKey,
};

/*
 * @jsdoc function
 * @name serializeParams
 * @param {object}
 * Object containing request parameters.
 * @returns {string}
 * Accepts a params object and returns a serialized string to be appended to a base URL.
 */

function serializeParams(params) {

    var first = true;

    return _.reduce(params, function(result, n, key) {

        if (first) {
            first = false;
            return result + '?' + key + '=' + n;
        } else {
            return result + '&' + key + '=' + n;
        }

    },'');

}

/*
request(baseUrl + serializeParams(params), function(error, response, body) {

    if (!error && response.statusCode === 200) {

        body = JSON.parse(body).data;

        _.forEach(body, function(element, index) {

            imageIds.push(element.id);
            imageUrls.push(element.images.original.url);

        });

        _.forEach(imageUrls, function(url, index) {

            request({url: url, encoding: null}, function(error, response, body) {

                var destination = process.cwd() + '/' + imageIds[index] + '.gif';

                fs.writeFile(destination, body, 'binary', function(err) {

                    if (err) throw err;

                });

            });

        });

        console.log(process.argv[2] + ' pugs were delivered to ' + __dirname + '.  \nPowered by GIPHY http://giphy.com/');
                                                                       
    }
});
*/

function downloadImage(path, id) {

    console.log('path: ' + path);
    console.log('id: ' + id);

};

http.get(baseUrl + serializeParams(params), function(response) {

    var output = '';

    response.setEncoding('utf8');
    response.on('data', function(body) {

        output += body;

    });

    response.on('end', function() {

        output = output.data;
        _.forEach(output, function(element) {
            downloadImage(element.images.original.url, element.id);
        });

    });
});

