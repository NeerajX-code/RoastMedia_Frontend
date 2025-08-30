import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Two themes only: arc (default/root) and emerald (data-theme="emerald")
export default function ThemeToggle({ size = 22 }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    // migrate any legacy values to arc(default)
    if (saved !== 'emerald') return 'arc';
    return 'emerald';
  });

  useEffect(() => {
    if (theme === 'emerald') {
      document.documentElement.setAttribute('data-theme', 'emerald');
      localStorage.setItem('theme', 'emerald');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'arc');
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'emerald' ? 'arc' : 'emerald'));

  const isEmerald = theme === 'emerald';
  return (
    <button
      aria-label="Toggle theme"
      title={`Switch to ${isEmerald ? 'Arc' : 'Emerald'} theme`}
      onClick={toggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 8,
        height: size + 8,
        borderRadius: 999,
        border: '1px solid var(--border)',
        background: 'var(--bg-elev)',
        color: 'var(--text)'
      }}
    >
      {isEmerald ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
}
