/**
 * Emits a request to get the decoded URL for the provided name.
 * For example: FTB-Gamepedia/MediaWiki-Butt-Ruby:master returns https://github.com/FTB-Gamepedia/MediaWiki-Butt-Ruby/tree/master
 */
function getURL(fullName, index) {
    var twoElements = fullName.split(':');
    self.port.emit('getDecoded', { str: `https://github.com/${twoElements[0]}/tree/${twoElements[1]}`, index: index });
}

var commitRefs = document.querySelectorAll('.commit-ref');

/**
 * Performs a function for every found commit ref after it checks if the element's title is null.
 * @param funcToDo The function to perform after the null check on each individual element. The function takes the title
 *        value and the index of the element as parameters.
 */
function doForEachCommitRef(funcToDo) {
    for (var i = 0; i < commitRefs.length; i++) {
        var titleItem = commitRefs[i].attributes.getNamedItem('title');
        // "unknown repository"- forker deleted their repo.
        // Unfortunately there is nothing like this for deleted branches so those will simply take you to a 404.
        if (!titleItem) {
            continue;
        }
        funcToDo(titleItem.value, i);
    }
}

doForEachCommitRef((function(title, index) {
    getURL(title, index);
}));

self.port.on('returnDecoded', function(obj) {
    var decodedStr = obj['str'];
    var element = commitRefs[obj['index']];
    var oldInnerHTML = element.innerHTML;
    element.innerHTML = `<a href="${decodedStr}">${oldInnerHTML}</a>`;
});