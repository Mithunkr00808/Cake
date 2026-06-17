import React from 'react';

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      width: '100%'
    }}>
      <div className="preloader-style-two" style={{ position: 'relative', background: 'transparent' }}>
        {/* We can reuse the site's existing preloader spinner style here */}
        <div className="spinner" style={{
            width: '50px',
            height: '50px',
            border: '3px solid #ff7a7a',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
