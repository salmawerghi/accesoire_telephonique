"use client";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { accessoireService, AccessoireDTO } from '@/lib/api/accessoireService';
import { categorieService, Categorie } from '@/lib/api/categorieService';
import { marqueService, Marque } from '@/lib/api/marqueService';
import { Save, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { aiService } from '@/lib/api/aiService';

export default function EditAccessoirePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<AccessoireDTO>();
  
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [marques, setMarques] = useState<Marque[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Observer les champs pour l'IA
  const watchedNom = watch("nom");
  const watchedMarqueId = watch("marqueId");
  const watchedCategorieId = watch("categorieId");

  const generateWithAI = async () => {
    if (!watchedNom) {
      alert("Veuillez d'abord saisir le nom de l'article.");
      return;
    }

    try {
      setIsGenerating(true);
      const marque = marques.find(m => m.id === Number(watchedMarqueId))?.nom || "";
      const categorie = categories.find(c => c.id === Number(watchedCategorieId))?.nom || "";
      
      const description = await aiService.generateDescription(watchedNom, marque, categorie);
      setValue("description", description as string);
    } catch (e) {
      alert("Erreur lors de la génération de la description.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, catRes, marRes] = await Promise.all([
          accessoireService.getById(id),
          categorieService.getAll(),
          marqueService.getAll()
        ]);
        const acc = accRes.data;
        setCategories(catRes.data || []);
        setMarques(marRes.data || []);
        // Pre-fill the form with existing data
        reset({
          nom: acc.nom,
          description: acc.description || '',
          prix: acc.prix,
          prixAncien: acc.prixAncien ?? undefined,
          stock: acc.stock,
          enPromotion: acc.enPromotion || false,
          reference: acc.reference || '',
          imageUrl: acc.imageUrl || '',
          categorieId: acc.categorieId || acc.categorie?.id,
          marqueId: acc.marqueId || acc.marque?.id,
        } as any);
      } catch (e) {
        console.error("Erreur chargement accessoire", e);
        alert("Accessoire introuvable");
        router.push('/accessoires');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, reset, router]);

  const onSubmit = async (data: AccessoireDTO) => {
    try {
      const payload: AccessoireDTO = {
        nom: data.nom,
        description: data.description || undefined,
        prix: Number(data.prix),
        prixAncien: data.prixAncien ? Number(data.prixAncien) : undefined,
        stock: data.stock ? Number(data.stock) : 0,
        enPromotion: !!data.enPromotion,
        imageUrl: data.imageUrl || undefined,
        reference: data.reference || undefined,
        categorieId: data.categorieId ? Number(data.categorieId) : undefined,
        marqueId: data.marqueId ? Number(data.marqueId) : undefined,
      };
      await accessoireService.update(id, payload);
      router.push('/accessoires');
    } catch (error: any) {
      const message = error?.response?.data?.message || "Erreur lors de la mise à jour de l'accessoire";
      alert(message);
      console.error(error);
    }
  };

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <Link href="/accessoires" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 hover:bg-accent hover:text-accent-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Modifier l&apos;Accessoire</h2>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Nom <span className="text-red-500">*</span></label>
              <input 
                {...register("nom", { required: "Le nom est requis" })} 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                placeholder="Ex: Coque iPhone 14"
              />
              {errors.nom && <span className="text-sm text-red-500">{errors.nom.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Référence</label>
              <input 
                {...register("reference")} 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                placeholder="Ex: REF-1234"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none">Description</label>
              <button 
                type="button"
                onClick={generateWithAI}
                disabled={isGenerating || !watchedNom}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary/10 px-2 py-1 rounded-md transition-all disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                Générer avec l'IA
              </button>
            </div>
            <textarea 
              {...register("description")} 
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              placeholder="Description de l'article..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Prix (€) <span className="text-red-500">*</span></label>
              <input 
                type="number" step="0.01" min="0"
                {...register("prix", { required: "Le prix est requis", min: 0 })} 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Prix Ancien (€)</label>
              <input 
                type="number" step="0.01" min="0"
                {...register("prixAncien")} 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                placeholder="Laisser vide si pas de promo"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="enPromotion"
              {...register("enPromotion")} 
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="enPromotion" className="text-sm font-medium leading-none cursor-pointer">
              En Promotion 🔥
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Stock</label>
              <input 
                type="number" min="0"
                {...register("stock", { min: 0 })} 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Catégorie</label>
              <select 
                {...register("categorieId")} 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Marque</label>
              <select 
                {...register("marqueId")} 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Sélectionner une marque</option>
                {marques.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">URL de l&apos;image</label>
            <input 
              {...register("imageUrl")} 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Link href="/accessoires" className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              Annuler
            </Link>
            <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 disabled:opacity-50">
              <Save className="mr-2 h-4 w-4" /> {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
