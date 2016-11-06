/**
 * @param fullName The title name for the branch <repository>:<branch>.
 * @return string The URL for the repo and branch title.
 *                For example: FTB-Gamepedia/MediaWiki-Butt-Ruby:master returns https://github.com/FTB-Gamepedia/MediaWiki-Butt-Ruby/tree/master
 */
function getURL(fullName) {
    var twoElements = fullName.split(':');
    return `https://github.com/${twoElements[0]}/tree/${twoElements[1]}`;
}

var commitRefs = document.querySelectorAll('.commit-ref');

for (let element of commitRefs) {
    // "unknown repository"- forker deleted their repo.
    // Unfortunately there is nothing like this for deleted branches so those will simply take you to a 404.
    if (!element.title) {
        continue;
    }

    let a = document.createElement('a');
    a.href = getURL(element.title);

    while (element.hasChildNodes()) {
        a.appendChild(element.firstChild);
    }
    
    element.appendChild(a);
}