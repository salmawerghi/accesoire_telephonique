"use client";
import { useState } from 'react';
import { authService } from '@/lib/api/authService';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await authService.login({ email: formData.email, password: formData.password });
      } else {
        await authService.register(formData);
      }
      
      const role = authService.getRole();
      if (role === 'ADMIN') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'authentification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="bg-primary p-6 text-center text-white">
          <h2 className="text-3xl font-bold">{isLogin ? 'Connexion' : 'Inscription'}</h2>
          <p className="opacity-80 mt-2">{isLogin ? 'Accédez à votre compte TechStore' : 'Créez votre compte pour commander'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Prénom</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input type="text" name="prenom" required={!isLogin} className="w-full pl-9 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary outline-none bg-slate-50 dark:bg-slate-800" onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Nom</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input type="text" name="nom" required={!isLogin} className="w-full pl-9 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary outline-none bg-slate-50 dark:bg-slate-800" onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input type="email" name="email" required className="w-full pl-9 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary outline-none bg-slate-50 dark:bg-slate-800" placeholder="vous@exemple.com" onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input type="password" name="password" required className="w-full pl-9 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary outline-none bg-slate-50 dark:bg-slate-800" placeholder="••••••••" onChange={handleChange} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 mt-4">
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer mon compte')}
          </button>

          <div className="text-center mt-6 text-sm text-slate-500">
            {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
            <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-primary font-semibold ml-1 hover:underline">
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
