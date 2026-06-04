import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    const updateEnabledState = () => {
      const enabled = mediaQuery.matches;
      setIsEnabled(enabled);
      document.body.classList.toggle('has-custom-cursor', enabled);
    };

    updateEnabledState();
    mediaQuery.addEventListener('change', updateEnabledState);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      mediaQuery.removeEventListener('change', updateEnabledState);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;

      if (
        target instanceof HTMLElement &&
        target.closest('[data-cursor-stays-small]')
      ) {
        setIsHovering(false);
        return;
      }

      if (
        target instanceof HTMLElement &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('label'))
      ) {
        setIsHovering(true);
        return;
      }

      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
