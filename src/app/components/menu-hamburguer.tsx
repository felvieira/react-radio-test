import React, { useEffect, useState } from 'react';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai';

function MenuHamburguer({
  radioData,
  favoriteRadios,
  setFavoriteRadios,
  searchQueryMenu,
  setSearchQueryMenu,
  saveFavoriteRadiosToLocalStorage,
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    const storedFavoriteRadios = localStorage.getItem('favorites');
    if (storedFavoriteRadios) {
      setFavoriteRadios(JSON.parse(storedFavoriteRadios));
    }
  }, []);

  const handleFavorite = (radio) => {
    const updatedFavoriteRadios = [...favoriteRadios];
    const radioIndex = updatedFavoriteRadios.findIndex(
      (fav) => fav.stationuuid === radio.stationuuid
    );

    if (radioIndex !== -1) {
      updatedFavoriteRadios.splice(radioIndex, 1);
    } else {
      updatedFavoriteRadios.push(radio);
    }

    setFavoriteRadios(updatedFavoriteRadios);
    saveFavoriteRadiosToLocalStorage(updatedFavoriteRadios);
  };

  const handleSearchMenu = (event) => {
    setSearchQueryMenu(event.target.value);
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const renderHeartIcon = (radio) => {
    const isFavorite = favoriteRadios.some(
      (fav) => fav.stationuuid === radio.stationuuid
    );

    return isFavorite ? (
      <AiFillHeart className="h-6 w-6 inline-block align-text-bottom" />
    ) : (
      <AiOutlineHeart className="h-6 w-6 inline-block align-text-bottom" />
    );
  };

  const filteredRadiosMenu = radioData.filter((radio) =>
    radio.name.toLowerCase().includes(searchQueryMenu.toLowerCase())
  );

  return (
    <div className="menu-hamburguer h-screen bg-white z-10 transition duration-300 ease-in-out transform translate-x-0 fixed">
      <div className="flex justify-between items-center bg-blue-500 text-white p-4">
        <button
          role="button"
          aria-label="Abrir menu"
          name="open"
          onClick={toggleMenuVisibility}
        >
          <AiOutlineMenu
            className={`h-6 w-6 cursor-pointer ${
              isMenuVisible ? 'hidden' : ''
            }`}
          />
        </button>
        <button
          role="button"
          aria-label="Fechar menu"
          name="open"
          onClick={toggleMenuVisibility}
        >
          <AiOutlineClose
            className={`h-6 w-6 cursor-pointer ${
              isMenuVisible ? '' : 'hidden'
            }`}
          />
        </button>
      </div>

      {isMenuVisible && (
        <div className="p-4">
          <input
            type="text"
            value={searchQueryMenu}
            onChange={handleSearchMenu}
            placeholder="Buscar rádio"
            className="border border-gray-400 rounded px-2 py-1 mb-4"
          />

          <ul className="radio-list">
            {filteredRadiosMenu.map((radio) => (
              <li key={radio.stationuuid} className="radio-item">
                <span>{radio.name}</span>
                <button
                  onClick={() => handleFavorite(radio)}
                  className={`${
                    favoriteRadios.some(
                      (fav) => fav.stationuuid === radio.stationuuid
                    )
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {renderHeartIcon(radio)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuHamburguer;
