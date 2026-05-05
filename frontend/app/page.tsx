"use client";
import { useEffect, useState } from 'react';
import { accessoireService, Accessoire } from '@/lib/api/accessoireService';
import Link from 'next/link';
import { ChevronRight, ShoppingCart, Percent, Check } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

export default function Home() {
  const [promotions, setPromotions] = useState<Accessoire[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const promoRes = await accessoireService.filter({ enPromotion: true, size: 4 });
        setPromotions(promoRes.data?.content || []);
      } catch (error) {
        console.error("Erreur chargement données accueil", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, acc: Accessoire) => {
    e.preventDefault();
    addToCart(acc, 1);
    setAddedItems({...addedItems, [acc.id]: true});
    setTimeout(() => {
      setAddedItems(prev => ({...prev, [acc.id]: false}));
    }, 2000);
  };

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden rounded-2xl mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10" />
        <div className="relative z-20 px-8 py-16 md:py-24 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Les Meilleurs Accessoires<br/>Pour Votre Smartphone
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-lg">
            Découvrez notre large gamme de coques, chargeurs rapides, écouteurs sans fil et montres connectées aux meilleurs prix en Tunisie.
          </p>
          <Link href="/accessoires" className="inline-flex items-center justify-center rounded-full bg-white text-primary px-8 py-3.5 text-base font-bold shadow-lg hover:bg-slate-50 transition-colors">
            Voir le catalogue <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Accessoires smartphone" 
          className="absolute top-0 right-0 h-full w-full object-cover opacity-40 md:w-2/3"
        />
      </section>

      {/* Catégories Rapides */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Catégories Populaires</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { nom: 'Audio & Écouteurs', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80', id: 3 },
            { nom: 'Charge & Câbles', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80', id: 2 },
            { nom: 'Smartwatches', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80', id: 5 },
            { nom: 'Protections', image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=500&q=80', id: 1 },
          ].map((cat) => (
            <Link key={cat.id} href={`/accessoires?categorieId=${cat.id}`} className="group relative rounded-xl overflow-hidden aspect-[4/3] flex items-end p-4 text-white">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <img src={cat.image} alt={cat.nom} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <h3 className="relative z-20 font-bold text-lg">{cat.nom}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Percent className="h-6 w-6 text-red-500"/> Ventes Flash</h2>
          <Link href="/accessoires?enPromotion=true" className="text-primary font-medium hover:underline flex items-center">
            Voir tout <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-80 bg-slate-100 animate-pulse rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {promotions.map((acc) => (
              <div key={acc.id} className="group flex flex-col bg-white rounded-xl border hover:shadow-xl transition-all overflow-hidden relative">
                {acc.enPromotion && acc.prixAncien && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    -{Math.round(((acc.prixAncien - acc.prix) / acc.prixAncien) * 100)}%
                  </div>
                )}
                <Link href={`/accessoires/${acc.id}`} className="relative aspect-square p-4 flex items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors">
                  <img src={acc.imageUrl || 'https://via.placeholder.com/300'} alt={acc.nom} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-slate-500 mb-1">{acc.marqueNom}</div>
                  <Link href={`/accessoires/${acc.id}`} className="font-semibold text-slate-800 leading-tight mb-2 hover:text-primary line-clamp-2">
                    {acc.nom}
                  </Link>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="font-bold text-xl text-primary">{acc.prix.toFixed(2)} TND</div>
                      {acc.prixAncien && <div className="text-sm text-slate-400 line-through">{acc.prixAncien.toFixed(2)} TND</div>}
                    </div>
                    <button onClick={(e) => handleAddToCart(e, acc)} className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${addedItems[acc.id] ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-primary hover:text-white'}`}>
                      {addedItems[acc.id] ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
