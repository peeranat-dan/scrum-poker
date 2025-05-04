import { Particles } from '@/components/magicui/particles';
import { useTheme } from '@/providers/theme';
import { useEffect, useState } from 'react';

export default function HeroParticles() {
  const [color, setColor] = useState('#ffffff');
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      setColor(systemTheme === 'dark' ? '#ffffff' : '#000000');
    } else {
      setColor(theme === 'dark' ? '#ffffff' : '#000000');
    }
  }, [theme]);

  return <Particles className='absolute inset-0 -z-10' quantity={80} refresh color={color} />;
}
