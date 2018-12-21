function getPath(node) {
    let path = [];

    function getNth(element) {
        const index = Array.from(element.parentNode.children).indexOf(element) + 1;
        return `${element.nodeName}:nth-child(${index})`;
    }

    function getParentId(node) {
        if (node.id) {
            return "#" + node.id;
        }
        path.push(getNth(node));
        return getParentId(node.parentElement);
    }

    let pathStr = getParentId(node);
    while(path.length > 0) {
        pathStr += " > " + path.pop();
    }
    return pathStr;
}