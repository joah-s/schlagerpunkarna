import { useCallback } from 'react';

export const useExternalLinkHandler = () => {
  const handleExternalLink = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.href;
    const isExternal = !href.startsWith(window.location.origin) && !href.startsWith('/');
    
    if (isExternal) {
      e.preventDefault();
      const confirmed = window.confirm('Du lämnar nu Schlagerpunkarnas webbplats. Vill du fortsätta?');
      if (confirmed) {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    }
  }, []);

  return handleExternalLink;
}; 