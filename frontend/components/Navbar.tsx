"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Menu, User, Phone, LogOut, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { authService } from '@/lib/api/authService';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';

export function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setIsAdmin(authService.getRole() === 'ADMIN');
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/accessoires?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950 shadow-sm transition-colors duration-300">
      {/* Top bar */}
      <div className="bg-slate-100 dark:bg-slate-900 py-1 hidden sm:block transition-colors">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Bienvenue sur TechStore Tunisie</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3"/> +216 71 123 456</span>
            <Link href="/contact" className="hover:text-primary transition-colors">Contactez-nous</Link>
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4 sm:gap-8">
        <div className="flex items-center gap-2">
          <button className="sm:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="font-bold text-white text-xl leading-none">TS</span>
            </div>
            <span className="hidden sm:inline-block font-bold text-xl tracking-tight text-slate-800 dark:text-white">TechStore</span>
          </Link>
        </div>

        <div className="flex-1 max-w-2xl hidden md:block">
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              placeholder="Rechercher un produit, une marque..."
              className="w-full pl-4 pr-12 py-2.5 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-primary dark:focus:border-primary focus:outline-none transition-all dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-1 top-1 bottom-1 px-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          
          {isAdmin && (
            <Link href="/admin" className="hidden sm:flex flex-col items-center justify-center p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <User className="h-5 w-5" />
              <span className="text-[10px] font-medium mt-1">Admin</span>
            </Link>
          )}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="hidden sm:flex flex-col items-center justify-center p-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="text-[10px] font-medium mt-1">Déconnexion</span>
            </button>
          ) : (
            <Link href="/login" className="hidden sm:flex flex-col items-center justify-center p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <User className="h-5 w-5" />
              <span className="text-[10px] font-medium mt-1">Connexion</span>
            </Link>
          )}
          
          <Link href="/wishlist" className="relative flex flex-col items-center justify-center p-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors group">
            <div className="relative">
              <Heart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium mt-1 hidden sm:block">Favoris</span>
          </Link>
          
          <Link href="/panier" className="relative flex flex-col items-center justify-center p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                {cartCount}
              </span>
            </div>
            <span className="text-[10px] font-medium mt-1 hidden sm:block">Panier</span>
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-t dark:border-slate-800 hidden md:block transition-colors">
        <div className="container max-w-7xl mx-auto px-4 h-12 flex items-center">
          <nav className="flex items-center gap-8 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Link href="/" className={cn("hover:text-primary transition-colors", pathname === '/' && "text-primary border-b-2 border-primary py-3.5")}>Accueil</Link>
            <Link href="/accessoires" className={cn("hover:text-primary transition-colors", pathname?.startsWith('/accessoires') && "text-primary border-b-2 border-primary py-3.5")}>Tous les Accessoires</Link>
            <Link href="/accessoires?enPromotion=true" className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1">
               Promotions 🔥
            </Link>
            <Link href="/marques" className="hover:text-primary transition-colors">Nos Marques</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
