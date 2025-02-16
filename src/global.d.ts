export {};

declare global {
  interface Window {
    _tmr?: {
      push: (params: {
        type: string;
        id: number;
        value: string;
        goal: string;
        params: { [key: string]: string };
      }) => void;
    };
  }
}
