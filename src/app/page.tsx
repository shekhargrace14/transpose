import Table from "@/components/ChordTable";
import Image from "next/image";
import { fetchSongs } from "./reactQuery/query";
import { table } from "console";
import Link from "next/link";

type Song = {
  id: string;
  title: string;
  key: string;
}
async function Home() {
  const songs = await fetchSongs();
  console.log(songs[0].id, "page songs   id");

  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!

    </h1>
    {
      songs.map((song: Song) => (
        <Link href={`/song/${song.id}`} key={song.id}>
        <div key={song.id} className="p-4">
          <h2 className="text-2xl font-semibold mb-4">{song.title}</h2>
          <p>{song.key}</p>
        </div>
        </Link>
      ))
    }
  
    </>
  );
}
export default Home