"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { authService } from '@/lib/api/authService';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('livraison');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      router.push('/panier');
    }
  }, [cart, step, router]);

  const isAuthenticated = authService.isAuthenticated();

  const handleOrder = async () => {
    setLoading(true);
    // Simuler un appel API pour créer la commande
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success
      clearCart();
    }, 1500);
  };

  if (cart.length === 0 && step !== 3) {
    return null;
  }

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in-95 duration-500 text-center">
        <CheckCircle2 className="h-24 w-24 text-green-500 mb-6" />
        <h1 className="text-4xl font-extrabold mb-4">Commande Confirmée !</h1>
        <p className="text-lg text-slate-500 max-w-md mb-8">Merci pour votre achat. Vous recevrez un email de confirmation avec le numéro de suivi de votre colis très bientôt.</p>
        <Link href="/" className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Finaliser la commande</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Section Adresse */}
          <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span className="bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">1</span> Informations de Livraison</h2>
            {!isAuthenticated && (
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-4 rounded-xl mb-4 text-sm flex justify-between items-center">
                <span>Connectez-vous pour utiliser vos adresses enregistrées.</span>
                <Link href="/login" className="font-bold underline">Se connecter</Link>
              </div>
            )}
            <form className="grid grid-cols-2 gap-4">
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Prénom</label>
                <input type="text" className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Nom</label>
                <input type="text" className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-sm font-medium">Adresse complète</label>
                <input type="text" className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Ville</label>
                <input type="text" className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Téléphone</label>
                <input type="tel" className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
            </form>
          </div>

          {/* Section Paiement */}
          <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span className="bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">2</span> Méthode de Paiement</h2>
            <div className="space-y-3">
              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'livraison' ? 'border-primary bg-primary/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="payment" value="livraison" checked={paymentMethod === 'livraison'} onChange={() => setPaymentMethod('livraison')} className="h-5 w-5 text-primary focus:ring-primary mr-4" />
                <div className="flex-1">
                  <div className="font-bold">Paiement à la livraison</div>
                  <div className="text-sm text-slate-500">Payez en espèces lorsque vous recevez votre commande.</div>
                </div>
                <Truck className="h-6 w-6 text-slate-400" />
              </label>

              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'carte' ? 'border-primary bg-primary/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="payment" value="carte" checked={paymentMethod === 'carte'} onChange={() => setPaymentMethod('carte')} className="h-5 w-5 text-primary focus:ring-primary mr-4" />
                <div className="flex-1">
                  <div className="font-bold">Carte Bancaire</div>
                  <div className="text-sm text-slate-500">Paiement sécurisé en ligne.</div>
                </div>
                <CreditCard className="h-6 w-6 text-slate-400" />
              </label>
            </div>
            
            {paymentMethod === 'carte' && (
               <div className="mt-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 space-y-4 animate-in fade-in slide-in-from-top-2">
                 <input type="text" placeholder="Numéro de carte" className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900" />
                 <div className="flex gap-4">
                   <input type="text" placeholder="MM/AA" className="w-1/2 p-2 rounded-lg border bg-white dark:bg-slate-900" />
                   <input type="text" placeholder="CVC" className="w-1/2 p-2 rounded-lg border bg-white dark:bg-slate-900" />
                 </div>
               </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-4">Votre Commande</h3>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 bg-slate-50 rounded flex items-center justify-center shrink-0">
                     <img src={item.product.imageUrl || ''} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium line-clamp-1">{item.product.nom}</div>
                    <div className="text-slate-500">Qté: {item.quantity}</div>
                  </div>
                  <div className="font-bold">{(item.product.prix * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mb-6 space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Sous-total</span>
                <span>{cartTotal.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold">Total TTC</span>
                <span className="font-extrabold text-primary">{cartTotal.toFixed(2)} TND</span>
              </div>
            </div>

            <button onClick={handleOrder} disabled={loading} className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50">
              {loading ? 'Traitement...' : 'Confirmer l\'achat'} <CheckCircle2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
