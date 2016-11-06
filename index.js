var self = require('sdk/self');
var pageMod = require('sdk/page-mod');

pageMod.PageMod({
    include: /https?:\/\/(www\.)?github\.com(\/.*)?/,
    contentScriptFile: self.data.url('links.js'),
    attachTo: 'top'
});