import React, { useState, useEffect } from 'react';

const DocViewer = () => {
  const [src, setSrc] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Build the Office Online Viewer URL
    try {
      const docUrl = `${window.location.origin}/impp-4-sem.docx`;
      const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(docUrl)}`;
      setSrc(viewerUrl);
    } catch (e) {
      console.error('Failed to construct viewer URL', e);
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Unable to load the document viewer.</p>
        <p>
          You can still <a href="/impp-4-sem.docx" target="_blank" rel="noopener noreferrer">download the document here</a>.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '80vh' }}>
      {src ? (
        <iframe
          src={src}
          title="Document Viewer"
          style={{ border: 'none', width: '100%', height: '100%' }}
          allowFullScreen
        />
      ) : (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading document…</p>
      )}
    </div>
  );
};

export default DocViewer;
