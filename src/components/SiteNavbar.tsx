import { useState } from 'react';
import { Menu, PartyPopper, X } from 'lucide-react';
import SiteLink from '@/components/SiteLink';

const NAV_LINKS = [
  { label: 'ראשי', to: '/' },
  { label: 'החבילות שלנו', to: '/#pricing' },
  { label: 'איך זה עובד?', to: '/#how-it-works' },
  { label: 'סטודיו המשחקים', to: '/studio' },
];

interface SiteNavbarProps {
  pathname: string;
  hash: string;
}

function isActive(to: string, pathname: string, hash: string): boolean {
  if (to === '/studio') return pathname === '/studio';
  if (to === '/') return pathname === '/' && !hash;
  return pathname === '/' && hash === to.slice(to.indexOf('#'));
}

export default function SiteNavbar({ pathname, hash }: SiteNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-200/70 bg-cream-50/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <SiteLink to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-party-500 to-party-700 flex items-center justify-center shadow-md">
            <PartyPopper className="w-5 h-5 text-white" />
          </span>
          <span className="font-display font-800 text-lg leading-none text-ink">חוגגים בכיף!</span>
        </SiteLink>

        <nav className="hidden md:flex items-center gap-1" aria-label="ניווט ראשי">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.to, pathname, hash);
            return (
              <SiteLink
                key={link.label}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                className={`px-4 py-2 rounded-full text-sm font-600 transition ${
                  active ? 'bg-party-50 text-party-700' : 'text-ink/65 hover:text-ink hover:bg-white'
                }`}
              >
                {link.label}
              </SiteLink>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'סגירת התפריט' : 'פתיחת התפריט'}
          className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-cream-200 text-ink"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-cream-200/70 bg-cream-50 px-4 py-3 flex flex-col gap-1" aria-label="ניווט נייד">
          {NAV_LINKS.map((link) => (
            <SiteLink
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-base font-600 text-ink hover:bg-white transition"
            >
              {link.label}
            </SiteLink>
          ))}
        </nav>
      )}
    </header>
  );
}
