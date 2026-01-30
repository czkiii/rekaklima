import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useDraggable() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [customPosition, setCustomPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const dragStartPos = useRef<Position>({ x: 0, y: 0 });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Initialize default position
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const defaultPos = {
      x: window.innerWidth - 96,
      y: window.innerHeight - 96
    };
    
    // Try to restore from localStorage (only mobile)
    if (isMobile) {
      try {
        const saved = localStorage.getItem('szofi-position');
        if (saved) {
          const parsed = JSON.parse(saved);
          setPosition(parsed);
          setCustomPosition(parsed);
          return;
        }
      } catch (e) {
        // Ignore localStorage errors
      }
    }
    
    setPosition(defaultPos);
  }, [isMobile]);

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      const defaultPos = {
        x: window.innerWidth - 96,
        y: window.innerHeight - 96
      };

      if (!isMobileNow) {
        // Desktop mode: reset to default
        setPosition(defaultPos);
        setCustomPosition(null);
      } else if (customPosition) {
        // Mobile: constrain to screen
        setPosition({
          x: Math.min(customPosition.x, window.innerWidth - 96),
          y: Math.min(customPosition.y, window.innerHeight - 96)
        });
      } else {
        setPosition(defaultPos);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [customPosition]);

  // Handle dragging
  useEffect(() => {
    if (!isDragging || !isMobile) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = Math.abs(clientX - dragStartPos.current.x);
      const deltaY = Math.abs(clientY - dragStartPos.current.y);

      if (deltaX > 5 || deltaY > 5) {
        setHasMoved(true);
      }

      const newPos = {
        x: Math.max(24, Math.min(window.innerWidth - 88, clientX - 32)),
        y: Math.max(24, Math.min(window.innerHeight - 88, clientY - 32))
      };

      setPosition(newPos);
      setCustomPosition(newPos);

      // Save to localStorage
      try {
        localStorage.setItem('szofi-position', JSON.stringify(newPos));
      } catch (e) {
        // Ignore localStorage errors
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isMobile]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isMobile) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setIsDragging(true);
    setHasMoved(false);
    dragStartPos.current = { x: clientX, y: clientY };
  };

  const resetToDefault = () => {
    if (typeof window === 'undefined') return;
    
    const defaultPos = {
      x: window.innerWidth - 96,
      y: window.innerHeight - 96
    };
    setPosition(defaultPos);
    
    if (isMobile) {
      try {
        localStorage.removeItem('szofi-position');
      } catch (e) {
        // Ignore
      }
    }
  };

  return {
    position,
    isDragging,
    hasMoved,
    isMobile,
    handleDragStart,
    resetToDefault
  };
}
