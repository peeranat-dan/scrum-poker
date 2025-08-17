import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WinStreakBadge } from '../win-streak-badge';

describe('WinStreakBadge', () => {
  it('should not render when streak is 0', () => {
    const { container } = render(<WinStreakBadge streak={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render fire emoji and streak count when streak is greater than 0', () => {
    render(<WinStreakBadge streak={5} />);
    
    expect(screen.getByText('🔥')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<WinStreakBadge streak={3} className='custom-class' />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render with correct base styles', () => {
    const { container } = render(<WinStreakBadge streak={1} />);
    
    expect(container.firstChild).toHaveClass(
      'absolute',
      '-top-2',
      '-right-2',
      'z-20',
      'flex',
      'h-6',
      'w-6',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-orange-500',
      'text-xs',
      'font-bold',
      'text-white',
      'shadow-lg'
    );
  });
});