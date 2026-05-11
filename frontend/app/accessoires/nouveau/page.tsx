"use client";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { accessoireService, AccessoireDTO } from '@/lib/api/accessoireService';
import { categorieService, Categorie } from '@/lib/api/categorieService';
import { marqueService, Marque } from '@/lib/api/marqueService';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NouveaAccessoirePage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AccessoireDTO>();

  const [categories, setCategories] = useState<Categorie[]>([]);
  const [marques, setMarques] = useState<Marque[]>([]);

  useEffect(() => {
    const fetchSelects = async () => {
      try {
        const [catRes, marRes] = await Promise.all([
          categorieService.getAll(),
          marqueService.getAll()
        ]);
        setCategories(catRes.data || []);
        setMarques(marRes.data || []);
      } catch (e) {
        console.error("Erreur chargement des catégories et marques", e);
      }
    };
    fetchSelects();
  }, []);

  const onSubmit = async (data: AccessoireDTO) => {
    try {
      // Convert strings to numbers and empty strings to undefined for optional fields
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
      await accessoireService.create(payload);
      router.push('/accessoires');
    } catch (error: any) {
      const message = error?.response?.data?.message || "Erreur lors de la création de l'accessoire";
      alert(message);
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <Link href="/accessoires" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 hover:bg-accent hover:text-accent-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Nouvel Accessoire</h2>
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
            <label className="text-sm font-medium leading-none">Description</label>
            <textarea
              {...register("description")}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
              <label className="text-sm font-medium leading-none">Stock</label>
              <input
                type="number" min="0" defaultValue={0}
                {...register("stock", { min: 0 })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <label className="text-sm font-medium leading-none">URL de l'image</label>
            <input
              {...register("imageUrl")}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
