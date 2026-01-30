import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Production-ben ne logoljunk console-ba
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDF9F6] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-serif text-[#4A403A] mb-3">
              Hoppá, valami hiba történt!
            </h2>
            <p className="text-[#8C827D] mb-6">
              Ne aggódj, frissítsd az oldalt és próbáld újra.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-[#C87941] text-white rounded-lg font-medium hover:bg-[#B86A2E] transition-colors"
            >
              Vissza a főoldalra
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
