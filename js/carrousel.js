document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.carrousel-page');
    const leftBtn = document.querySelector('.carrousel-arrow.left');
    const rightBtn = document.querySelector('.carrousel-arrow.right');
    let current = 0;
    let timer = null;

    function showPage(index) {
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
        current = index;
    }

    function nextPage() {
        showPage((current + 1) % pages.length);
    }

    function prevPage() {
        showPage((current - 1 + pages.length) % pages.length);
    }

    function resetTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextPage, 10000);
    }

    rightBtn.addEventListener('click', () => {
        nextPage();
        resetTimer();
    });
    leftBtn.addEventListener('click', () => {
        prevPage();
        resetTimer();
    });

    showPage(0);
    resetTimer();
});
