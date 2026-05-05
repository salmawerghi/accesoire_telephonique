"use client";
import { useEffect, useState, Suspense } from 'react';
import { accessoireService, Accessoire } from '@/lib/api/accessoireService';
import { categorieService, Categorie } from '@/lib/api/categorieService';
import { marqueService, Marque } from '@/lib/api/marqueService';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShoppingCart, Filter, X, Check } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

function AccessoiresContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});

  const handleAddToCart = (e: React.MouseEvent, acc: Accessoire) => {
    e.preventDefault();
    addToCart(acc, 1);
    setAddedItems({...addedItems, [acc.id]: true});
    setTimeout(() => {
      setAddedItems(prev => ({...prev, [acc.id]: false}));
    }, 2000);
  };
  
  const [accessoires, setAccessoires] = useState<Accessoire[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [marques, setMarques] = useState<Marque[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtres state
  const [selectedCats, setSelectedCats] = useState<number[]>([]);
  const [selectedMarques, setSelectedMarques] = useState<number[]>([]);
  const [promoOnly, setPromoOnly] = useState(false);
  const [prixMax, setPrixMax] = useState<number>(2000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const initData = async () => {
      const [catsRes, marqRes] = await Promise.all([
        categorieService.getAll(),
        marqueService.getAll()
      ]);
      setCategories(Array.isArray(catsRes.data) ? catsRes.data : []);
      setMarques(Array.isArray(marqRes.data) ? marqRes.data : []);
    };
    initData();
  }, []);

  useEffect(() => {
    // Lire les query params
    const catId = searchParams.get('categorieId');
    if (catId) setSelectedCats([parseInt(catId)]);
    
    const enPromo = searchParams.get('enPromotion');
    if (enPromo === 'true') setPromoOnly(true);
    
    const search = searchParams.get('search');
    
    fetchFilteredAccessoires(search, catId ? [parseInt(catId)] : [], [], enPromo === 'true', 2000);
  }, [searchParams]);

  const fetchFilteredAccessoires = async (search: string | null, cats: number[], marks: number[], promo: boolean, pMax: number) => {
    setLoading(true);
    try {
      // Simplification : si plusieurs catégories/marques sélectionnées, on ne gère que la première dans cet exemple basique API
      // Dans un vrai projet, l'API devrait accepter list<Long>
      const params: any = { size: 50 };
      if (search) params.nom = search;
      if (cats.length > 0) params.categorieId = cats[0]; 
      if (marks.length > 0) params.marqueId = marks[0];
      if (promo) params.enPromotion = true;
      if (pMax < 2000) params.prixMax = pMax;

      const res = await accessoireService.filter(params);
      setAccessoires(res.data?.content || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    fetchFilteredAccessoires(searchParams.get('search'), selectedCats, selectedMarques, promoOnly, prixMax);
    setShowFilters(false);
  };

  const toggleCat = (id: number) => {
    setSelectedCats(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleMarque = (id: number) => {
    setSelectedMarques(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 py-6 animate-in fade-in">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <span className="font-semibold">{accessoires.length} Produits trouvés</span>
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-md">
          <Filter className="h-4 w-4" /> Filtres
        </button>
      </div>

      {/* Sidebar Filtres */}
      <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white border rounded-xl p-5 sticky top-24 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Filtres</h3>
            {showFilters && <button onClick={() => setShowFilters(false)}><X className="h-5 w-5"/></button>}
          </div>

          <div className="space-y-6">
            {/* Promotions */}
            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" checked={promoOnly} onChange={(e) => setPromoOnly(e.target.checked)} className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary" />
                <span className="font-medium text-red-500">En Promotion 🔥</span>
              </label>
            </div>

            <hr className="border-slate-100" />

            {/* Catégories */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-slate-500 uppercase tracking-wider">Catégories</h4>
              <div className="space-y-2">
                {categories.map(c => (
                  <label key={c.id} className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={selectedCats.includes(c.id)} onChange={() => toggleCat(c.id)} className="h-4 w-4 rounded border-slate-300 text-primary" />
                    <span className="text-slate-700">{c.nom}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Marques */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-slate-500 uppercase tracking-wider">Marques</h4>
              <div className="space-y-2">
                {marques.map(m => (
                  <label key={m.id} className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={selectedMarques.includes(m.id)} onChange={() => toggleMarque(m.id)} className="h-4 w-4 rounded border-slate-300 text-primary" />
                    <span className="text-slate-700">{m.nom}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Prix */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-slate-500 uppercase tracking-wider">Prix Max ({prixMax} TND)</h4>
              <input type="range" min="10" max="2000" step="10" value={prixMax} onChange={(e) => setPrixMax(parseInt(e.target.value))} className="w-full accent-primary" />
            </div>

            <button onClick={applyFilters} className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Appliquer les filtres
            </button>
          </div>
        </div>
      </aside>

      {/* Liste Produits */}
      <div className="flex-1">
        <div className="hidden md:flex justify-between items-center mb-6 bg-white p-4 rounded-xl border shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">
            {searchParams.get('search') ? `Résultats pour "${searchParams.get('search')}"` : 'Tous les accessoires'}
          </h1>
          <span className="text-slate-500 font-medium">{accessoires.length} produits</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-80 bg-slate-100 animate-pulse rounded-xl" />)}
          </div>
        ) : accessoires.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Aucun produit trouvé</h2>
            <p className="text-slate-500">Essayez de modifier vos filtres ou votre recherche.</p>
            <button onClick={() => { setSelectedCats([]); setSelectedMarques([]); setPromoOnly(false); setPrixMax(2000); applyFilters(); router.push('/accessoires'); }} className="mt-4 px-6 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 font-medium">Réinitialiser les filtres</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {accessoires.map((acc) => (
              <div key={acc.id} className="group flex flex-col bg-white rounded-xl border hover:shadow-xl transition-all overflow-hidden relative">
                {acc.enPromotion && acc.prixAncien && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
                    -{Math.round(((acc.prixAncien - acc.prix) / acc.prixAncien) * 100)}%
                  </div>
                )}
                {acc.stock <= 0 && (
                  <div className="absolute top-3 left-3 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                    Épuisé
                  </div>
                )}
                <Link href={`/accessoires/${acc.id}`} className="relative aspect-square p-4 flex items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors">
                  <img src={acc.imageUrl || 'https://via.placeholder.com/300'} alt={acc.nom} className={`max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform ${acc.stock <= 0 ? 'grayscale opacity-60' : ''}`} />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-slate-500 mb-1 font-medium">{acc.marqueNom}</div>
                  <Link href={`/accessoires/${acc.id}`} className="font-semibold text-slate-800 leading-tight mb-2 hover:text-primary line-clamp-2 text-sm md:text-base">
                    {acc.nom}
                  </Link>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div>
                      <div className="font-bold text-lg md:text-xl text-primary">{acc.prix.toFixed(2)} TND</div>
                      {acc.prixAncien && <div className="text-xs md:text-sm text-slate-400 line-through">{acc.prixAncien.toFixed(2)} TND</div>}
                    </div>
                    <button onClick={(e) => handleAddToCart(e, acc)} disabled={acc.stock <= 0} className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-slate-100 disabled:hover:text-slate-700 ${addedItems[acc.id] ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-primary hover:text-white'}`}>
                      {addedItems[acc.id] ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AccessoiresPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <AccessoiresContent />
    </Suspense>
  );
}
