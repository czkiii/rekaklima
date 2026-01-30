import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDraggable } from './useDraggable';

interface ChatMessage {
  type: 'user' | 'szofi';
  text?: string;
  title?: string;
  followUp?: string[];
}

const SzofiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showSendForm, setShowSendForm] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { position, isDragging, hasMoved, isMobile, handleDragStart, resetToDefault } = useDraggable();

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // Ensure component is mounted (for Portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Random shake effect
  useEffect(() => {
    const randomShake = () => {
      const random = Math.random();
      if (random < 0.15) {
        triggerShake();
      }
    };

    const interval = setInterval(randomShake, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  // Reset position when chat opens (only mobile)
  useEffect(() => {
    if (isOpen && isMobile && typeof window !== 'undefined') {
      resetToDefault();
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const handleSend = async () => {
    const text = message.trim();
    if (!text) return;

    setChatLog(prev => [...prev, { type: 'user', text }]);
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('https://szofi-fox.czki-adam.workers.dev/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: text })
      });

      const data = await res.json();

      setChatLog(prev => [...prev, {
        type: 'szofi',
        title: data.title,
        text: data.reply,
        followUp: data.followUp
      }]);
    } catch (error) {
      setChatLog(prev => [...prev, {
        type: 'szofi',
        text: 'Valami hiba történt. Próbáld újra!'
      }]);
    }
    setLoading(false);
  };

  const handleSendToReka = async () => {
    if (!senderName.trim() || !senderEmail.trim()) {
      alert('Kérjük add meg a neved és az email címed!');
      return;
    }

    setSendingEmail(true);

    try {
      const response = await fetch('https://szofi-fox.czki-adam.workers.dev/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: senderName.trim(),
          email: senderEmail.trim(),
          chatHistory: chatLog,
        }),
      });

      if (!response.ok) {
        throw new Error('Hiba az email küldésekor');
      }

      // Sikeres küldés
      alert('✅ Üzeneted sikeresen elküldve! Réka hamarosan válaszol. 🦊');
      
      // Reset
      setChatLog([]);
      setShowSendForm(false);
      setSenderName('');
      setSenderEmail('');
      setIsOpen(false);
    } catch (error) {
      console.error('Email send error:', error);
      alert('❌ Hiba történt az üzenet küldésekor. Kérlek próbáld újra, vagy írj nekünk: info@rekaklima.com');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const chatText = chatLog
        .map(msg => {
          if (msg.type === 'user') {
            return `Ügyfél: ${msg.text}`;
          } else {
            return `Szofi: ${msg.text}`;
          }
        })
        .join('\n');
      
      await navigator.clipboard.writeText(chatText);
      alert('✅ A beszélgetést kimásoltam! Illeszd be az emailedbe és küldd el Rékának: info@rekaklima.com');
      
      setChatLog([]);
      setShowSendForm(false);
      setSenderName('');
      setSenderEmail('');
    } catch (error) {
      alert('Hiba a másoláskor. Próbáld újra!');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  if (!mounted || typeof window === 'undefined') return null;

  const chatContent = (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          10% { transform: rotate(-5deg) translateX(-2px); }
          20% { transform: rotate(5deg) translateX(2px); }
          30% { transform: rotate(-5deg) translateX(-2px); }
          40% { transform: rotate(5deg) translateX(2px); }
          50% { transform: rotate(-3deg) translateX(-1px); }
          60% { transform: rotate(3deg) translateX(1px); }
          70% { transform: rotate(-2deg) translateX(-1px); }
          80% { transform: rotate(2deg) translateX(1px); }
          90% { transform: rotate(-1deg) translateX(0); }
        }

        .szofi-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      <div 
        className="fixed z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: isDragging ? 'none' : 'left 0.3s ease, top 0.3s ease',
          cursor: isMobile ? (isDragging ? 'grabbing' : 'grab') : 'pointer'
        }}
      >
        {/* Chat ablak */}
        {isOpen && (
          <div
            className="bg-white rounded-xl shadow-xl w-72 md:w-80 max-w-[calc(100vw-24px)] md:max-w-[calc(100vw-32px)] mb-4 flex flex-col absolute"
            style={{ 
              height: 'min(65vh, 520px)', 
              maxHeight: '80vh', 
              minHeight: '360px',
              bottom: '80px',
              right: position.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 500) ? '0' : 'auto',
              left: position.x <= (typeof window !== 'undefined' ? window.innerWidth / 2 : 500) ? '0' : 'auto'
            }}
          >
            {/* Fejléc */}
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-[#E0D5CC]">
              <h3 className="text-base md:text-lg font-semibold text-[#4A403A]">Szofi 🦊</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8C827D] hover:text-[#4A403A] text-xl"
              >
                ✕
              </button>
            </div>

            {/* Chat log */}
            {!showSendForm ? (
              <>
                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
                  {chatLog.length === 0 ? (
                    <p className="text-sm text-[#8C827D] italic">Szofi vár a kérdéseidre...</p>
                  ) : (
                    <>
                      {chatLog.map((msg, idx) => (
                        <div key={idx}>
                          {msg.type === 'user' ? (
                            <div className="text-right">
                              <div className="inline-block bg-[#C87941] text-white px-3 py-2 rounded-lg max-w-[70vw] md:max-w-xs text-sm break-words">
                                {msg.text}
                              </div>
                            </div>
                          ) : (
                            <div className="text-left">
                              {msg.title && (
                                <div className="font-semibold text-[#4A403A] text-sm mb-1">
                                  {msg.title}
                                </div>
                              )}
                              <div className="inline-block bg-[#F5E1D2] text-[#4A403A] px-3 py-2 rounded-lg max-w-[70vw] md:max-w-xs text-sm break-words">
                                🦊 {msg.text}
                              </div>
                              {msg.followUp && msg.followUp.length > 0 && (
                                <div className="text-xs text-[#8C827D] mt-2 opacity-70">
                                  Kérdések: {msg.followUp.join(' · ')}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-[#E0D5CC] p-3 md:p-4 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Írj Szofinak..."
                      className="flex-1 px-3 py-2 border border-[#E0D5CC] rounded-lg text-sm focus:outline-none focus:border-[#C87941]"
                      disabled={loading}
                    />
                    <button
                      onClick={handleSend}
                      disabled={loading}
                      className="px-4 py-2 bg-[#C87941] text-white rounded-lg font-medium hover:bg-[#B86A2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? '⏳' : '📤'}
                    </button>
                  </div>

                  {chatLog.length > 0 && (
                    <button
                      onClick={() => {
                        // Adjunk hozzá egy lezárós üzenetet
                        setChatLog(prev => [...prev, {
                          type: 'szofi',
                          text: 'Na ez már igazi rókacsemege 🦊🍂! Nyomd meg a „Küldj Rékának" gombot – elküldöm neki az információkat és hamarosan jelentkezik!'
                        }]);
                        setShowSendForm(true);
                      }}
                      className="w-full px-3 py-2 bg-[#F5E1D2] text-[#4A403A] rounded-lg font-medium hover:bg-[#E0D5CC] transition-colors text-sm"
                    >
                      📧 Küldj Rékának
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Send Form */
              <div className="flex-1 flex flex-col p-3 md:p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#4A403A] block mb-2">
                    Neved *
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Például: János"
                    className="w-full px-3 py-2 border border-[#E0D5CC] rounded-lg text-sm focus:outline-none focus:border-[#C87941]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#4A403A] block mb-2">
                    Email cím *
                  </label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border border-[#E0D5CC] rounded-lg text-sm focus:outline-none focus:border-[#C87941]"
                  />
                </div>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => setShowSendForm(false)}
                    className="flex-1 px-3 py-2 bg-[#E0D5CC] text-[#4A403A] rounded-lg font-medium hover:bg-[#D0CBBC] transition-colors text-sm"
                  >
                    Vissza
                  </button>
                  <button
                    onClick={handleSendToReka}
                    disabled={sendingEmail}
                    className="flex-1 px-3 py-2 bg-[#C87941] text-white rounded-lg font-medium hover:bg-[#B86A2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {sendingEmail ? '⏳ Küldés...' : '📧 Küldés'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Róka ikon gomb */}
        <button
          onMouseDown={isMobile ? handleDragStart : undefined}
          onTouchStart={isMobile ? handleDragStart : undefined}
          onClick={(e) => {
            if (hasMoved && isMobile) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            triggerShake();
            setIsOpen(prev => !prev);
          }}
          className={`w-16 h-16 rounded-full text-4xl shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center relative ${
            isShaking ? 'szofi-shake' : ''
          } ${isDragging ? 'scale-110' : ''}`}
          style={{
            background: 'rgba(200, 121, 65, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(200, 121, 65, 0.2)',
            touchAction: isMobile ? 'none' : 'auto',
            userSelect: 'none'
          }}
          title={isMobile ? "Húzd bárhová vagy nyisd meg Szofival" : "Nyiss meg Szofival"}
        >
          <span className="text-4xl">🦊</span>
        </button>
      </div>
    </>
  );

  return ReactDOM.createPortal(chatContent, document.body);
};

export default SzofiChat;
