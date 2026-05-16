import { Particles } from '@/components/magicui/particles';
import { useTheme } from '@/providers/theme';

export default function HeroParticles() {
  const { theme } = useTheme();

  const resolvedTheme =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const color = resolvedTheme === 'dark' ? '#ffffff' : '#000000';

  return <Particles className='absolute inset-0 -z-10' quantity={80} refresh color={color} />;
}
