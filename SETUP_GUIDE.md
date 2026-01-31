# Munkanapló Web App - Beállítási Útmutató

## 🔐 Google OAuth Beállítás

### 1. Google Cloud Console
1. Látogass el: https://console.cloud.google.com
2. Hozz létre új projektet: "Munkanaplo Web App"
3. Navigálj: **APIs & Services** → **Credentials**

### 2. OAuth Consent Screen konfigurálása
1. Kattints: **Configure Consent Screen**
2. Válaszd: **External** user type
3. Töltsd ki:
   - App name: `Munkanapló Web App`
   - User support email: `sajat@email.hu`
   - Developer contact: `sajat@email.hu`
4. Mentsd el

### 3. OAuth Client ID létrehozása
1. **Create Credentials** → **OAuth 2.0 Client ID**
2. Alkalmazás típusa: **Web application**
3. Név: `Munkanapló Web Client`
4. **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   https://rekaklima.com
   ```
5. **Authorized redirect URIs**:
   ```
   http://localhost:5173/munkanaplo-web-app
   https://rekaklima.com/munkanaplo-web-app
   ```
6. **Create** → Másold ki a **Client ID**-t

### 4. Client ID beillesztése a kódba
Nyisd meg: `public/assets/shop/munkanaplo_web_app/App.tsx`

Cseréld le:
```typescript
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
```

Erre (használd a saját Client ID-dat):
```typescript
const GOOGLE_CLIENT_ID = "123456789-abc123xyz.apps.googleusercontent.com";
```

### 5. OAuth funkció visszaállítása
Az `App.tsx`-ben kommenteld vissza a Google OAuth kódot, vagy használd ezt a javított verziót:

```typescript
const handleGoogleLogin = () => {
    setLoading(true);
    setError('');
    try {
      if (typeof google === 'undefined') {
        setError('Google Identity Services még betöltődik...');
        setLoading(false);
        return;
      }
      
      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: async (response: any) => {
          if (response.error) {
            setError(`Hiba: ${response.error_description || response.error}`);
            setLoading(false);
            return;
          }
          
          try {
            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${response.access_token}` }
            }).then(res => res.json());

            const user: User = {
              id: userInfo.sub,
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              googleToken: response.access_token,
              googleTokenExpiry: Date.now() + (response.expires_in * 1000),
              createdAt: Date.now()
            };

            const existingUser = await db.getUserById(user.id);
            if (!existingUser) await db.registerUser(user);
            onLogin(user);
          } catch (err) {
            setError('Hiba a felhasználói adatok lekérésekor.');
            setLoading(false);
          }
        },
      });
      client.requestAccessToken();
    } catch (err) {
      setError('Hiba a Google hitelesítés során.');
      setLoading(false);
    }
  };
```

### 6. Build és deploy
```bash
cd public/assets/shop/munkanaplo_web_app
npm run build
cd ../../../..
npm run copy:munkanaplo
```

---

## 📧 Email Szolgáltatás (Opcionális)

### Jelenlegi állapot
❌ **Nincs email küldés implementálva**
- A regisztráció csak lokális (IndexedDB)
- Nincs email megerősítés
- Nincs jelszó visszaállítás

### Opciók

#### Opció 1: Marad email nélkül ✅ EGYSZERŰ
- **Előny**: Nincs backend, gyors, egyszerű
- **Hátrány**: Nincs email értesítés, jelszó visszaállítás

#### Opció 2: Resend.com + Cloudflare Worker 🔧 FEJLETT

**Szükséges lépések:**

1. **Resend.com regisztráció**
   - Látogass el: https://resend.com
   - Hozz létre fiókot
   - **API Keys** → Create API Key → Másold ki

2. **Domain hitelesítés**
   - Add hozzá: `rekaklima.com`
   - Állítsd be a DNS rekordokat (SPF, DKIM)
   - Várj ~10 percet a propagálásra

3. **Cloudflare Worker létrehozása**
   
   Hozz létre: `workers/munkanaplo-api/index.ts`
   
   ```typescript
   export default {
     async fetch(request: Request, env: Env): Promise<Response> {
       if (request.method !== 'POST') {
         return new Response('Method not allowed', { status: 405 });
       }

       const url = new URL(request.url);
       
       // CORS headers
       const corsHeaders = {
         'Access-Control-Allow-Origin': 'https://rekaklima.com',
         'Access-Control-Allow-Methods': 'POST, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type',
       };

       if (request.method === 'OPTIONS') {
         return new Response(null, { headers: corsHeaders });
       }

       // Register endpoint
       if (url.pathname === '/api/register') {
         const { email, name } = await request.json();
         
         const response = await fetch('https://api.resend.com/emails', {
           method: 'POST',
           headers: {
             'Authorization': `Bearer ${env.RESEND_API_KEY}`,
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             from: 'Munkanapló <noreply@rekaklima.com>',
             to: email,
             subject: 'Sikeres regisztráció - Munkanapló Web App',
             html: `
               <h2>Üdvözlünk, ${name}!</h2>
               <p>Sikeresen regisztráltál a Munkanapló Web App-ba.</p>
               <p>Most már használhatod az alkalmazást: https://rekaklima.com/munkanaplo-web-app</p>
             `
           })
         });

         if (response.ok) {
           return new Response(JSON.stringify({ success: true }), {
             headers: { ...corsHeaders, 'Content-Type': 'application/json' }
           });
         }
       }

       return new Response('Not found', { status: 404 });
     }
   };
   ```

4. **Worker deploy**
   ```bash
   npx wrangler deploy workers/munkanaplo-api/index.ts
   ```

5. **Environment variable beállítása**
   ```bash
   npx wrangler secret put RESEND_API_KEY
   # Illeszd be a Resend API kulcsot
   ```

6. **Frontend frissítése**
   Az `App.tsx`-ben a regisztrációnál:
   ```typescript
   await db.registerUser(newUser);
   
   // Email küldés
   await fetch('https://munkanaplo-api.tudomainnev.workers.dev/api/register', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, name })
   });
   
   onLogin(newUser);
   ```

---

## 🚀 Ajánlott Megközelítés

### Fázis 1: MVP (Minimum Viable Product)
✅ **Maradjon Google OAuth + lokális tárolás**
- Email küldés NEM kell
- Google OAuth + Email/jelszó regisztráció
- IndexedDB lokális adattárolás
- Gyors piaci megjelenés

### Fázis 2: Email integráció (később)
- Amikor van elég felhasználó
- Resend.com + Cloudflare Worker
- Email értesítések
- Jelszó visszaállítás

---

## ✅ Következő lépések

1. **Most rögtön**:
   - Google OAuth Client ID beszerzése
   - Client ID beillesztése az App.tsx-be
   - OAuth funkció visszaállítása
   - Build & deploy

2. **Később (opcionális)**:
   - Resend.com regisztráció
   - Cloudflare Worker létrehozása
   - Email funkciók implementálása

---

## 💡 Tippek

- **Fejlesztés**: `http://localhost:5173` OAuth-ban engedélyezve kell legyen
- **Production**: `https://rekaklima.com` OAuth-ban engedélyezve kell legyen
- **Tesztelés**: Google OAuth Consent Screen "Testing" módban max 100 felhasználó
- **Éles**: "Published" státuszra kell állítani a Consent Screen-t

---

## 🆘 Ha segítség kell

Kérdések esetén jelezz, és segítek:
- Google OAuth hibák debuggolása
- Cloudflare Worker létrehozása
- Email template-ek készítése
- DNS rekordok beállítása
