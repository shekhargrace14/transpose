// utils/transpose.ts

const MAJOR_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getKeyByShift(key: string, shift: number): string {
  const index = MAJOR_SCALE.indexOf(key);
  if (index === -1) throw new Error('Invalid key: ' + key);
  const newIndex = (index + shift + MAJOR_SCALE.length) % MAJOR_SCALE.length;
  return MAJOR_SCALE[newIndex];
}

function getScale(key: string): string[] {
  const majorSteps = [2, 2, 1, 2, 2, 2, 1]; // W W H W W W H
  const startIndex = MAJOR_SCALE.indexOf(key);
  if (startIndex === -1) throw new Error("Invalid key: " + key);

  const scale = [MAJOR_SCALE[startIndex]];
  let index = startIndex;
  for (let step of majorSteps) {
    index = (index + step) % 12;
    scale.push(MAJOR_SCALE[index]);
  }
  return scale.slice(0, 7); // return 7-note scale
}

function normalizeChord(chord: string): [string, string] {
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) throw new Error("Invalid chord: " + chord);
  return [match[1], match[2]]; // root, suffix
}

function transposeChord(
  chords: string[],
  fromKey: string,
  toKey: string
): string[] {
  const fromScale = getScale(fromKey);
  const toScale = getScale(toKey);

  return chords.map((chord) => {
    const [root, suffix] = normalizeChord(chord);
    const index = fromScale.indexOf(root);
    if (index === -1) return chord; // not in scale, leave unchanged

    const transposedRoot = toScale[index];
    return transposedRoot + suffix;
  });
}

export { MAJOR_SCALE, getKeyByShift, transposeChord };
