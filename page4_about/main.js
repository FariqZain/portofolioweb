document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('about-body');
    const overlay = document.getElementById('transition-overlay');
    
    // Selector Sinkronisasi untuk Sektor Memo Kuning Terintegrasi
    const memoTrigger = document.getElementById('memo-trigger');
    const memoCard = document.getElementById('memo-card');

    // Menghilangkan status opasitas muat dasar halaman secara mulus
    body.classList.remove('opacity-0');

    // 📱 INTERAKSI TOGGLE BUKA/TUTUP MEMO KUNING (KONSISTEN UNIVERSAL)
    if (memoTrigger && memoCard) {
        memoTrigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah bentrokan penutupan luar layer akibat bubble event
            
            // Periksa jika status sedang tertutup (memiliki kelas opacity-0)
            if (memoCard.classList.contains('opacity-0')) {
                // TAMPILKAN MEMO: Slide Down & Fade In
                memoCard.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
                memoCard.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
                memoTrigger.innerHTML = "CLOSE MEMO ▴";
            } else {
                // SEMBUNYIKAN MEMO: Slide Up & Fade Out
                memoCard.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
                memoCard.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
                memoTrigger.innerHTML = "PULL MEMO ▾";
            }
        });

        // Menutup otomatis jika pengguna menyentuh area mana pun di luar kartu memo
        document.addEventListener('click', (e) => {
            if (!memoCard.contains(e.target) && e.target !== memoTrigger) {
                memoCard.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
                memoCard.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
                memoTrigger.innerHTML = "PULL MEMO ▾";
            }
        });
    }

    // Interseptor link transisi keluar halaman dengan efek kolaps folder game
    document.querySelectorAll('.transition-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetRoute = link.getAttribute('href');

            if (targetRoute) {
                body.classList.add('exit-collapse');
                overlay.classList.remove('opacity-0');
                overlay.classList.add('opacity-100');

                setTimeout(() => {
                    window.location.href = targetRoute;
                }, 420);
            }
        });
    });
});