document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('portfolio-book');
    const overlay = document.getElementById('transition-overlay');

    book.addEventListener('click', (e) => {
        e.preventDefault();
        const targetDestination = book.getAttribute('href');

        // Menjalankan animasi pembukaan buku sinematik
        book.classList.add('book-zoom-out');
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');

        setTimeout(() => {
            window.location.href = targetDestination;
        }, 550);
    });
});