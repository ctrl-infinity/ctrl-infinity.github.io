export type AgentState = 'ready' | 'timeout' | 'unavailable';

export interface DispatchInput {
  tenantVerified: boolean;
  routeKnown: boolean;
  primary: AgentState;
  fallbackAvailable: boolean;
}

export interface DispatchDecision {
  destination: 'blocked' | 'primary' | 'fallback' | 'human';
  title: string;
  explanation: string;
  trace: string[];
}

export function decideDispatch(input: DispatchInput): DispatchDecision {
  if (!input.tenantVerified) {
    return {
      destination: 'blocked',
      title: 'Stop at the identity boundary.',
      explanation: 'This illustrative policy does not dispatch a request without verified tenant context. A fallback must not bypass that boundary.',
      trace: ['Request', 'Identity missing', 'Stop'],
    };
  }
  if (!input.routeKnown) {
    return {
      destination: 'human',
      title: 'Ask for a clearer route.',
      explanation: 'No domain agent owns this request in the simulation. Ask a person to clarify rather than inventing a destination.',
      trace: ['Identity verified', 'No matching route', 'Clarify'],
    };
  }
  if (input.primary === 'ready') {
    return {
      destination: 'primary',
      title: 'Dispatch to the primary agent.',
      explanation: 'Identity and route are known, and the primary agent is available. Dispatch is a decision, not a guarantee that the response will be correct.',
      trace: ['Identity verified', 'Route matched', 'Primary agent'],
    };
  }
  if (input.fallbackAvailable) {
    return {
      destination: 'fallback',
      title: 'Dispatch to the fallback agent.',
      explanation: `The primary agent is ${input.primary === 'timeout' ? 'timing out' : 'unavailable'}. This simulation allows one known fallback while preserving tenant context.`,
      trace: ['Identity verified', 'Primary failed', 'Known fallback'],
    };
  }
  return {
    destination: 'human',
    title: 'Make the failure visible.',
    explanation: 'There is no available fallback. Stop and ask for human intervention instead of hiding the failure behind a success-shaped response.',
    trace: ['Identity verified', 'Primary failed', 'Human intervention'],
  };
}
