document.addEventListener("DOMContentLoaded", function() {
    muatRiwayat();
});

function simpanCatatan() {
    const data = {
        tanggal: document.getElementById('tanggal').value,
        tidur: document.getElementById('sleepTime').value,
        bangun: document.getElementById('wakeTime').value,
        makan: document.getElementById('foodLog').value,
        catatan: document.getElementById('dailyNotes').value,
        waktuSimpan: new Date().toLocaleTimeString()
    };

    if(!data.tanggal) { alert("Pilih tanggal dulu!"); return; }

    let daftarCatatan = JSON.parse(localStorage.getItem('jurnalData')) || [];
    daftarCatatan.push(data);
    localStorage.setItem('jurnalData', JSON.stringify(daftarCatatan));
    
    alert("Berhasil disimpan!");
    muatRiwayat();
}

function muatRiwayat() {
    const riwayatArea = document.getElementById('riwayatArea');
    const daftarCatatan = JSON.parse(localStorage.getItem('jurnalData')) || [];
    
    if (daftarCatatan.length === 0) {
        riwayatArea.innerHTML = "<p>Belum ada catatan.</p>";
        return;
    }

    riwayatArea.innerHTML = daftarCatatan.slice().reverse().map(item => `
        <div style="border-bottom:1px solid #eee; padding:10px 0; font-size: 14px;">
            <strong>${item.tanggal}</strong> <small>(${item.waktuSimpan})</small><br>
            Tidur: ${item.tidur} | Bangun: ${item.bangun}<br>
            Makan: <i>${item.makan}</i><br>
            Catatan: ${item.catatan}
        </div>
    `).join('');
}

function downloadExcel() {
    let daftarCatatan = JSON.parse(localStorage.getItem('jurnalData')) || [];
    if(daftarCatatan.length === 0) { alert("Belum ada data!"); return; }
    
    let csvContent = "data:text/csv;charset=utf-8,Tanggal,Jam Tidur,Jam Bangun,Makan,Catatan,Waktu Input\n";
    daftarCatatan.forEach(item => {
        csvContent += `${item.tanggal},${item.tidur},${item.bangun},"${item.makan}","${item.catatan}",${item.waktuSimpan}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "catatan_harian.csv");
    document.body.appendChild(link);
    link.click();
}