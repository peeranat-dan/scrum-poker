import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WinStreakBadge } from '../win-streak-badge';

describe('WinStreakBadge', () => {
  it('should not render when streak is 0', () => {
    const { container } = render(<WinStreakBadge streak={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render fire icon and streak count when streak > 0', () => {
    render(<WinStreakBadge streak={3} />);
    
    expect(screen.getByText('🔥')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<WinStreakBadge streak={1} className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should display correct streak number', () => {
    render(<WinStreakBadge streak={10} />);
    
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});