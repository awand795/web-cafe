<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Menu;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ===================== ADMIN USER =====================
        User::create([
            'name' => 'Admin Bikin Cafe',
            'email' => 'admin@bikincafe.com',
            'password' => 'admin123',
        ]);

        // ===================== KATEGORI =====================
        $kopi = Category::create(['name' => 'Kopi', 'slug' => 'kopi']);
        $nonKopi = Category::create(['name' => 'Non Kopi', 'slug' => 'non-kopi']);
        $makananRingan = Category::create(['name' => 'Makanan Ringan', 'slug' => 'makanan-ringan']);
        $makananBerat = Category::create(['name' => 'Makanan Berat', 'slug' => 'makanan-berat']);
        $dessert = Category::create(['name' => 'Dessert', 'slug' => 'dessert']);
        $rotiPastry = Category::create(['name' => 'Roti & Pastry', 'slug' => 'roti-pastry']);

        // ===================== KOPI =====================
        Menu::create([
            'category_id' => $kopi->id,
            'name' => 'Es Kopi Susu Kekinian',
            'description' => 'Kopi susu dengan gula aren asli, creamy dan manis pas. Minuman favorit anak muda Indonesia.',
            'price' => 28000,
            'image_url' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $kopi->id,
            'name' => 'Kopi Hitam Tubruk',
            'description' => 'Kopi hitam khas Indonesia, diseduh tradisional dengan ampasnya. Kuat, pekat, dan autentik.',
            'price' => 18000,
            'image_url' => 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $kopi->id,
            'name' => 'Vietnam Drip',
            'description' => 'Kopi Vietnam tetes dengan susu kental manis, diminum panas atau dingin sama nikmatnya.',
            'price' => 32000,
            'image_url' => 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        Menu::create([
            'category_id' => $kopi->id,
            'name' => 'Cappuccino Klasik',
            'description' => 'Espresso dengan busa susu yang lembut dan tebal, taburan bubuk kayu manis di atasnya.',
            'price' => 35000,
            'image_url' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        Menu::create([
            'category_id' => $kopi->id,
            'name' => 'Es Kopi Milo',
            'description' => 'Perpaduan kopi dan milo yang legit, topping bubuk milo tebal. Favorit sepanjang masa!',
            'price' => 30000,
            'image_url' => 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        // ===================== NON KOPI =====================
        Menu::create([
            'category_id' => $nonKopi->id,
            'name' => 'Matcha Latte',
            'description' => 'Matcha bubuk premium asli Jepang, dipadukan dengan susu segar. Hijau alami tanpa pemanis buatan.',
            'price' => 38000,
            'image_url' => 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $nonKopi->id,
            'name' => 'Red Velvet Latte',
            'description' => 'Minuman creamy dengan cita rasa red velvet yang manis dan elegan, tanpa kafein.',
            'price' => 36000,
            'image_url' => 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $nonKopi->id,
            'name' => 'Lychee Squash',
            'description' => 'Minuman segar dari buah leci asli dengan soda, daun mint, dan es batu. Segar banget!',
            'price' => 32000,
            'image_url' => 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        Menu::create([
            'category_id' => $nonKopi->id,
            'name' => 'Chocolate Hazelnut',
            'description' => 'Cokelat panas premium dengan hazelnut paste, whipped cream, dan taburan kacang.',
            'price' => 40000,
            'image_url' => 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        Menu::create([
            'category_id' => $nonKopi->id,
            'name' => 'Kunyit Asam Telang',
            'description' => 'Kombinasi kunyit asam dengan bunga telang. Cantik, menyegarkan, dan kaya antioksidan.',
            'price' => 28000,
            'image_url' => 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        // ===================== MAKANAN RINGAN =====================
        Menu::create([
            'category_id' => $makananRingan->id,
            'name' => 'Singkong Goreng Keju',
            'description' => 'Singkong goreng renyah di luar, lembut di dalam, diberi taburan keju parut dan bumbu spesial.',
            'price' => 22000,
            'image_url' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $makananRingan->id,
            'name' => 'Tahu Cabe Garam',
            'description' => 'Tahu goreng crispy dengan tumis cabe, bawang putih, dan daun jeruk. Pedas gurih nagih!',
            'price' => 25000,
            'image_url' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $makananRingan->id,
            'name' => 'Pisang Goreng Cokelat Keju',
            'description' => 'Pisang goreng hangat dengan lelehan cokelat dan taburan keju. Jajanan klasik yang selalu bikin kangen.',
            'price' => 20000,
            'image_url' => 'https://images.unsplash.com/photo-1562007908-17c67e878c88?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        Menu::create([
            'category_id' => $makananRingan->id,
            'name' => 'French Fries Truffle',
            'description' => 'Kentang goreng gurih dengan minyak truffle dan parmesan. Cocok untuk ngemil santai.',
            'price' => 32000,
            'image_url' => 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        // ===================== MAKANAN BERAT =====================
        Menu::create([
            'category_id' => $makananBerat->id,
            'name' => 'Nasi Goreng Kampung',
            'description' => 'Nasi goreng tradisional dengan bumbu pedas, telur ceplok, kerupuk, dan lalapan segar.',
            'price' => 42000,
            'image_url' => 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $makananBerat->id,
            'name' => 'Mie Aceh Goreng',
            'description' => 'Mie tebal khas Aceh dengan bumbu rempah, daging sapi, dan acar bawang. Pedas menggugah selera!',
            'price' => 45000,
            'image_url' => 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $makananBerat->id,
            'name' => 'Chicken Katsu',
            'description' => 'Ayam fillet goreng tepung crispy, disajikan dengan saus katsu, nasi hangat, dan salad kol.',
            'price' => 40000,
            'image_url' => 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        Menu::create([
            'category_id' => $makananBerat->id,
            'name' => 'Indomie Kuah Telur',
            'description' => 'Indomie kuah dengan telur, sosis, sayuran, dan sambal. Sederhana tapi bikin kenyang!',
            'price' => 22000,
            'image_url' => 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        // ===================== DESSERT =====================
        Menu::create([
            'category_id' => $dessert->id,
            'name' => 'Pisang Ijo Kekinian',
            'description' => 'Pisang ijo tradisional dengan saus santan, sirup merah, dan es serut. Dessert nostalgia yang di-upgrade.',
            'price' => 28000,
            'image_url' => 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $dessert->id,
            'name' => 'Klepon Dessert Box',
            'description' => 'Klepon tradisional dalam versi dessert box — cake pandan, filling gula merah, dan taburan kelapa.',
            'price' => 35000,
            'image_url' => 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $dessert->id,
            'name' => 'Es Campur Spesial',
            'description' => 'Es campur dengan campuran buah segar, cincau, kolang-kaling, dan susu kental manis. Segar maksimal!',
            'price' => 30000,
            'image_url' => 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        Menu::create([
            'category_id' => $dessert->id,
            'name' => 'Martabak Mini Cokelat Keju',
            'description' => 'Martabak manis mini dengan filling cokelat dan keju meleleh. Topping sesuai permintaan.',
            'price' => 25000,
            'image_url' => 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        // ===================== ROTI & PASTRY =====================
        Menu::create([
            'category_id' => $rotiPastry->id,
            'name' => 'Roti Bakar Cokelat Keju',
            'description' => 'Roti tawar panggang dengan olesan butter, cokelat, dan keju. Kreasi klasik kafe Indonesia.',
            'price' => 22000,
            'image_url' => 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $rotiPastry->id,
            'name' => 'Croissant Almond',
            'description' => 'Croissant Prancis dengan isian krim almond dan taburan kacang almond panggang.',
            'price' => 35000,
            'image_url' => 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);

        Menu::create([
            'category_id' => $rotiPastry->id,
            'name' => 'Banana Nutella Toast',
            'description' => 'Roti panggang dengan olesan Nutella, irisan pisang segar, dan sedikit taburan gula halus.',
            'price' => 28000,
            'image_url' => 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80',
            'is_popular' => true,
        ]);

        Menu::create([
            'category_id' => $rotiPastry->id,
            'name' => 'Roti Sobek Pandan',
            'description' => 'Roti sobek empuk dengan aroma pandan asli, isian cokelat dan keju. Homemade setiap hari.',
            'price' => 25000,
            'image_url' => 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80',
            'is_popular' => false,
        ]);
    }
}
