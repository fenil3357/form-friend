function sheetIdGenerator(sheetLink) {
    let idx;

    if (sheetLink.includes("https://")) idx = 39;
    else idx = 31;

    let id = "";

    while (sheetLink[idx] != '/') {
        id += sheetLink[idx];
        idx++;
    }
    return id;
}

module.exports = sheetIdGenerator;