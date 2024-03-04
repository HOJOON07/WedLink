import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbakcUI?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('error', error);
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallbakcUI ?? <h1>에러가 발생했습니다.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
