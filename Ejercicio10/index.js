'use strict';
window.addEventListener('load', () => {
    test();
});

const test = () => {
    const pages = [
        'http://localhost/maps/179/embed',
        'http://localhost/maps/180/embed',
        'http://localhost/maps/183/embed',
        'http://localhost/maps/184/embed',
        'http://localhost/maps/185/embed',
    ];
    const columnsToCells = document.querySelectorAll('#countryCasesTable tr');
    let iframeContent = document.getElementById('main-iframe');

    columnsToCells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            iframeContent.src = pages[index];
            iframeContent.contentWindow.location.reload();
        });
    });
};
