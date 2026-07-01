import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useUiStore from '../store/useUiStore';
import { fetchMenus } from '../api';
import './Catalog.css';

const EMOJI_MAP = {
  'Kopi': '☕',
  'Non Kopi': '🌸',
  'Makanan Ringan': '🍟',
  'Makanan Berat': '🍛',
  'Dessert': '🍰',
  'Roti & Pastry': '🥐',
  'Default': '✨',
};

const ITEMS_PER_PAGE = 8;

// ===== ALL FALLBACK DATA (26 menu) =====
const ALL_MENUS = [
  { id: 1, category: { name: 'Kopi' }, name: 'Es Kopi Susu Kekinian', description: 'Kopi susu dengan gula aren asli, creamy dan manis pas.', price: 28000, image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 2, category: { name: 'Kopi' }, name: 'Kopi Hitam Tubruk', description: 'Kopi hitam khas Indonesia, diseduh tradisional. Kuat dan autentik.', price: 18000, image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 3, category: { name: 'Kopi' }, name: 'Vietnam Drip', description: 'Kopi Vietnam tetes dengan susu kental manis. Nikmat panas atau dingin.', price: 32000, image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 4, category: { name: 'Kopi' }, name: 'Cappuccino Klasik', description: 'Espresso dengan busa susu lembut, taburan kayu manis di atasnya.', price: 35000, image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 5, category: { name: 'Kopi' }, name: 'Es Kopi Milo', description: 'Kopi campur milo legit dengan topping bubuk milo tebal!', price: 30000, image_url: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 6, category: { name: 'Non Kopi' }, name: 'Matcha Latte', description: 'Matcha bubuk premium Jepang, dipadukan dengan susu segar.', price: 38000, image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 7, category: { name: 'Non Kopi' }, name: 'Red Velvet Latte', description: 'Minuman creamy red velvet yang manis dan elegan, tanpa kafein.', price: 36000, image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 8, category: { name: 'Non Kopi' }, name: 'Lychee Squash', description: 'Minuman leci segar dengan soda, daun mint, dan es batu.', price: 32000, image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 9, category: { name: 'Non Kopi' }, name: 'Chocolate Hazelnut', description: 'Cokelat panas premium dengan hazelnut paste dan whipped cream.', price: 40000, image_url: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 10, category: { name: 'Non Kopi' }, name: 'Kunyit Asam Telang', description: 'Kunyit asam dengan bunga telang, cantik dan kaya antioksidan.', price: 28000, image_url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 11, category: { name: 'Makanan Ringan' }, name: 'Singkong Goreng Keju', description: 'Singkong goreng renyah dengan taburan keju parut dan bumbu spesial.', price: 22000, image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 12, category: { name: 'Makanan Ringan' }, name: 'Tahu Cabe Garam', description: 'Tahu goreng crispy dengan tumis cabe, bawang putih, daun jeruk.', price: 25000, image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 13, category: { name: 'Makanan Ringan' }, name: 'Pisang Goreng Cokelat Keju', description: 'Pisang goreng hangat dengan lelehan cokelat dan keju.', price: 20000, image_url: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 14, category: { name: 'Makanan Ringan' }, name: 'French Fries Truffle', description: 'Kentang goreng dengan minyak truffle dan parmesan.', price: 32000, image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 15, category: { name: 'Makanan Berat' }, name: 'Nasi Goreng Kampung', description: 'Nasi goreng tradisional pedas, telur ceplok, kerupuk, lalapan.', price: 42000, image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 16, category: { name: 'Makanan Berat' }, name: 'Mie Aceh Goreng', description: 'Mie tebal khas Aceh dengan bumbu rempah dan daging sapi.', price: 45000, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 17, category: { name: 'Makanan Berat' }, name: 'Chicken Katsu', description: 'Ayam fillet goreng crispy dengan saus katsu dan nasi hangat.', price: 40000, image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 18, category: { name: 'Makanan Berat' }, name: 'Indomie Kuah Telur', description: 'Indomie kuah dengan telur, sosis, sayuran, dan sambal.', price: 22000, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 19, category: { name: 'Dessert' }, name: 'Pisang Ijo Kekinian', description: 'Pisang ijo tradisional dengan saus santan, sirup merah, es serut.', price: 28000, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 20, category: { name: 'Dessert' }, name: 'Klepon Dessert Box', description: 'Cake pandan dengan filling gula merah dan taburan kelapa.', price: 35000, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 21, category: { name: 'Dessert' }, name: 'Es Campur Spesial', description: 'Buah segar, cincau, kolang-kaling, susu kental manis.', price: 30000, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 22, category: { name: 'Dessert' }, name: 'Martabak Mini Cokelat Keju', description: 'Martabak manis mini dengan cokelat dan keju meleleh.', price: 25000, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 23, category: { name: 'Roti & Pastry' }, name: 'Roti Bakar Cokelat Keju', description: 'Roti panggang dengan butter, cokelat, dan keju. Klasik!', price: 22000, image_url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 24, category: { name: 'Roti & Pastry' }, name: 'Croissant Almond', description: 'Croissant Prancis dengan krim almond dan almond panggang.', price: 35000, image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', is_popular: false },
  { id: 25, category: { name: 'Roti & Pastry' }, name: 'Banana Nutella Toast', description: 'Roti panggang Nutella dengan irisan pisang segar.', price: 28000, image_url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80', is_popular: true },
  { id: 26, category: { name: 'Roti & Pastry' }, name: 'Roti Sobek Pandan', description: 'Roti sobek pandan homemade dengan isian cokelat keju.', price: 25000, image_url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80', is_popular: false },
];

const Catalog = () => {
  const { activeCategory, setActiveCategory } = useUiStore();
  const gridRef = useRef(null);
  const [page, setPage] = useState(1);

  // Fetch from API (paginated)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['menus', { per_page: ITEMS_PER_PAGE, page }],
    queryFn: fetchMenus,
  });

  // Determine source: API or fallback
  const apiMenus = data?.data?.data ?? [];
  const apiPagination = data?.data?.pagination ?? null;
  const useApi = apiMenus.length > 0;

  // All items for the current source
  const allItems = useApi ? apiMenus : ALL_MENUS;
  // Pagination meta
  const paginationMeta = useApi && apiPagination ? apiPagination : {
    current_page: page,
    last_page: Math.ceil(ALL_MENUS.length / ITEMS_PER_PAGE),
    per_page: ITEMS_PER_PAGE,
    total: ALL_MENUS.length,
  };

  // Categories
  const categories = useMemo(() => {
    const cats = new Set(['Semua']);
    ALL_MENUS.forEach(menu => {
      const name = typeof menu.category === 'object' ? menu.category?.name : menu.category;
      if (name) cats.add(name);
    });
    return Array.from(cats);
  }, []);

  // Filter by category + paginate
  const { filteredMenus, totalFiltered, totalPages } = useMemo(() => {
    // Step 1: filter by category
    const filtered = activeCategory === 'Semua'
      ? ALL_MENUS
      : ALL_MENUS.filter(m => {
          const n = typeof m.category === 'object' ? m.category?.name : m.category;
          return n === activeCategory;
        });

    const total = filtered.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);

    // Step 2: paginate
    const start = (page - 1) * ITEMS_PER_PAGE;
    const paged = filtered.slice(start, start + ITEMS_PER_PAGE);

    return { filteredMenus: paged, totalFiltered: total, totalPages: pages };
  }, [activeCategory, page]);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  // Scroll reveal
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.menu-card');
    cards.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(30px)'; });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(cards).indexOf(entry.target);
          entry.target.style.transition = `all 0.6s var(--ease-out-expo) ${idx * 0.07}s`;
          requestAnimationFrame(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    cards.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, [filteredMenus]);

  const getEmoji = (menu) => {
    const cat = typeof menu.category === 'object' ? menu.category?.name : menu.category;
    return EMOJI_MAP[cat] || EMOJI_MAP['Default'];
  };

  const getCategoryName = (menu) => {
    return typeof menu.category === 'object' ? menu.category?.name : menu.category;
  };

  const formatPrice = (price) => {
    const num = Number(price);
    return `Rp ${num.toLocaleString('id-ID')}`;
  };

  // Page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let s = Math.max(1, page - Math.floor(maxVisible / 2));
    let e = Math.min(totalPages, s + maxVisible - 1);
    if (e - s + 1 < maxVisible) s = Math.max(1, e - maxVisible + 1);
    for (let i = s; i <= e; i++) pages.push(i);
    return pages;
  };

  const from = (page - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(page * ITEMS_PER_PAGE, totalFiltered);

  return (
    <section className="catalog-section" id="menu">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">✦ Pilihan Spesial</span>
          <h2 className="heading-section">Ditata dengan Cinta</h2>
          <p className="section-desc">
            Setiap hidangan dibuat dengan bahan terbaik, disajikan dengan penuh kehangatan
          </p>
        </div>

        {isLoading && (
          <div className="catalog-loading">
            <div className="loading-cup">☕</div>
            <span>Menyiapkan pilihan spesial...</span>
          </div>
        )}
        {isError && !useApi && (
          <div className="catalog-info">Menampilkan menu andalan kami ✦</div>
        )}

        {!isLoading && (
          <>
            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`tab-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'Semua' ? '✦ Semua' : cat}
                </button>
              ))}
            </div>

            <div className="menu-grid" ref={gridRef}>
              {filteredMenus.length === 0 && (
                <div className="catalog-empty">Tidak ada menu di kategori ini.</div>
              )}
              {filteredMenus.map((menu) => (
                <div key={menu.id} className="menu-card">
                  {menu.is_popular && <div className="menu-card-badge">★ Favorit</div>}
                  <div className="menu-card-image">
                    {menu.image_url ? (
                      <img src={menu.image_url} alt={menu.name} loading="lazy" />
                    ) : (
                      <span className="card-image-placeholder">{getEmoji(menu)}</span>
                    )}
                    <div className="menu-card-category">✦ {getCategoryName(menu)}</div>
                  </div>
                  <div className="menu-card-body">
                    <h3 className="menu-card-name">{menu.name}</h3>
                    <p className="menu-card-desc">{menu.description}</p>
                    <div className="menu-card-footer">
                      <span className="menu-card-price">{formatPrice(menu.price)}</span>
                      <button className="menu-card-order">Pesan</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* === PAGINATION === */}
            {totalPages > 1 && filteredMenus.length > 0 && (
              <>
                <div className="pagination">
                  <button
                    className={`pagination-btn ${page === 1 ? 'disabled' : ''}`}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sebelumnya
                  </button>

                  <div className="pagination-pages">
                    {page > 3 && totalPages > 6 && (
                      <>
                        <button className="pagination-num" onClick={() => setPage(1)}>1</button>
                        <span className="pagination-dots">•••</span>
                      </>
                    )}
                    {getPageNumbers().map(p => (
                      <button key={p} className={`pagination-num ${p === page ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                    ))}
                    {page < totalPages - 2 && totalPages > 6 && (
                      <>
                        <span className="pagination-dots">•••</span>
                        <button className="pagination-num" onClick={() => setPage(totalPages)}>{totalPages}</button>
                      </>
                    )}
                  </div>

                  <button
                    className={`pagination-btn ${page === totalPages ? 'disabled' : ''}`}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Selanjutnya
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                <div className="pagination-info">
                  Menampilkan {from}–{to} dari {totalFiltered} menu
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Catalog;
