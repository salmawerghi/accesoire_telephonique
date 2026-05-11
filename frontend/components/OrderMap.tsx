"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CommandeResponseDTO } from '@/lib/api/commandeService';
import { useTheme } from 'next-themes';

// Coordonnées approximatives des principales villes de Tunisie
const cityCoords: { [key: string]: [number, number] } = {
  'Tunis': [36.8065, 10.1815],
  'Ariana': [36.8625, 10.1956],
  'Ben Arous': [36.7531, 10.2222],
  'Manouba': [36.8078, 10.0864],
  'Nabeul': [36.4561, 10.7335],
  'Hammamet': [36.4, 10.6167],
  'Bizerte': [37.2744, 9.8739],
  'Zaghouan': [36.4029, 10.1429],
  'Beja': [36.7256, 9.1817],
  'Jendouba': [36.5011, 8.7802],
  'Le Kef': [36.1742, 8.7049],
  'Siliana': [36.084, 9.3708],
  'Sousse': [35.8256, 10.6369],
  'Monastir': [35.7833, 10.8333],
  'Mahdia': [35.5047, 11.0622],
  'Kairouan': [35.6781, 10.0963],
  'Kassérine': [35.1676, 8.8365],
  'Sidi Bouzid': [35.0382, 9.4849],
  'Sfax': [34.7406, 10.7603],
  'Gafsa': [34.425, 8.7842],
  'Tozeur': [33.9197, 8.1335],
  'Kebili': [33.705, 8.965],
  'Gabès': [33.8815, 10.0982],
  'Médenine': [33.3547, 10.4925],
  'Tataouine': [32.9297, 10.4517],
  'Djerba': [33.8075, 10.8451],
};

interface OrderMapProps {
  orders: CommandeResponseDTO[];
}

export default function OrderMap({ orders }: OrderMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[450px] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl flex items-center justify-center font-medium text-slate-400">Initialisation de la carte...</div>;

  // Style de la carte en fonction du thème
  const mapUrl = theme === 'dark' 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div className="h-[450px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl z-0 relative group">
      <MapContainer 
        center={[34.5, 9.5]} 
        zoom={6} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', background: theme === 'dark' ? '#111827' : '#f8fafc' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url={mapUrl}
        />
        {orders.map((order) => {
          const city = order.ville;
          let position: [number, number] = [36.8065, 10.1815]; 
          
          const foundCity = Object.keys(cityCoords).find(c => 
            c.toLowerCase() === city?.toLowerCase() || 
            city?.toLowerCase().includes(c.toLowerCase())
          );

          if (foundCity) {
            position = cityCoords[foundCity];
          } else {
            // Un peu de variation aléatoire pour ne pas superposer tous les points inconnus sur Tunis
            position = [36.8065 + (Math.random() - 0.5) * 0.1, 10.1815 + (Math.random() - 0.5) * 0.1];
          }

          return (
            <CircleMarker 
              key={order.id} 
              center={position}
              radius={8}
              pathOptions={{
                fillColor: '#3b82f6',
                fillOpacity: 0.7,
                color: '#fff',
                weight: 2,
              }}
            >
              <Popup closeButton={false} className="custom-popup">
                <div className="p-2 min-w-[150px] font-sans">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Commande #{order.id}</span>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-800 dark:text-white">{order.prenom} {order.nom}</div>
                  <div className="text-xs text-slate-500 mb-2">{order.ville}</div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400">Total</span>
                    <span className="text-sm font-black text-primary">{order.total.toFixed(2)} TND</span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      {/* Overlay décoratif */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
        <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
        Live Order Map
      </div>

      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          padding: 0 !important;
          overflow: hidden !important;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
          border: 1px solid #e2e8f0 !important;
        }
        .dark .leaflet-popup-content-wrapper {
          background-color: #0f172a !important;
          border-color: #1e293b !important;
        }
        .leaflet-popup-tip-container {
          display: none !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
      `}</style>
    </div>
  );
}
