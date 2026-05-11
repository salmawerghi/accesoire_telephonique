"use client";
import { useEffect, useState } from 'react';
import { accessoireService, Accessoire } from '@/lib/api/accessoireService';
import { categorieService } from '@/lib/api/categorieService';
import { marqueService } from '@/lib/api/marqueService';
import { commandeService, DailyStatDTO, CommandeResponseDTO } from '@/lib/api/commandeService';
import { Boxes, Package, Tag, ArrowRight, ShoppingCart, TrendingUp, Calendar, AlertTriangle, MapPin } from 'lucide-react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import dynamic from 'next/dynamic';

const OrderMap = dynamic(() => import('@/components/OrderMap'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-xl" />
});

export default function AdminDashboard() {
  const [stats, setStats] = useState({ accessoires: 0, categories: 0, marques: 0, commandes: 0 });
  const [dailyStats, setDailyStats] = useState<DailyStatDTO[]>([]);
  const [allOrders, setAllOrders] = useState<CommandeResponseDTO[]>([]);
  const [lowStockItems, setLowStockItems] = useState<Accessoire[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [accRes, catRes, marRes, cmdRes, dailyRes] = await Promise.all([
          accessoireService.getAll(0, 1000), 
          categorieService.getAll(),
          marqueService.getAll(),
          commandeService.getAll(),
          commandeService.getDailyStats()
        ]);
        
        const allItems = accRes.data?.content || [];
        const lowStock = allItems.filter((item: Accessoire) => item.stock < 5);
        setLowStockItems(lowStock);
        setAllOrders(cmdRes.data || []);

        setStats({
          accessoires: accRes.data?.totalElements || 0,
          categories: Array.isArray(catRes.data) ? catRes.data.length : 0,
          marques: Array.isArray(marRes.data) ? marRes.data.length : 0,
          commandes: Array.isArray(cmdRes.data) ? cmdRes.data.length : 0
        });
        setDailyStats(dailyRes.data || []);
      } catch (error) {
        console.error("Erreur chargement stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const maxRevenue = Math.max(...dailyStats.map(s => s.totalRevenue), 1);

  const statCards = [
    { name: 'Commandes', value: stats.commandes, icon: ShoppingCart, href: '/admin/commandes', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: 'Total Accessoires', value: stats.accessoires, icon: Boxes, href: '/accessoires', color: 'text-blue-500', bg: 'bg-blue-500/10', alert: lowStockItems.length > 0 },
    { name: 'Total Catégories', value: stats.categories, icon: Package, href: '/categories', color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Total Marques', value: stats.marques, icon: Tag, href: '/marques', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Espace Administration</h2>
          <p className="text-muted-foreground mt-2">Gérez votre catalogue d'accessoires, les catégories, les marques et les commandes.</p>
        </div>
        {lowStockItems.length > 0 && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 border border-red-200 dark:border-red-800 animate-pulse">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-bold">{lowStockItems.length} articles en rupture de stock !</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href} className="group block relative">
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary cursor-pointer p-6 relative overflow-hidden">
                {stat.alert && (
                  <div className="absolute top-2 left-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </div>
                )}
                <div className={`absolute top-0 right-0 p-4 rounded-bl-3xl ${stat.bg}`}>
                   <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{stat.name}</h3>
                  <div className="text-4xl font-extrabold">{stat.value}</div>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  Gérer <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {lowStockItems.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50/50 dark:bg-red-900/10 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-600"><AlertTriangle className="h-5 w-5" /> Alertes Stock Faible (moins de 5)</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lowStockItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-900 p-4 rounded-lg border shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.imageUrl} alt={item.nom} className="h-10 w-10 object-contain rounded bg-slate-100" />
                  <div>
                    <div className="text-sm font-bold line-clamp-1">{item.nom}</div>
                    <div className="text-xs text-slate-500">Réf: {item.reference}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-black ${item.stock === 0 ? 'text-red-600' : 'text-orange-500'}`}>{item.stock}</div>
                  <Link href={`/accessoires/${item.id}/edit`} className="text-[10px] text-primary hover:underline font-bold">Mettre à jour</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Graphique de revenus */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Évolution des Revenus</h3>
          </div>
          <div className="h-64 w-full">
             {dailyStats.length === 0 ? (
               <div className="w-full h-full flex items-center justify-center text-muted-foreground italic">Aucune donnée disponible</div>
             ) : (
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={dailyStats.slice(-10)}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                   <XAxis 
                     dataKey="date" 
                     tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                     tick={{ fontSize: 11 }}
                     axisLine={false}
                     tickLine={false}
                   />
                   <YAxis 
                     tick={{ fontSize: 11 }}
                     axisLine={false}
                     tickLine={false}
                     tickFormatter={(value) => `${value}`}
                   />
                   <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     formatter={(value: any) => [`${Number(value).toFixed(2)} TND`, 'Revenu']}
                     labelFormatter={(label) => new Date(label).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                   />
                   <Bar 
                     dataKey="totalRevenue" 
                     fill="hsl(var(--primary))" 
                     radius={[4, 4, 0, 0]} 
                     barSize={30}
                   />
                 </BarChart>
               </ResponsiveContainer>
             )}
          </div>
        </div>

        {/* Tableau des statistiques quotidiennes */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar className="h-5 w-5 text-orange-500" /> Ventes par jour</h3>
          <div className="relative w-full overflow-auto max-h-48">
            <table className="w-full text-sm text-left">
              <thead className="sticky top-0 bg-card border-b">
                <tr>
                  <th className="py-2 font-medium text-muted-foreground">Date</th>
                  <th className="py-2 text-center font-medium text-muted-foreground">Commandes</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Chiffre d'affaires</th>
                </tr>
              </thead>
              <tbody>
                {dailyStats.length === 0 ? (
                  <tr><td colSpan={3} className="py-4 text-center italic text-muted-foreground">Aucune vente enregistrée.</td></tr>
                ) : (
                  [...dailyStats].reverse().map((stat, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 font-medium">{new Date(stat.date).toLocaleDateString('fr-FR')}</td>
                      <td className="py-3 text-center">{stat.commandeCount}</td>
                      <td className="py-3 text-right font-bold text-primary">{stat.totalRevenue.toFixed(2)} TND</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-red-500" /> Répartition Géographique des Commandes (Tunisie)</h3>
        <div className="relative w-full overflow-hidden rounded-xl border">
          {allOrders.length === 0 ? (
            <div className="h-[400px] w-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-muted-foreground italic">
              Aucune commande à afficher sur la carte.
            </div>
          ) : (
            <OrderMap orders={allOrders} />
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Actions Rapides</h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/accessoires/nouveau" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Ajouter un accessoire
          </Link>
          <Link href="/admin/commandes" className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors">
            Voir les commandes
          </Link>
          <Link href="/marques" className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Gérer les marques
          </Link>
          <Link href="/categories" className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Gérer les catégories
          </Link>
        </div>
      </div>
    </div>
  );
}
