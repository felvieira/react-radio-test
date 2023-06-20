import React, { useState } from 'react';
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
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleFavorite = (radio) => {
    if (favoriteRadios.includes(radio)) {
      setFavoriteRadios(
        favoriteRadios.filter((favRadio) => favRadio !== radio)
      );
    } else {
      setFavoriteRadios([...favoriteRadios, radio]);
    }
  };

  const handleSearchMenu = (event) => {
    setSearchQueryMenu(event.target.value);
  };

  const filteredRadiosMenu = radioData.filter((radio) =>
    radio.name.toLowerCase().includes(searchQueryMenu.toLowerCase())
  );

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="menu-hamburguer h-screen bg-white z-10 transition duration-300 ease-in-out transform translate-x-0">
      <div className="flex justify-between items-center bg-blue-500 text-white p-4">
        <AiOutlineMenu
          className={`h-6 w-6 cursor-pointer ${isMenuVisible ? 'hidden' : ''}`}
          onClick={toggleMenuVisibility}
        />

        <AiOutlineClose
          className={`h-6 w-6 cursor-pointer ${isMenuVisible ? '' : 'hidden'}`}
          onClick={toggleMenuVisibility}
        />
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
                    favoriteRadios.includes(radio)
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {favoriteRadios.includes(radio) ? (
                    <AiFillHeart className="h-6 w-6 inline-block align-text-bottom" />
                  ) : (
                    <AiOutlineHeart className="h-6 w-6 inline-block align-text-bottom" />
                  )}
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
