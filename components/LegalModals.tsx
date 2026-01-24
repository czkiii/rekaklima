
import React from 'react';

interface LegalModalProps {
  type: 'impresszum' | 'adatvedelem' | 'aszf' | null;
  onClose: () => void;
}

const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    impresszum: {
      title: "Impresszum",
      body: (
        <div className="space-y-4 text-sm leading-relaxed">
          <p><strong>A weboldalt üzemelteti:</strong></p>
          <p>Név: Opoczki-Klima Ádám<br />Egyéni vállalkozó<br />Székhely: [IDE JÖN A SZÉKHELY / LAKCÍM]<br />Adószám: [ADÓSZÁM]<br />Nyilvántartási szám: [EV NYILV. SZÁM]<br />E-mail: info@rekaklima.com</p>
          <p>A weboldalon bemutatott kreatív szolgáltatásokat és vizuális tartalmakat Opoczki-Klima Réka (kreatív menedzser, grafikus) készíti és koordinálja.</p>
          <p><strong>Tárhelyszolgáltató:</strong><br />Cloudflare, Inc.<br />101 Townsend St, San Francisco, CA 94107, USA</p>
        </div>
      )
    },
    adatvedelem: {
      title: "Adatkezelési Tájékoztató",
      body: (
        <div className="space-y-4 text-sm leading-relaxed">
          <p><strong>Az adatkezelő:</strong><br />Opoczki-Klima Ádám egyéni vállalkozó<br />E-mail: info@rekaklima.com</p>
          <p>A weboldalon keresztül megadott személyes adatokat (név, e-mail cím) kizárólag kapcsolatfelvétel és ajánlatadás céljából kezeljük.</p>
          <p><strong>Az adatkezelés jogalapja:</strong> az érintett önkéntes hozzájárulása.</p>
          <p>Az adatokat harmadik félnek nem adjuk át, kivéve jogszabályi kötelezettség esetén.</p>
          <p><strong>Az érintett jogosult:</strong> tájékoztatást kérni, adatainak módosítását vagy törlését kérni az info@rekaklima.com címen.</p>
        </div>
      )
    },
    aszf: {
      title: "Általános Szerződési Feltételek",
      body: (
        <div className="space-y-4 text-sm leading-relaxed">
          <p><strong>A szolgáltató:</strong> Opoczki-Klima Ádám egyéni vállalkozó</p>
          <p>A weboldalon megvásárolható digitális termékek nem minősülnek fizikai terméknek, letöltésük elektronikus úton történik. A vásárlás a Stripe fizetési rendszerén keresztül zajlik.</p>
          <p><strong>Elállási jog:</strong> Digitális termék esetén, a teljesítést követően a vásárló a 45/2014. (II.26.) Korm. rendelet alapján nem jogosult elállási jog gyakorlására.</p>
          <p><strong>Szerzői jogok:</strong> A megvásárolt digitális tartalom szerzői jogvédelem alatt áll, harmadik fél részére nem továbbítható.</p>
        </div>
      )
    }
  };

  const active = content[type];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#4A403A]/40 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[40px] shadow-2xl relative z-10 p-10 md:p-16 animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 text-[#4A403A] hover:text-[#C87941]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="serif text-3xl text-[#4A403A] mb-8 border-b border-[#F5E1D2] pb-4">{active.title}</h2>
        <div className="text-[#5A5A5A]">
          {active.body}
        </div>
        <div className="mt-12 text-center">
            <button onClick={onClose} className="bg-[#4A403A] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Értem</button>
        </div>
      </div>
    </div>
  );
};

export default LegalModals;
