// global.d.ts
interface Window {
  ct?: (method: string, modId: string) => {sessionId: string}
}
