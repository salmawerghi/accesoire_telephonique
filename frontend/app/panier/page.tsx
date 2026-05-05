"use client";
import { useCart } from '@/lib/context/CartContext';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function PanierPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
        <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-full mb-6">
          <ShoppingBag className="h-24 w-24 text-slate-300 dark:text-slate-700" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Votre panier est vide</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">On dirait que vous n'avez pas encore trouvé votre bonheur. Découvrez nos dernières nouveautés !</p>
        <Link href="/accessoires" className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
          Parcourir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Mon Panier ({cart.length} articles)</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border shadow-sm relative pr-12 sm:pr-4">
              <button 
                onClick={() => removeFromCart(item.product.id)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>

              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 p-2">
                <img src={item.product.imageUrl || 'https://via.placeholder.com/100'} alt={item.product.nom} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-lg leading-tight mb-1">{item.product.nom}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{item.product.marqueNom}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right font-bold text-xl text-primary mt-4 sm:mt-0">
                {(item.product.prix * item.quantity).toFixed(2)} TND
              </div>
            </div>
          ))}
          
          <div className="flex justify-end">
            <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Vider le panier</button>
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6">Récapitulatif</h3>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Sous-total</span>
                <span className="font-medium">{cartTotal.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Livraison</span>
                <span className="font-medium text-green-500">Gratuite</span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total TTC</span>
                <span className="font-extrabold text-2xl text-primary">{cartTotal.toFixed(2)} TND</span>
              </div>
            </div>

            <Link href="/checkout" className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
              Passer la commande <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
