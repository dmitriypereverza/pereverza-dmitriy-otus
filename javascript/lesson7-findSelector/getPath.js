function getPath(node) {
    const getNext = (node) => {
        const index = Array.from(node.parentNode.children).indexOf(node) + 1;
        return `${node.nodeName.toLowerCase()}:nth-child(${index})`;
    };

    let path = [];
    const getParentId = (node) => {
        if (node.id) {
            return "#" + node.id;
        }
        if (!node.parentElement) {
            return node.nodeName.toLowerCase();
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