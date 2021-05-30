(function (d) {
    function writeResult(txt) {
        results.appendChild(d.createTextNode(txt + "\r\n"));
    }

    var
        results = d.body.appendChild(d.createElement('pre')),
        start = performance.now(),
        fragment = d.createDocumentFragment();

    for (var i = 0; i < 0x8000; i++) {
        fragment.appendChild(d.createElement('p')).textContent = testData[i % 3];
    }

    d.body.appendChild(fragment);

    var domWriteComplete = performance.now();

    setTimeout(function () {
        var renderComplete = performance.now();
        writeResult(navigator.userAgent);
        writeResult("   DOM Complete: " + (domWriteComplete - start));
        writeResult("Render Complete: " + (renderComplete - start));
    }, 1);
})(document);