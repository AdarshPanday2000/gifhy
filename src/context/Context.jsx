 import React, { useContext, useEffect, useState } from "react";
import  { createContext } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';


const GiftContext = createContext();

function GifProvider ({ children }){
    const [gifs, setGifs] = useState([]);
    const [filter, setFilter] = useState('gifs');
    const [favorites, setFavorites] = useState([]);    

    const addToFavorites = (id) => {
        if(favorites.includes(id)){
            const updatedFavorites = favorites.filter((itemId) => itemId !== id)
            localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites))
            setFavorites(updatedFavorites)
        } else{
            const updatedFavorites = [...favorites];
            updatedFavorites.push(id)
            localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites))
            setFavorites(updatedFavorites)
        }
    }

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
        setFavorites(favorites)
    }, [])
    
    const gf = new GiphyFetch(import.meta.env.VITE_API_KEY)

    return <GiftContext.Provider value={{gf, gifs, setGifs, filter, setFilter, favorites, addToFavorites }}>
            {children}
        </GiftContext.Provider>
}


export const GifState = () => {
    return useContext(GiftContext)
}

export default GifProvider;