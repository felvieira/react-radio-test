import { useState } from 'react';
import { AiOutlinePlayCircle, AiOutlinePause } from 'react-icons/ai';
import { BsStopFill } from 'react-icons/bs';
import { RiEdit2Line, RiDeleteBin2Line } from 'react-icons/ri';

const RadioFavs = ({
  filteredFavoriteRadios,
  searchQueryMain,
  setSearchQueryMain,
  playingRadio,
  handleStop,
  handlePlayPause,
  handleEditRadio,
  handleDeleteRadio,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={searchQueryMain}
        onChange={(e) => setSearchQueryMain(e.target.value)}
        placeholder="Buscar rádio"
        className="border border-gray-400 rounded px-2 py-1"
      />

      <h1 className="text-2xl font-bold">Rádios Favoritas</h1>
      <ul>
        {filteredFavoriteRadios.map((radio) => (
          <li
            key={radio.stationuuid}
            className="flex items-center justify-between bg-white rounded shadow p-4"
          >
            <span>{radio.name}</span>
            <div>
              {playingRadio &&
              playingRadio.stationuuid === radio.stationuuid ? (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleStop}
                >
                  <BsStopFill className="h-6 w-6 inline-block align-text-bottom" />
                </button>
              ) : (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handlePlayPause(radio)}
                  >
                    <AiOutlinePlayCircle className="h-6 w-6 inline-block align-text-bottom" />
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEditRadio(radio)}
                  >
                    <RiEdit2Line className="h-6 w-6 inline-block align-text-bottom" />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteRadio(radio)}
                  >
                    <RiDeleteBin2Line className="h-6 w-6 inline-block align-text-bottom" />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RadioFavs;
