var self = require('sdk/self');
var pageMod = require('sdk/page-mod');
var he = require('he');

pageMod.PageMod({
    include: /https?:\/\/(www\.)?github\.com(\/.*)?/,
    contentScriptFile: self.data.url('links.js'),
    attachTo: 'top',
    onAttach: startListening
});

function startListening(worker) {
    worker.port.on('getDecoded', function(obj) {
        obj['str'] = he.decode(obj['str']);
        worker.port.emit('returnDecoded', obj);
    });
}
