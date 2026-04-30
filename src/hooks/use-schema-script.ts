import { useEffect } from 'react';

/**
 * Hook to inject JSON-LD structured data into the page head
 * Automatically cleans up on unmount
 * @param schema - The schema object to inject
 * @param id - Optional unique ID for the script tag (for cleanup)
 */
export function useSchemaScript(schema: Record<string, any>, id?: string) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    if (id) {
      script.id = `schema-${id}`;
    }
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [schema, id]);
}
