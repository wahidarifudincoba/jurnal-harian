// Fungsi untuk memuat riwayat saat halaman dibuka
window.onload = muatRiwayat;

function simpanCatatan() {
    const data = {
        tanggal: document.getElementById('tanggal').value,
        tidur: document.getElementById('sleepTime').value,
        bangun: document.getElementById('wakeTime').value,
        makan: document.getElementById('foodLog').value,
        catatan: document.getElementById('dailyNotes').value,
        waktuSimpan: new Date().toLocaleTimeString() // Jam saat ini
    };

    if(!data.tanggal) { alert("Pilih tanggal dulu!"); return; }

    let daftarCatatan = JSON.parse(localStorage.getItem('jurnalData')) || [];
    daftarCatatan.push(data);
    localStorage.setItem('jurnalData', JSON.stringify(daftarCatatan));
    
    alert("Berhasil disimpan!");
    muatRiwayat(); // Update tampilan riwayat langsung
}

function muatRiwayat() {
    const riwayatArea = document.getElementById('riwayatArea');
    let daftarCatatan = JSON.parse(localStorage.getItem('jurnalData')) || [];
    
    riwayatArea.innerHTML = daftarCatatan.map(item => `
        <div style="border-bottom:1px solid #ccc; padding:10px 0;">
            <strong>${item.tanggal}</strong> (${item.waktuSimpan})<br>
            Tidur: ${item.tidur} | Bangun: ${item.bangun}<br>
            Makan: ${item.makan}<br>
            Catatan: ${item.catatan}
        </div>
    `).join('');
}

function downloadExcel() {
    // ... (fungsi download tetap sama seperti sebelumnya)
}