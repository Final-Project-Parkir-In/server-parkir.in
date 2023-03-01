1.  User landing di halaman login/register
    User melakukan login - Backend merespon access_token (username, id)
    User melakukan Register - Seperti biasa
2.  User masuk ke home page
    isi homepage:
    dua card(card untuk masuk peta, dan card untuk masuk ke list mall) dan bottom tab =>
    a. Card Peta : mengarah ke halaman berisi maps dengan lokasi mall terdekat dengan user

             b. Card List mall: mengarah ke halaman berisi List semua mall (get all mall)
                 - berisi SEMUA list parking spot yang sesuai dengan id mall yang dipilih (get all parking spot where mallId === param.id(mall))
                     > user memilih parking spot yang tersedia
                        - masuk ke page pembayaran
                         if(berhasil) {
                          parkingspot.isavailable = false
                         } else {
                          msg: Parkir tidak tersedia
                         }
