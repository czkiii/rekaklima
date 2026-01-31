# 🚀 Munkanapló Web App - Gyors Telepítési Útmutató

## ✅ Mit csináltunk eddig:

1. ✅ Munkanapló Web App integrálva a Shop szekcióba
2. ✅ Build folyamat beállítva
3. ✅ Cloudflare Worker létrehozva email küldéshez
4. ✅ App.tsx frissítve email integrációval

---

## 📋 KÖVETKEZŐ LÉPÉSEK (Rád vár!)

### 1️⃣ Google OAuth Beállítás (10 perc) - INGYENES! ✨

**Miért kell?** Hogy a felhasználók Google fiókkal is bejelentkezhessenek.

#### Lépések:
1. **Menj a Google Cloud Console-ra:** https://console.cloud.google.com
2. **Projekt létrehozása:**
   - Kattints: "Select a project" → "New Project"
   - Név: `Munkanapló Web App`
   - Create

3. **OAuth Consent Screen:**
   - Bal menü: **APIs & Services** → **OAuth consent screen**
   - User Type: **External**
   - App name: `Munkanapló Web App`
   - User support email: `sajat@email.hu`
   - Developer contact: `sajat@email.hu`
   - Save and Continue (a többi opcionális)

4. **OAuth Client ID létrehozása:**
   - Bal menü: **APIs & Services** → **Credentials**
   - **+ CREATE CREDENTIALS** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: `Munkanapló Web Client`
   - **Authorized JavaScript origins:**
     ```
     http://localhost:5173
     https://rekaklima.com
     ```
   - **Authorized redirect URIs:**
     ```
     http://localhost:5173/munkanaplo-web-app
     https://rekaklima.com/munkanaplo-web-app
     ```
   - **CREATE**

5. **Másold ki a Client ID-t!** Pl: `123456789-abc123xyz.apps.googleusercontent.com`

6. **Illeszd be az App.tsx-be:**
   - Nyisd meg: `public/assets/shop/munkanaplo_web_app/App.tsx`
   - 18. sor: Cseréld le `YOUR_GOOGLE_CLIENT_ID` -t a te Client ID-dra
   ```typescript
   const GOOGLE_CLIENT_ID = "123456789-abc123xyz.apps.googleusercontent.com";
   ```

7. **Aktiváld az OAuth funkciót:**
   - Ugyanott az App.tsx-ben, 33-72. sorok között
   - Vedd ki a komment jeleket (távolítsd el a `/*` és `*/` jeleket)
   - VAGY cseréld le az egész `handleGoogleLogin` függvényt a SETUP_GUIDE.md-ben található verzióval

---

### 2️⃣ Resend.com Regisztráció (5 perc) - INGYENES! 📧

**Miért kell?** Hogy a regisztrált felhasználók kapjanak welcome emailt.

#### Lépések:
1. **Regisztráció:** https://resend.com
2. **API Key létrehozása:**
   - Dashboard → **API Keys** → **Create API Key**
   - Name: `Munkanapló Production`
   - Permission: **Full access**
   - **Create** → **Másold ki!** (pl: `re_123abc...`)

3. **Domain hozzáadása:**
   - Dashboard → **Domains** → **Add Domain**
   - Domain: `rekaklima.com`
   - **Add Domain**

4. **DNS Rekordok beállítása:**
   - Resend megmutatja a szükséges DNS rekordokat
   - Menj a domain szolgáltatódhoz (pl. Cloudflare DNS)
   - Add hozzá a DNS rekordokat:
     - **SPF** (TXT rekord)
     - **DKIM** (TXT rekord)  
     - **DMARC** (TXT rekord, opcionális)
   - Várj 5-10 percet a propagálásra
   - Resend-ben kattints: **Verify DNS Records**

---

### 3️⃣ Cloudflare Worker Deploy (5 perc)

**A worker már kész van!** Csak deploy kell.

#### Lépések:

1. **Resend API Key beállítása (SECRET):**
   ```powershell
   cd c:\Users\bobaa\Documents\GitHub\rekaklima\workers\munkanaplo-api
   npx wrangler secret put RESEND_API_KEY
   ```
   - Írd/illeszd be a Resend API key-t
   - Enter

2. **Worker deploy:**
   ```powershell
   npm run deploy
   ```

3. **Worker URL másolása:**
   - A deploy után kapod: `https://munkanaplo-api.YOURNAME.workers.dev`
   - Másold ki ezt az URL-t!

4. **URL frissítése az App.tsx-ben:**
   - Nyisd meg: `public/assets/shop/munkanaplo_web_app/App.tsx`
   - 88. sor körül:
   ```typescript
   const emailApiUrl = 'https://munkanaplo-api.YOURNAME.workers.dev/api/register';
   ```
   - Cseréld le `YOURNAME` -et a saját worker URL-edre

---

### 4️⃣ Munkanapló App Rebuild & Deploy (2 perc)

Most, hogy minden be van állítva, buildeljük újra:

```powershell
cd c:\Users\bobaa\Documents\GitHub\rekaklima
npm run build:munkanaplo
npm run copy:munkanaplo
```

**VAGY** ha production build kell (Cloudflare):
```powershell
npm run build
```
Ez automatikusan buildeli a munkanaplo app-ot is!

---

## 🎯 Mit fog csinálni az app deploy után?

### ✅ Felhasználói élmény:
1. Felhasználó megnyitja: `https://rekaklima.com/munkanaplo-web-app`
2. Regisztrál:
   - **Email/jelszóval** VAGY
   - **Google fiókkal** (ha beállítottad az OAuth-ot)
3. **Automatikusan kap egy welcome emailt** (ha a Resend működik)
4. Belép az app-ba és használhatja

### ✅ Amit csinál az email:
- Szép HTML formázott üdvözlő email
- Tartalmazza az app funkcióit
- Link vissza az app-ra
- Professzionális megjelenés

---

## 🔍 Tesztelés

### Lokális tesztelés (fejlesztés közben):
```powershell
# Terminal 1 - Fő oldal
npm run dev

# Terminal 2 - Worker (opcionális)
cd workers\munkanaplo-api
npm run dev
```

Látogasd meg: http://localhost:5173/munkanaplo-web-app/index.html

### Production tesztelés:
1. Deploy mindent Cloudflare-re
2. Látogasd meg: https://rekaklima.com/munkanaplo-web-app
3. Regisztrálj egy teszt email címmel
4. Ellenőrizd:
   - ✅ Be tudsz-e lépni
   - ✅ Működik-e a Google OAuth
   - ✅ Megérkezik-e az email

---

## 🎨 Személyre szabás (opcionális)

### Email template módosítása:
- Fájl: `workers/munkanaplo-api/src/index.ts`
- 62-125. sorok között a HTML template
- Módosítsd a design-t, szövegeket

### Egyéb email-ek hozzáadása:
- Jelszó visszaállítás
- Havi összefoglaló
- Projekt értesítések
- Stb.

---

## 💰 Költségek

### Google OAuth:
- ✅ **100% INGYENES**
- Korlátlan felhasználó

### Cloudflare Worker:
- ✅ **100,000 request/nap INGYENES**
- Több mint elég kis-közepes app-nak

### Resend.com:
- ✅ **3,000 email/hónap INGYENES**
- 1 verified domain
- Bővebben: https://resend.com/pricing

**Összes költség egy kis app esetén: 0 Ft/hó** 🎉

---

## 🆘 Segítség & Hibakeresés

### Google OAuth nem működik?
- Ellenőrizd a Client ID-t
- Ellenőrizd az Authorized origins/redirect URIs beállítást
- Nézd meg a browser console-t (F12)

### Email nem érkezik meg?
- Ellenőrizd a Resend Dashboard → Logs menüt
- Nézd meg a spam mappát
- Ellenőrizd a DNS rekordokat (SPF, DKIM)
- Worker logs: Cloudflare Dashboard → Workers → munkanaplo-api → Logs

### Worker nem működik?
- Ellenőrizd a deployment-et: `npx wrangler tail`
- Nézd meg a logs-ot a Cloudflare Dashboard-on
- Ellenőrizd a RESEND_API_KEY secret-et

### Build hiba?
```powershell
cd public/assets/shop/munkanaplo_web_app
rm -rf node_modules dist
npm install
npm run build
```

---

## ✅ Checklist

Pipáld ki ahogy haladsz:

- [ ] Google Cloud Console projekt létrehozva
- [ ] OAuth Client ID beszerzése
- [ ] Client ID beillesztve App.tsx-be
- [ ] OAuth funkció aktiválva
- [ ] Resend.com regisztráció
- [ ] Resend API Key beszerzése
- [ ] Domain hozzáadva Resend-ben
- [ ] DNS rekordok beállítva
- [ ] Cloudflare Worker deploy
- [ ] RESEND_API_KEY secret beállítva
- [ ] Worker URL frissítve App.tsx-ben
- [ ] Munkanapló app rebuild
- [ ] Lokális teszt
- [ ] Production deploy
- [ ] Production teszt

---

## 🎉 Ha minden kész:

**Gratulálok!** 🎊 Van egy teljesen működő, professzionális munkaidő nyilvántartó alkalmazásod:
- ✅ Google OAuth bejelentkezés
- ✅ Email/jelszó regisztráció
- ✅ Automatikus welcome email
- ✅ Időkövetés, projektek, exportálás
- ✅ Teljesen INGYENES hosting (kis-közepes használat esetén)

---

**Készítette:** GitHub Copilot
**Dátum:** 2026.01.31
**Verzió:** 1.0
