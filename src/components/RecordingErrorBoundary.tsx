import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  prevChildren: ReactNode;
}

/**
 * RecordingErrorBoundary catches temporary runtime/render errors that happen
 * while typing mid-keystroke in dev mode. Instead of crashing the React tree
 * or popping up error screens, it retains the last successfully rendered UI
 * and automatically retries as soon as Vite pushes a hot module update.
 */
export class RecordingErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, prevChildren: null };
  private lastGoodContent: ReactNode = null;
  private unsubscribeHmr?: () => void;

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State): Partial<State> | null {
    if (nextProps.children !== prevState.prevChildren) {
      return {
        hasError: false,
        prevChildren: nextProps.children,
      };
    }
    return null;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.debug('[RecordingErrorBoundary] Render error suppressed during typing:', error.message, errorInfo);
  }

  componentDidMount() {
    if (import.meta.hot) {
      const reset = () => {
        if (this.state.hasError) {
          this.setState({ hasError: false });
        }
      };
      import.meta.hot.on('vite:beforeUpdate', reset);
      this.unsubscribeHmr = () => {
        import.meta.hot?.off('vite:beforeUpdate', reset);
      };
    }
  }

  componentWillUnmount() {
    this.unsubscribeHmr?.();
  }

  render() {
    if (this.state.hasError) {
      return this.lastGoodContent;
    }
    this.lastGoodContent = this.props.children;
    return this.props.children;
  }
}
