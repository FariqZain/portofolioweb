document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('contact-body');
    const overlay = document.getElementById('transition-overlay');
    const questForm = document.getElementById('quest-dispatch-form');
    const btnDispatch = document.getElementById('btn-dispatch');
    
    // Selector Sinkronisasi untuk Sektor Memo Kuning Terintegrasi
    const memoTrigger = document.getElementById('memo-trigger');
    const memoCard = document.getElementById('memo-card');

    // Menghilangkan status opasitas muat dasar halaman secara mulus
    body.classList.remove('opacity-0');

    // 📱 INTERAKSI TOGGLE BUKA/TUTUP MEMO KUNING (KONSISTEN UNIVERSAL)
    if (memoTrigger && memoCard) {
        memoTrigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah bentrokan penutupan luar layer akibat bubble event
            
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

    // 🎯 REVISI: INTERSEPSI FORM UTAMU UNTUK DIREDIREKSI KE WHATSAPP PRIBADI
    if (questForm) {
        questForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Ekstrak seluruh nilai teks yang sedang diketik oleh user
            const adventurerName = document.getElementById('form-name').value;
            const commsAddress = document.getElementById('form-email').value;
            const questDetails = document.getElementById('form-msg').value;

            // ⚠️ PENTING: Ganti nilai di bawah ini dengan nomor WhatsApp asli Anda.
            // Gunakan format kode negara di awal tanpa spasi dan tanpa tanda "+" (Contoh: 628123456789)
            const myWhatsAppNumber = "6282233791264"; 

            // Pembuatan template string isi teks terformat rapi (Menggunakan Markdown tebal bawaan WA)
            const messageTemplate = `⚔️ *GUILD DISPATCH - NEW QUEST OBJECTIVE* ⚔️\n\n` +
                                    `👤 *Adventurer:* ${adventurerName}\n` +
                                    `📧 *Comms Address:* ${commsAddress}\n\n` +
                                    `📜 *Quest Details / Message:* \n"${questDetails}"`;

            // Lakukan proses encoding URI agar karakter baris baru (\n) dan spasi aman dibaca URL browser
            const encodedText = encodeURIComponent(messageTemplate);
            const whatsappLink = `https://api.whatsapp.com/send?phone=${myWhatsAppNumber}&text=${encodedText}`;

            // Tetap jalankan feedback efek pemuatan animasi asli bawaan proyek Anda
            btnDispatch.disabled = true;
            btnDispatch.textContent = "TRANSMITTING SIGNALS...";
            btnDispatch.classList.add('bg-amber-700');

            setTimeout(() => {
                // Buka link WhatsApp di tab baru agar halaman portofolio Anda tidak tertutup
                window.open(whatsappLink, '_blank');

                // Kembalikan status tombol dan bersihkan form input seperti semula
                questForm.reset();
                btnDispatch.disabled = false;
                btnDispatch.textContent = "Dispatch Quest Scroll Envelope ➔";
                btnDispatch.classList.remove('bg-amber-700');
            }, 1000); // Eksekusi delay transmisi selama 1 detik agar transisi animasi terasa nyata
        });
    }
});