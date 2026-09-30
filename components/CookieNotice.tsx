'use client';

import { useEffect, useState } from 'react';

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem('cookie-consent');
    if (!consented) {
      setIsVisible(true);
    } else if (consented === 'true') {
      // Load Google Analytics if consent is given
      loadGoogleAnalytics();
    }
  }, []);

  const loadGoogleAnalytics = () => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // Replace with your GA ID
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA ID
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
    loadGoogleAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'var(--ink)',
        color: 'var(--on-brand)',
        boxShadow: 'var(--shadow-modal)',
      }}
      role="dialog"
      aria-label="Cookie- und Tracking-Einwilligung"
    >
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 text-sm">
            <h3 className="font-semibold mb-2">Ihre Privatsphäre ist wichtig</h3>
            <p className="mb-3" style={{ color: 'var(--ink-soft)' }}>
              Diese Website nutzt Google Analytics zur Analyse Ihrer Nutzung. Mit Ihrer Zustimmung können wir unseren Service verbessern. Erfahren Sie mehr in unserer{' '}
              <a
                href="/datenschutz"
                className="underline hover:opacity-80"
              >
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--line)',
                color: 'var(--ink)',
              }}
            >
              Ablehnen
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--brand)',
                color: 'var(--on-brand)',
              }}
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
