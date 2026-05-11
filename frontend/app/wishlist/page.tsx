"use client";

import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import Link from 'next/link';
import { ShoppingCart, Trash2, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    setAddedItems({...addedItems, [product.id]: true});
    setTimeout(() => {
      setAddedItems(prev => ({...prev, [product.id]: false}));
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-current" /> Ma Liste de Souhaits
          </h1>
          <p className="text-slate-500 mt-2">Retrouvez tous les articles que vous avez aimés.</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-primary">{wishlist.length}</span>
          <span className="text-slate-500 ml-2">Articles</span>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-16 text-center space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <Heart className="h-10 w-10 text-slate-300" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Votre liste est vide</h2>
            <p className="text-slate-500 max-w-md mx-auto">Vous n&apos;avez pas encore ajouté d&apos;articles à vos favoris. Parcourez notre catalogue pour trouver votre bonheur !</p>
          </div>
          <Link href="/accessoires" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all group">
            Découvrir nos produits <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-2xl border hover:shadow-xl transition-all overflow-hidden flex flex-col">
              <div className="relative aspect-square p-6 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center">
                <img 
                  src={product.imageUrl || 'https://via.placeholder.com/300'} 
                  alt={product.nom} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform"
                />
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 h-10 w-10 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-full flex items-center justify-center shadow-md transition-colors"
                  title="Retirer des favoris"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                {product.enPromotion && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                    PROMO
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs text-primary font-bold uppercase tracking-wider">{product.marqueNom}</div>
                  <Link href={`/accessoires/${product.id}`} className="font-bold text-lg leading-tight hover:text-primary transition-colors line-clamp-2">
                    {product.nom}
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {product.prix.toFixed(2)} TND
                  </div>
                  {product.prixAncien && (
                    <div className="text-sm text-slate-400 line-through">
                      {product.prixAncien.toFixed(2)} TND
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-auto">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      addedItems[product.id] 
                        ? 'bg-green-500 text-white' 
                        : 'bg-slate-900 dark:bg-primary text-white hover:opacity-90'
                    } disabled:opacity-50`}
                  >
                    {addedItems[product.id] ? (
                      <>Ajouté !</>
                    ) : (
                      <><ShoppingCart className="h-5 w-5" /> Ajouter au panier</>
                    )}
                  </button>
                  {product.stock <= 0 && (
                    <p className="text-red-500 text-center text-xs font-bold mt-2">Article épuisé</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {wishlist.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border text-center">
          <h3 className="text-xl font-bold mb-2">Envie d&apos;autre chose ?</h3>
          <p className="text-slate-500 mb-6">Continuez votre shopping et trouvez les meilleurs accessoires pour votre téléphone.</p>
          <Link href="/accessoires" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">
            Retour à la boutique <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
