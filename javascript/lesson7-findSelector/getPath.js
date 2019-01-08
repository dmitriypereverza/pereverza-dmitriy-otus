function getPath(node) {
    const getNext = (node) => {
        const index = Array.from(node.parentNode.children).indexOf(node) + 1;
        return `${node.nodeName}:nth-child(${index})`;
    };

    let path = [];
    const getParentId = (node) => {
        if (node.id) {
            return "#" + node.id;
        }
        path.push(getNext(node));
        return getParentId(node.parentElement);
    };

    let pathStr = getParentId(node);
    while(path.length > 0) {
        pathStr += " > " + path.pop();
    }
    return pathStr;
}