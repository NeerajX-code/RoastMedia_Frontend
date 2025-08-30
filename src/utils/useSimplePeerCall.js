// Calls removed: return a no-op hook so imports don't break
export function useSimplePeerCall() {
  return {
    start: () => {},
    end: () => {},
    status: 'idle',
    localStream: null,
    remoteStream: null,
  };
}
