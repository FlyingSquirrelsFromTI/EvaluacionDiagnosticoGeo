'use strict';
window.addEventListener('load', () => {
    test();
});

const test = () => {
    const pages = ['http://en.wikipedia.org', 'http://www.google.com', 'http://www.facebook.org', 'http://www.twitter.com', 'http://www.amazon.com'];
    const columnsToCells = document.querySelectorAll('#countryCasesTable tr');
    let iframeContent = document.getElementById('main-iframe');

    columnsToCells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            iframeContent.src = pages[index];
            iframeContent.contentWindow.location.reload();
        });
    });
}
