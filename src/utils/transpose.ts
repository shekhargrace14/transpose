// utils/transpose.ts

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function transposeChord(chord: string, steps: number): string {
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;

  const [_, root, suffix] = match;
  const index = NOTES.indexOf(root);
  if (index === -1) return chord;

  const newIndex = (index + steps + NOTES.length) % NOTES.length;
  return NOTES[newIndex] + suffix;
}
