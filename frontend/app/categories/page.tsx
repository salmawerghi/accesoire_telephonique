"use client";
import { useEffect, useState } from 'react';
import { categorieService, Categorie } from '@/lib/api/categorieService';
import Link from 'next/link';
import { Plus, Trash } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categorieService.getAll();
      setCategories(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await categorieService.delete(id);
        fetchCategories();
      } catch (e) {
        alert("Erreur: Catégorie probablement liée à des accessoires.");
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Catégories</h2>
        <Link href="/categories/nouveau" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Nouvelle Catégorie
        </Link>
      </div>

      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">ID</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Nom</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {loading ? (
                <tr><td colSpan={4} className="p-4 text-center">Chargement...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center">Aucune catégorie trouvée.</td></tr>
              ) : (
                categories.map((item) => (
                  <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{item.id}</td>
                    <td className="p-4 align-middle font-medium">{item.nom}</td>
                    <td className="p-4 align-middle">{item.description || '-'}</td>
                    <td className="p-4 align-middle text-right">
                      <button onClick={() => handleDelete(item.id)} className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent hover:text-accent-foreground text-red-500">
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
