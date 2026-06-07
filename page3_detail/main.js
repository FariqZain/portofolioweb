document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('detail-body');
    const overlay = document.getElementById('transition-overlay');

    // Pastikan body terlihat bahkan jika JS lambat
    if (body) {
        body.style.opacity = '1';
        body.classList.remove('opacity-0');
    }

    document.querySelectorAll('.transition-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetRoute = link.getAttribute('href');
            if (body) body.classList.add('exit-collapse');
            if (overlay) {
                overlay.classList.remove('opacity-0');
                overlay.classList.add('opacity-100');
            }
            setTimeout(() => { window.location.href = targetRoute; }, 420);
        });
    });
});