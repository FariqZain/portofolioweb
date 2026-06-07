document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('hub-body');
    const overlay = document.getElementById('transition-overlay');
    const badgeWireframe = document.getElementById('badge-wireframe');
    
    // 📱 INTERAKSI SEKTOR TOGGLE MEMO KUNING
const memoTrigger = document.getElementById('memo-trigger');
const memoCard = document.getElementById('memo-card');

    // Aktifkan visualisasi halaman dasar
    body.classList.remove('opacity-0');

    // Logika interaksi sticker Wireframe bawaan asli Anda
    if (badgeWireframe) {
        badgeWireframe.addEventListener('click', () => {
            alert('🧙‍♂️ Membuka dokumen lengkap Wireframe Blueprint Map...');
        });
    }

    // 📱 INTERAKSI SEKTOR TOGGLE MEMO KUNING (KONSISTEN DESKTOP & MOBILE)
   

if (memoTrigger && memoCard) {
    memoTrigger.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        // Cek status apakah memo sedang tersembunyi
        if (memoCard.classList.contains('opacity-0')) {
            // BUKA MEMO
            memoCard.classList.remove('opacity-0', 'pointer-events-none');
            memoCard.classList.add('opacity-100', 'pointer-events-auto');
            memoTrigger.innerHTML = "CLOSE MEMO ▴";
        } else {
            // TUTUP MEMO
            memoCard.classList.remove('opacity-100', 'pointer-events-auto');
            memoCard.classList.add('opacity-0', 'pointer-events-none');
            memoTrigger.innerHTML = "PULL MEMO ▾";
        }
    });

    // Menutup otomatis jika user mengklik area luar memo
    document.addEventListener('click', (e) => {
        if (!memoCard.contains(e.target) && e.target !== memoTrigger) {
            memoCard.classList.remove('opacity-100', 'pointer-events-auto');
            memoCard.classList.add('opacity-0', 'pointer-events-none');
            memoTrigger.innerHTML = "PULL MEMO ▾";
        }
    });
}

    // Pasang interseptor link gerak lambat keluar halaman bawaan asli Anda
    document.querySelectorAll('.transition-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetRoute = link.getAttribute('href');

            if (targetRoute) {
                body.classList.add('exit-collapse');
                if (overlay) {
                    overlay.classList.remove('opacity-0');
                    overlay.classList.add('opacity-100');
                }

                setTimeout(() => {
                    window.location.href = targetRoute;
                }, 450);
            }
        });
    });
});