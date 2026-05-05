"use client";

import { useEffect, useState } from 'react';
import { accessoireService, Accessoire } from '@/lib/api/accessoireService';
import { useCart } from '@/lib/context/CartContext';
import { Star, Truck, ShieldCheck, Check, ShoppingCart } from 'lucide-react';
import { authService } from '@/lib/api/authService';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Accessoire | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [reviews, setReviews] = useState<{user: string, rating: number, comment: string}[]>([
    { user: 'Ahmed T.', rating: 5, comment: 'Excellent produit, je le recommande !' },
    { user: 'Sami B.', rating: 4, comment: 'Très bonne qualité, mais la livraison a pris du temps.' }
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await accessoireService.getById(parseInt(params.id));
        setProduct(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      setReviews([...reviews, { user: 'Vous (Client)', rating: newReview.rating, comment: newReview.comment }]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>;
  if (!product) return <div className="text-center py-20 text-xl font-bold">Produit introuvable.</div>;

  let caracteristiques = {};
  try {
    if (product.caracteristiques) {
       caracteristiques = JSON.parse(product.caracteristiques);
    }
  } catch(e) {}

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pt-8">
      {/* Product Hero */}
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 flex items-center justify-center aspect-square border">
          <img src={product.imageUrl || ''} alt={product.nom} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-primary font-bold tracking-wider uppercase text-sm mb-2">{product.marqueNom}</div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">{product.nom}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex text-yellow-400">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <span className="text-slate-500 font-medium underline cursor-pointer">{reviews.length} avis clients</span>
          </div>

          <div className="text-3xl font-extrabold text-primary">
            {product.prix.toFixed(2)} TND
            {product.prixAncien && <span className="ml-3 text-xl text-slate-400 line-through font-normal">{product.prixAncien.toFixed(2)} TND</span>}
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="pt-6 border-t dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-4">
               <span className="font-bold w-24">Quantité</span>
               <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 w-32">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors flex-1 font-bold">-</button>
                 <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                 <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors flex-1 font-bold">+</button>
               </div>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${added ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90'} disabled:opacity-50`}
            >
              {added ? <><Check className="h-6 w-6"/> Ajouté au panier !</> : <><ShoppingCart className="h-6 w-6"/> Ajouter au panier</>}
            </button>
            {product.stock <= 0 && <p className="text-red-500 text-center font-bold">Produit épuisé.</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
             <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
               <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full"><Truck className="h-5 w-5 text-primary"/></div>
               Livraison rapide sur toute la Tunisie
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
               <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full"><ShieldCheck className="h-5 w-5 text-primary"/></div>
               Garantie: <span className="font-bold ml-1 text-slate-900 dark:text-white">{product.garantie || 'Standard'}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs (Caracteristiques & Avis) */}
      <div className="grid md:grid-cols-3 gap-12 pt-12 border-t dark:border-slate-800">
         <div className="md:col-span-2 space-y-8">
           <h2 className="text-2xl font-bold">Caractéristiques Techniques</h2>
           <div className="bg-white dark:bg-slate-900 rounded-2xl border shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <tbody>
                  {Object.entries(caracteristiques).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-900'}>
                      <th className="py-4 px-6 font-semibold text-slate-900 dark:text-white border-b dark:border-slate-800">{key}</th>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300 border-b dark:border-slate-800">{value as React.ReactNode}</td>
                    </tr>
                  ))}
                  {Object.keys(caracteristiques).length === 0 && <tr><td className="p-6 text-center text-slate-500">Aucune caractéristique détaillée.</td></tr>}
                </tbody>
              </table>
           </div>
         </div>

         <div className="space-y-8">
           <h2 className="text-2xl font-bold">Avis Clients</h2>
           <div className="space-y-4">
              {reviews.map((rev, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{rev.user}</span>
                    <div className="flex text-yellow-400">
                      {Array.from({length: 5}).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < rev.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} />)}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{rev.comment}</p>
                </div>
              ))}
           </div>

           <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border">
             <h3 className="font-bold mb-4">Laisser un avis</h3>
             {!isAuthenticated ? (
               <p className="text-sm text-slate-500">Veuillez vous <Link href="/login" className="text-primary font-bold underline">connecter</Link> pour laisser un avis.</p>
             ) : (
               <form onSubmit={handleAddReview} className="space-y-4">
                 <div>
                   <label className="text-sm font-medium block mb-1">Note</label>
                   <select value={newReview.rating} onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800">
                     <option value="5">5 Étoiles - Excellent</option>
                     <option value="4">4 Étoiles - Très bien</option>
                     <option value="3">3 Étoiles - Correct</option>
                     <option value="2">2 Étoiles - Décevant</option>
                     <option value="1">1 Étoile - Mauvais</option>
                   </select>
                 </div>
                 <div>
                   <label className="text-sm font-medium block mb-1">Commentaire</label>
                   <textarea required value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800 min-h-[100px]" placeholder="Partagez votre expérience avec ce produit..."></textarea>
                 </div>
                 <button type="submit" className="w-full bg-slate-900 dark:bg-primary text-white font-bold py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-primary/90 transition-colors">
                   Publier l'avis
                 </button>
               </form>
             )}
           </div>
         </div>
      </div>
    </div>
  );
}
