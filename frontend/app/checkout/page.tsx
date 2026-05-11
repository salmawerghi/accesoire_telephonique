"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { authService } from '@/lib/api/authService';
import { commandeService } from '@/lib/api/commandeService';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, CheckCircle2, Printer } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('livraison');
  const [loading, setLoading] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    adresse: '',
    ville: '',
    telephone: ''
  });

  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      router.push('/panier');
    }
  }, [cart, step, router]);

  const isAuthenticated = authService.isAuthenticated();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const lignes = cart.map(item => ({
        accessoireId: item.product.id,
        quantite: item.quantity
      }));

      const payload = {
        ...formData,
        methodPaiement: paymentMethod,
        lignes
      };

      const response = await commandeService.create(payload);
      
      setOrderSummary({
        items: [...cart],
        total: response.data.total,
        date: new Date(response.data.createdAt).toLocaleDateString('fr-FR'),
        id: "CMD-" + response.data.id
      });
      setStep(3); // Success
      clearCart();
    } catch (error: any) {
      alert("Erreur lors de la création de la commande: " + (error.response?.data?.message || "Erreur interne"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return null;
  }

  if (step === 3 && orderSummary) {
    return (
      <div className="max-w-3xl mx-auto py-10 animate-in zoom-in-95 duration-500">
        <div className="text-center print:hidden">
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-2">Commande Confirmée !</h1>
          <p className="text-lg text-slate-500 mb-8">Merci pour votre achat. Voici votre reçu.</p>
          
          <div className="flex justify-center gap-4 mb-8">
            <button onClick={() => window.print()} className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2">
              <Printer className="h-5 w-5" /> Imprimer la facture (PDF)
            </button>
            <Link href="/" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors">
              Retour à l'accueil
            </Link>
          </div>
        </div>

        {/* Zone imprimable : Facture */}
        <div className="bg-white text-black p-10 border rounded-2xl shadow-sm print:shadow-none print:border-none print:p-0">
          <div className="flex justify-between items-start mb-10 border-b pb-8">
            <div>
              <h2 className="text-3xl font-black text-primary mb-2">TECHSTORE</h2>
              <p className="text-slate-500">Avenue Habib Bourguiba, Tunis</p>
              <p className="text-slate-500">contact@techstore.tn | +216 71 000 000</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-slate-300 mb-2">FACTURE</h2>
              <p className="font-bold">N° : {orderSummary.id}</p>
              <p className="text-slate-500">Date : {orderSummary.date}</p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-slate-800">
                <th className="text-left py-3 font-bold">Produit</th>
                <th className="text-center py-3 font-bold">Qté</th>
                <th className="text-right py-3 font-bold">Prix Unitaire</th>
                <th className="text-right py-3 font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderSummary.items.map((item: any, idx: number) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="py-4 font-medium">{item.product.nom}</td>
                  <td className="text-center py-4">{item.quantity}</td>
                  <td className="text-right py-4">{item.product.prix.toFixed(2)} TND</td>
                  <td className="text-right py-4 font-bold">{(item.product.prix * item.quantity).toFixed(2)} TND</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-slate-500">
                <span>Sous-total HT</span>
                <span>{(orderSummary.total * 0.81).toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>TVA (19%)</span>
                <span>{(orderSummary.total * 0.19).toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-xl font-black border-t-2 border-slate-800 pt-3">
                <span>Total TTC</span>
                <span>{orderSummary.total.toFixed(2)} TND</span>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center text-sm text-slate-500 border-t pt-8">
            Merci de votre confiance. Document généré électroniquement.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 print:hidden">
      <h1 className="text-3xl font-bold tracking-tight">Finaliser la commande</h1>

      <form id="checkout-form" onSubmit={handleOrder} className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Section Adresse */}
          <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span className="bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">1</span> Informations de Livraison</h2>
            {!isAuthenticated && (
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-4 rounded-xl mb-4 text-sm flex justify-between items-center">
                <span>Connectez-vous pour pré-remplir vos informations.</span>
                <Link href="/login" className="font-bold underline">Se connecter</Link>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Prénom</label>
                <input type="text" name="prenom" value={formData.prenom} onChange={handleInputChange} className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Nom</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-sm font-medium">Adresse complète</label>
                <input type="text" name="adresse" value={formData.adresse} onChange={handleInputChange} className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Ville</label>
                <input type="text" name="ville" value={formData.ville} onChange={handleInputChange} className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Téléphone</label>
                <input type="tel" name="telephone" value={formData.telephone} onChange={handleInputChange} className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800" required />
              </div>
            </div>
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

            <button type="submit" form="checkout-form" disabled={loading} className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50">
              {loading ? 'Traitement...' : 'Confirmer l\'achat'} <CheckCircle2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


