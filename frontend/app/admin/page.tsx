"use client";
import { useEffect, useState } from 'react';
import { accessoireService } from '@/lib/api/accessoireService';
import { categorieService } from '@/lib/api/categorieService';
import { marqueService } from '@/lib/api/marqueService';
import { Boxes, Package, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ accessoires: 0, categories: 0, marques: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [accRes, catRes, marRes] = await Promise.all([
          accessoireService.getAll(0, 1),
          categorieService.getAll(),
          marqueService.getAll()
        ]);
        setStats({
          accessoires: accRes.data?.totalElements || 0,
          categories: Array.isArray(catRes.data) ? catRes.data.length : 0,
          marques: Array.isArray(marRes.data) ? marRes.data.length : 0
        });
      } catch (error) {
        console.error("Erreur chargement stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Accessoires', value: stats.accessoires, icon: Boxes, href: '/accessoires', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Total Catégories', value: stats.categories, icon: Package, href: '/categories', color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Total Marques', value: stats.marques, icon: Tag, href: '/marques', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Espace Administration</h2>
        <p className="text-muted-foreground mt-2">Gérez votre catalogue d'accessoires, les catégories et les marques.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href} className="group block">
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary cursor-pointer p-6 relative overflow-hidden">
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

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Actions Rapides</h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/accessoires/nouveau" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Ajouter un accessoire
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
