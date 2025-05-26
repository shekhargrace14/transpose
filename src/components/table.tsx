// components/ChordTable.tsx

"use client";
import React, { useEffect, useState } from 'react';
import { transposeChord, getKeyByShift } from '../utils/nashville';

type ChordLyric = { chord: string; lyrics: string };
type Song = { title?: string; key: string; lines: ChordLyric[][] };

const ChordTable = () => {
  const [song, setSong] = useState<Song | null>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    fetch('/song.json').then(res => res.json()).then(setSong);
  }, []);

  if (!song) return <p>Loading...</p>;

  const fromKey = song.key;
  const toKey = getKeyByShift(fromKey, shift);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{song.title}</h2>

      <div className="mb-4 flex gap-4 items-center">
        <button onClick={() => setShift(shift - 1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
        <span>Transpose: {fromKey} → {toKey}</span>
        <button onClick={() => setShift(shift + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
      </div>

      <table className="table-auto border-collapse">
        <tbody>
          {song.lines.map((line, idx) => {
            const originalChords = line.map(item => item.chord);
            const transposedChords = transposeChord(originalChords, fromKey, toKey);

            return (
              <React.Fragment key={idx}>
                <tr>
                  {transposedChords.map((chord, i) => (
                    <td key={i} className="px-2 py-1 font-bold text-center">{chord}</td>
                  ))}
                </tr>
                <tr>
                  {line.map((item, i) => (
                    <td key={i} className="px-2 py-1 text-center">{item.lyrics + ' '}</td>
                  ))}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ChordTable;
