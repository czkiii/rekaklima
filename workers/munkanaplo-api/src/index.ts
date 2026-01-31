// Cloudflare Worker for Munkanaplo Web App - Email API

interface Env {
  RESEND_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS headers - engedélyezzük a rekaklima.com és localhost-ot
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Production-ben állítsd be: 'https://rekaklima.com'
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Preflight request kezelése
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204,
        headers: corsHeaders 
      });
    }

    // Csak POST metódus engedélyezett
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }), 
        { 
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    try {
      // /api/register - Regisztrációs email küldése
      if (url.pathname === '/api/register') {
        const body = await request.json() as { email: string; name: string };
        const { email, name } = body;
        
        // Validáció
        if (!email || !name) {
          return new Response(
            JSON.stringify({ error: 'Email és név kötelező!' }), 
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        // Email küldés Resend API-n keresztül
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Munkanapló <noreply@rekaklima.com>',
            to: email,
            subject: '🎉 Sikeres regisztráció - Munkanapló Web App',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
                  .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                  .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 20px; text-align: center; }
                  .header h1 { color: white; margin: 0; font-size: 28px; }
                  .content { padding: 40px 30px; }
                  .content p { color: #475569; line-height: 1.6; margin: 0 0 16px; }
                  .button { display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                  .features { background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; }
                  .features li { color: #475569; margin: 8px 0; }
                  .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>🎉 Üdvözlünk!</h1>
                  </div>
                  <div class="content">
                    <p><strong>Kedves ${name}!</strong></p>
                    <p>Sikeresen regisztráltál a <strong>Munkanapló Web App</strong>-ba!</p>
                    
                    <p>Az alkalmazás segítségével professzionális munkaidő nyilvántartást vezethetsz, projekteket kezelhetsz és részletes elemzéseket készíthetsz.</p>
                    
                    <div style="text-align: center;">
                      <a href="https://rekaklima.com/munkanaplo-web-app" class="button">
                        Indulhat a munka! →
                      </a>
                    </div>
                    
                    <div class="features">
                      <p><strong>Mit tudsz csinálni az alkalmazással:</strong></p>
                      <ul>
                        <li>⏱️ Időkövetés stopperórával</li>
                        <li>💼 Projektek és munkák kezelése</li>
                        <li>📊 Heti és havi összesítések</li>
                        <li>📑 Excel exportálás</li>
                        <li>📅 Google Calendar integráció</li>
                        <li>☁️ Automatikus adatszinkronizálás</li>
                      </ul>
                    </div>
                    
                    <p>Ha bármilyen kérdésed van, ne habozz kapcsolatba lépni velünk!</p>
                    <p>Üdvözlettel,<br><strong>Réka Klíma</strong></p>
                  </div>
                  <div class="footer">
                    <p>© 2026 Munkanapló Web App | rekaklima.com</p>
                    <p>Ez egy automatikus email, kérlek ne válaszolj rá.</p>
                  </div>
                </div>
              </body>
              </html>
            `
          })
        });

        if (!emailResponse.ok) {
          const error = await emailResponse.text();
          console.error('Resend API error:', error);
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Email küldés sikertelen' 
            }), 
            { 
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        const emailData = await emailResponse.json() as { id: string };
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Email sikeresen elküldve',
            emailId: emailData.id 
          }), 
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      // /api/password-reset - Jelszó visszaállítás (jövőbeli funkció)
      if (url.pathname === '/api/password-reset') {
        return new Response(
          JSON.stringify({ message: 'Password reset - coming soon!' }), 
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      // 404 - Endpoint nem található
      return new Response(
        JSON.stringify({ error: 'Endpoint not found' }), 
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } catch (error: any) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Internal server error',
          message: error.message 
        }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
  }
};
