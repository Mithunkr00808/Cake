'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page-level Error caught:', error)
  }, [error])

  return (
    <section className="error-section" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="auto-container">
            <div className="content-box">
                <h1 style={{ fontSize: '48px', color: '#ff7a7a', marginBottom: '20px' }}>Oops! Something went wrong.</h1>
                <p style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>
                    We apologize for the inconvenience. Our team has been notified.
                </p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button
                        onClick={() => reset()}
                        className="theme-btn"
                        style={{ padding: '12px 30px', backgroundColor: '#333', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Try again
                    </button>
                    <Link href="/" className="theme-btn" style={{ padding: '12px 30px', backgroundColor: '#ff7a7a', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}
