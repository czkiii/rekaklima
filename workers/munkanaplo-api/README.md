# Munkanapló Web App - Email API Worker

Cloudflare Worker az email küldéshez (Resend.com API).

## 🚀 Telepítés

```bash
cd workers/munkanaplo-api
npm install
```

## ⚙️ Beállítás

### 1. Resend API Key beszerzése
1. Regisztrálj a [resend.com](https://resend.com)-on
2. Hozz létre API Key-t
3. Add hozzá a `rekaklima.com` domaint
4. Állítsd be a DNS rekordokat (SPF, DKIM, DMARC)

### 2. API Key beállítása Cloudflare-ben

**Lokális fejlesztés (.dev.vars fájl):**
```bash
echo "RESEND_API_KEY=re_123abc..." > .dev.vars
```

**Production (Cloudflare Dashboard vagy CLI):**
```bash
npx wrangler secret put RESEND_API_KEY
# Illeszd be a Resend API kulcsot
```

VAGY a Cloudflare Dashboard-on:
1. Workers & Pages → munkanaplo-api
2. Settings → Variables
3. Add Variable → RESEND_API_KEY (encrypted)

## 🧪 Helyi tesztelés

```bash
npm run dev
# A worker elindul: http://localhost:8787
```

Test request:
```bash
curl -X POST http://localhost:8787/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teszt@email.com","name":"Teszt Béla"}'
```

## 📦 Deploy

```bash
npm run deploy
```

A Worker URL-je: `https://munkanaplo-api.YOURNAME.workers.dev`

## 🔗 Frontend integráció

Az `App.tsx`-ben a regisztráció után:

```typescript
// Email küldés
try {
  await fetch('https://munkanaplo-api.YOURNAME.workers.dev/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name })
  });
} catch (err) {
  console.error('Email küldés sikertelen:', err);
  // Ne akadályozzuk meg a regisztrációt, ha az email nem megy
}
```

## 📋 API Endpoints

### POST /api/register
Regisztrációs email küldése.

**Request:**
```json
{
  "email": "user@example.com",
  "name": "Felhasználó Név"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Email sikeresen elküldve",
  "emailId": "abc-123-xyz"
}
```

**Response (400):**
```json
{
  "error": "Email és név kötelező!"
}
```

### POST /api/password-reset
Jelszó visszaállítás (jövőbeli funkció).

## 🔒 Biztonság

- CORS beállítások: production-ben csak `rekaklima.com`
- API Key környezeti változóban (titkosítva)
- Request validáció
- Rate limiting (Cloudflare automatikus védelme)

## 💡 Költségek

**Cloudflare Worker Free Tier:**
- ✅ 100,000 request/nap ingyenesen
- ✅ Bőven elég egy kis-közepes app-nak

**Resend.com Free Tier:**
- ✅ 3,000 email/hónap ingyenesen
- ✅ 1 verified domain

## 📊 Monitoring

Cloudflare Dashboard → Workers & Pages → munkanaplo-api → Metrics

- Request volume
- Error rate
- CPU time
- Response time
