declare module 'lolcatjs' {
  export const options = {
    /// To animate or not (only works if the sleep module is available)
    animate: false,
    /// Duration of the animation
    duration: 12,
    /// Seed of the rainbow, use the same for the same pattern
    seed: 0,
    /// Animation speed
    speed: 20,
    /// Spread of the rainbow
    spread: 8.0,
    /// Frequency of the rainbow colors
    freq: 0.3
  };
  export function println(line: string): void;
  export function rainbow(freq: number, i: number): { red: number; green: number; blue: number };
  export function fromPipe(): Promise<void>;
  export function fromFile(file: string): Promise<void>;
  export function fromString(string: string): void;
}
