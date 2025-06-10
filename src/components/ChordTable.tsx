// components/ChordTable.tsx

"use client";
import React, { useEffect, useState } from 'react';
// import { transposeChord, getKeyByShift } from '../utils/nashville';
import { transposeChord, getKeyByShift } from '../utils/transpose';
import { fetchSongById  } from '@/app/reactQuery/query';

type ChordLyric = { chord: string; lyrics: string };
type Song = { title?: string; key: string; lines: ChordLyric[][] };

type ChordTableProps={
  id: string
  isChord : boolean
}

const ChordTable:React.FC<ChordTableProps> = ({id, isChord}) => {
  console.log(id, "table id");
  console.log(isChord, "table isChord");
  const [song, setSong] = useState<Song | null>(null);
  const [shift, setShift] = useState(0);
  console.log(song, "localSong");

useEffect(() => {
  async function fetchSong() {
    const singleSong = await fetchSongById(id);
    setSong(singleSong);
    console.log(singleSong, " singleSong fetched song");
  }
  fetchSong();
}, [id]);



  console.log(song, "table song");
  

  // useEffect(() => {
  //   fetch('/song.json').then(res => res.json()).then(setSong);
  // }, []);

  if (!song) return <p>Loading...</p>;

  const fromKey = song.key;
  const toKey = getKeyByShift(fromKey, shift);

  return (
    <div className="p-4">

      <h2 className="text-2xl font-semibold mb-4">{song.title}{isChord ? " Chords":" Lyrics"}</h2>
      {isChord && (

        <div className="mb-4 flex gap-4 items-center">
        <button onClick={() => setShift(shift - 1)} className="px-3 py-1 bg-gray-200 text-black rounded">-</button>
        <span>Transpose: {fromKey} → {toKey}</span>
        <button onClick={() => setShift(shift + 1)} className="px-3 py-1 bg-gray-200 text-black rounded">+</button>
      </div>
      )}
      <table className="table-auto border-collapse">
        <tbody>
          {song.lines.map((line, idx) => {
            const originalChords = line.map(item => item.chord);
            const transposedChords = transposeChord(originalChords, fromKey, toKey);

            return (
              <React.Fragment key={idx} >
                <div className='mb-3'>
                {isChord && (
                  <tr className='mb-3'>
                    {transposedChords.map((chord, i) => (
                      <td key={i} className="font-bold text-left">{chord}</td>
                    ))}
                  </tr>
                )}
                
                <tr>
                  {line.map((item, i) => (
                    <td key={i} className="text-left">{item.lyrics}&nbsp;</td>
                  ))}
                </tr>
                  </div>
                
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ChordTable;
