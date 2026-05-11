"use client";
import { useEffect, useState } from 'react';
import { commandeService, CommandeResponseDTO } from '@/lib/api/commandeService';

export default function AdminCommandesPage() {
  const [commandes, setCommandes] = useState<CommandeResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await commandeService.getAll();
        setCommandes(res.data || []);
      } catch (error) {
        console.error("Erreur chargement des commandes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommandes();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Commandes</h2>
      </div>

      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm text-left">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">ID</th>
                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Date</th>
                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Client</th>
                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Téléphone</th>
                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Total</th>
                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Méthode</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {loading ? (
                <tr><td colSpan={6} className="p-4 text-center">Chargement...</td></tr>
              ) : commandes.length === 0 ? (
                <tr><td colSpan={6} className="p-4 text-center">Aucune commande trouvée.</td></tr>
              ) : (
                commandes.map((cmd) => (
                  <tr key={cmd.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group">
                    <td className="p-4 align-top font-medium whitespace-nowrap">CMD-{cmd.id}</td>
                    <td className="p-4 align-top whitespace-nowrap">{new Date(cmd.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="p-4 align-top">
                      <div className="font-bold">{cmd.prenom} {cmd.nom}</div>
                      <div className="text-xs text-muted-foreground">{cmd.adresse}, {cmd.ville}</div>
                    </td>
                    <td className="p-4 align-top whitespace-nowrap">{cmd.telephone}</td>
                    <td className="p-4 align-top font-bold text-primary whitespace-nowrap">{cmd.total.toFixed(2)} TND</td>
                    <td className="p-4 align-top">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 uppercase">
                        {cmd.methodPaiement}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Détails des commandes */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Détails des articles vendus</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commandes.map((cmd) => (
                <div key={cmd.id} className="bg-card border rounded-lg p-4 shadow-sm">
                    <div className="font-bold border-b pb-2 mb-2 flex justify-between">
                        <span>CMD-{cmd.id}</span>
                        <span className="text-muted-foreground">{cmd.prenom} {cmd.nom}</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                        {cmd.lignes.map((ligne) => (
                            <li key={ligne.id} className="flex justify-between items-center bg-muted/50 p-2 rounded">
                                <span className="font-medium line-clamp-1">{ligne.accessoireNom}</span>
                                <span className="font-bold text-primary shrink-0 ml-2">x{ligne.quantite}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
