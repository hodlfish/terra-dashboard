import React from 'react';

interface ErrorBoundaryState {
    error: any;
}

interface ErrorBoundaryProps {
    children: any;
    errorChildren: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = { error: false };
    }
  
    static getDerivedStateFromError(error: any) {
        return { error: error };
    }
  
    render() {
        if (this.state.error) {
            return this.props.errorChildren(this.state.error);
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;