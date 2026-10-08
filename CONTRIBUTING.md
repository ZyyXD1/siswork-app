# Panduan Kontribusi Tim (Siswork)

Mengingat proyek ini dikerjakan secara berkelompok, harap ikuti aturan berikut saat melakukan perubahan pada kode:

## Branching (Percabangan)

- **`main`**: Hanya berisi kode yang sudah stabil dan siap dinilai/rilis. Dilarang _push_ langsung ke `main`.
- **`dev`**: Branch utama untuk pengembangan. Semua fitur digabungkan di sini terlebih dahulu.
- **`feature/...`**: Buat branch baru untuk setiap fitur yang sedang dikerjakan.
  _(Contoh: `feature/login-screen`, `feature/chat-firebase`)_

## Cara Bekerja

1. Pastikan berada di branch `dev` dan selalu tarik pembaruan terbaru:
   `git checkout dev` lalu `git pull origin dev`
2. Buat branch fitur baru:
   `git checkout -b feature/nama-fitur-kalian`
3. Lakukan _commit_ jika fitur sudah selesai. Tulis pesan commit yang jelas:
   `git commit -m "feat: membuat tampilan halaman profil talent"`
4. Push ke GitHub:
   `git push origin feature/nama-fitur-kalian`
5. Beritahu ketua tim (Arrazy) untuk melakukan _Pull Request_ dan menggabungkannya ke branch `dev`.
