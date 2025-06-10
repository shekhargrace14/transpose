import { useQuery } from "@tanstack/react-query";
import { songServerAction } from "../actions/song";
import { songByIdAction } from "../actions/songByIdAction";
// import { songBySlug } from "../actions/songBySlug";
// import { artistServerAction } from "../actions/artist";
// import { artistBySlug } from "../actions/artistBySlug";
// import { category } from "../actions/category";
// import { categoryBySlug } from "../actions/categoryBySlug";


const fetchSongs = async () => {
  const res = await songServerAction();
  return res;
};

const useGetSongs = () => {
  return useQuery({
    queryKey: ["songs"],
    queryFn: songServerAction,
  });
};

// Song By Id

const fetchSongById = async (id: string) => {
  const res = await songByIdAction(id);
  return res;
};

const useGetSongById = (id: string) => {
  return useQuery({
    queryKey: ["songs", id],
    queryFn: async () => await songByIdAction(id),
  });
};

// Song By Slug

// const fetchSongBySlug = async (songSlug: string) => {
//   const res = await songBySlug(songSlug);
//   return res;
// };

// const useGetSongBySlug = (songSlug: string) => {
//   return useQuery({
//     queryKey: ["songs", songSlug],
//     queryFn: async () => await songBySlug(songSlug),
//   });
// };


// // artist 
// const fetchArtists = async () =>{
//   const res = await artistServerAction()
//   return res;
// }

// const useGetArtists = () =>{
//   return useQuery({
//     queryKey : ["artists"],
//     queryFn: artistServerAction,
//   })
// }

// const fetchArtistBySlug = (artistSlug: string) =>{
//   const res = artistBySlug(artistSlug)
//   return res;
// }

// const useGetArtistBySlug = (artistSlug: string) =>{
//   return useQuery({
//     queryKey:["artist"],
//     queryFn : async ()=> await artistBySlug(artistSlug)
//   })
// }
// // Category
// const fetchCategory = async () =>{
//   const res = await category()
//   return res;
// }

// const useGetCategory = () =>{
//   return useQuery({
//     queryKey : ["category"],
//     queryFn: category,
//   })
// }

// const fetchCategoryBySlug = (categorySlug: string) =>{
//   const res = categoryBySlug(categorySlug)
//   return res;
// }

// const useGetCategoryBySlug = (categorySlug: string) =>{
//   return useQuery({
//     queryKey:["artist"],
//     queryFn : async ()=> await categoryBySlug(categorySlug)
//   })
// }




export { 
  fetchSongById, 
  useGetSongById, 
  fetchSongs, 
  // fetchSongBySlug, useGetSongBySlug,
  useGetSongs, 
  // fetchArtists, useGetArtists, 
  // fetchArtistBySlug, useGetArtistBySlug,
  // fetchCategory, useGetCategory, fetchCategoryBySlug, useGetCategoryBySlug,
};