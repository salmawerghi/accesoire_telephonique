"use client";
import { useEffect, useState } from 'react';
import { marqueService, Marque } from '@/lib/api/marqueService';
import Link from 'next/link';
import { Plus, Trash, Globe } from 'lucide-react';

export default function MarquesPage() {
  const [marques, setMarques] = useState<Marque[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMarques = async () => {
    try {
      setLoading(true);
      const res = await marqueService.getAll();
      setMarques(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarques();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette marque ?")) {
      try {
        await marqueService.delete(id);
        fetchMarques();
      } catch (e) {
        alert("Erreur: Marque probablement liée à des accessoires.");
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Marques</h2>
        <Link href="/marques/nouveau" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Nouvelle Marque
        </Link>
      </div>

      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">Logo</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Nom</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Pays d'origine</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {loading ? (
                <tr><td colSpan={4} className="p-4 text-center">Chargement...</td></tr>
              ) : marques.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center">Aucune marque trouvée.</td></tr>
              ) : (
                marques.map((item) => (
                  <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">
                      {item.logoUrl ? <img src={item.logoUrl} alt={item.nom} className="h-8 w-8 rounded-full object-cover" /> : <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><Globe className="h-4 w-4 text-muted-foreground" /></div>}
                    </td>
                    <td className="p-4 align-middle font-medium">{item.nom}</td>
                    <td className="p-4 align-middle">{item.paysOrigine || '-'}</td>
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
