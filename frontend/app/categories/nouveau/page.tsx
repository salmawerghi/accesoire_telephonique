"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { categorieService } from '@/lib/api/categorieService';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CategorieForm {
  nom: string;
  description: string;
}

export default function NouvelleCategorietPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CategorieForm>();

  const onSubmit = async (data: CategorieForm) => {
    try {
      await categorieService.create(data);
      router.push('/categories');
    } catch (error) {
      alert("Erreur lors de la création de la catégorie");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <Link href="/categories" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 hover:bg-accent hover:text-accent-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Nouvelle Catégorie</h2>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Nom <span className="text-red-500">*</span></label>
            <input 
              {...register("nom", { required: "Le nom est requis" })} 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              placeholder="Ex: Protections d'écran"
            />
            {errors.nom && <span className="text-sm text-red-500">{errors.nom.message}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Description</label>
            <textarea 
              {...register("description")} 
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              placeholder="Description de la catégorie..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Link href="/categories" className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
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
