import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Annapurna ErrorBoundary caught a runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      localStorage.removeItem('annapurna_view');
      localStorage.removeItem('annapurna_role');
      sessionStorage.removeItem('annapurna_admin_session');
      sessionStorage.removeItem('annapurna_admin_auth');
    } catch {
      // ignore
    }
    window.location.href = window.location.origin + window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-4 font-body text-on-surface">
          <div className="max-w-md w-full bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-2xl border border-outline-variant/30 text-center">
            <div className="w-16 h-16 rounded-2xl bg-error-container/30 text-error flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold text-on-surface mb-2">Annapurna Interface Recovery</h1>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
              A temporary rendering conflict was prevented from crashing the system. Click below to refresh and load the clean interface.
            </p>
            {this.state.error && (
              <div className="mb-5 p-3 rounded-xl bg-surface-container-low text-left font-mono text-[11px] text-error overflow-x-auto border border-outline-variant/20 max-h-32">
                {this.state.error.toString()}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-3 px-4 rounded-xl shadow-md transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Reset Cache & Return to Home</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
