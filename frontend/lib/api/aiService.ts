import { Accessoire } from './accessoireService';

/**
 * Service pour interagir avec l'IA (Gemini)
 */
export const aiService = {
  /**
   * Génère une réponse d'assistant d'achat basée sur le catalogue
   */
  getChatResponse: async (message: string, history: {role: 'user' | 'model', parts: {text: string}[]}[], products: Accessoire[]) => {
    const API_KEY = "AIzaSyB-HpxSKm3xtuqYR38W4jXT4FC5wAdaf4Q"; 
    
    if (!API_KEY) {
      return "Bonjour ! Je suis l'assistant Expert Tech. Pour m'activer réellement, veuillez configurer votre clé API Gemini. En attendant, je peux vous dire que nous avons de superbes accessoires pour tous les modèles de smartphones !";
    }

    // Préparer une version simplifiée du catalogue pour l'IA
    const catalogContext = products.map(p => 
      `- ${p.nom} (${p.marqueNom}): ${p.prix} TND. ${p.description?.substring(0, 100)}... Stock: ${p.stock}`
    ).join('\n');

    const systemInstruction = `Tu es "Expert Tech", un conseiller de vente expert en accessoires téléphoniques pour la boutique TechStore en Tunisie. 
    Ton but est d'aider les clients à trouver le meilleur produit. 
    Sois amical, professionnel et utilise un ton chaleureux. 
    Voici notre catalogue actuel :
    ${catalogContext}
    
    Règles :
    1. Ne recommande que des produits présents dans la liste ci-dessus.
    2. Si un produit est en rupture de stock (Stock: 0), mentionne-le ou propose une alternative.
    3. Réponds toujours en français.
    4. Garde tes réponses concises et pertinentes.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents: [
            ...history,
            { role: 'user', parts: [{ text: message }] }
          ]
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Erreur Chat IA:", error);
      return "Désolé, je rencontre une petite difficulté technique. Pouvez-vous reformuler votre question ?";
    }
  },

  /**
   * Génère une description professionnelle pour un accessoire
   */
  generateDescription: async (nom: string, marqueNom: string, categorieNom: string) => {
    // NOTE: Pour utiliser l'IA, vous devrez ajouter votre clé API Gemini ici
    // Vous pouvez en obtenir une gratuitement sur https://aistudio.google.com/
    const API_KEY = "AIzaSyB-HpxSKm3xtuqYR38W4jXT4FC5wAdaf4Q"; 
    
    if (!API_KEY) {
      // Simulation pour la démo si la clé n'est pas configurée
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Découvrez le ${nom} de la marque ${marqueNom}. Un accessoire de haute qualité dans la catégorie ${categorieNom}, conçu pour offrir performance et durabilité. Idéal pour protéger et sublimer votre smartphone avec un design moderne et ergonomique. Disponible dès maintenant sur TechStore Tunisie.`);
        }, 1500);
      });
    }

    const prompt = `Agis comme un expert en marketing d'accessoires téléphoniques en Tunisie. 
    Génère une description de produit attrayante, professionnelle et optimisée pour le SEO pour l'article suivant :
    - Nom : ${nom}
    - Marque : ${marqueNom}
    - Catégorie : ${categorieNom}
    
    La description doit être en français, faire environ 3 à 4 phrases, et mettre en avant la qualité et l'utilité du produit. Ne pas utiliser de hashtags.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Erreur IA:", error);
      throw new Error("Impossible de générer la description pour le moment.");
    }
  }
};
