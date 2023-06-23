import './global.css';
import { useState, useEffect, useRef } from 'react';
import MenuHamburguer from './components/menu-hamburguer';
import RadioEditModal from './components/radioEdit';
import RadioFavs from './components/radioFavs';

function App() {
  const [radioData, setRadioData] = useState([]);
  const [favoriteRadios, setFavoriteRadios] = useState([]);
  const [searchQueryMenu, setSearchQueryMenu] = useState('');
  const [searchQueryMain, setSearchQueryMain] = useState('');
  const [playingRadio, setPlayingRadio] = useState(null);
  const [editingRadio, setEditingRadio] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    fetchRadioData();
  }, []);

  const fetchRadioData = async () => {
    try {
      const response = await fetch(
        'https://de1.api.radio-browser.info/json/stations/search?limit=10'
      );
      const data = await response.json();
      setRadioData(data);
    } catch (error) {
      console.error('Error fetching radio data:', error);
    }
  };

  const radio = {
    handleEdit: (radio) => {
      setEditingRadio(radio);
    },

    handleSave: (editedRadio) => {
      setEditingRadio(null);
    },

    handleCancelEdit: () => {
      setEditingRadio(null);
    },

    handlePlayPause: (radio) => {
      if (playingRadio && playingRadio.stationuuid === radio.stationuuid) {
        audioRef.current.pause();
        setPlayingRadio(null);
      } else {
        audioRef.current.src = radio.url;
        audioRef.current.play();
        setPlayingRadio(radio);
      }
    },

    handleStop: () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingRadio(null);
    },

    handleDelete: (radio) => {
      const updatedFavoriteRadios = favoriteRadios.filter(
        (favRadio) => favRadio.stationuuid !== radio.stationuuid
      );
      setFavoriteRadios(updatedFavoriteRadios);
      saveFavoriteRadiosToLocalStorage(updatedFavoriteRadios);
    },
  };

  const saveFavoriteRadiosToLocalStorage = (favoriteRadios) => {
    localStorage.setItem('favorites', JSON.stringify(favoriteRadios));
  };

  const filteredRadiosMenu = radioData.filter((radio) =>
    radio.name.toLowerCase().includes(searchQueryMenu.toLowerCase())
  );

  const filteredFavoriteRadios = favoriteRadios.filter((radio) =>
    radio.name.toLowerCase().includes(searchQueryMain.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <nav className="bg-white shadow">
        <MenuHamburguer
          radioData={filteredRadiosMenu}
          favoriteRadios={favoriteRadios}
          setFavoriteRadios={setFavoriteRadios}
          searchQueryMenu={searchQueryMenu}
          setSearchQueryMenu={setSearchQueryMenu}
          saveFavoriteRadiosToLocalStorage={saveFavoriteRadiosToLocalStorage}
        />
      </nav>
      <main className="container mx-auto p-4 pl-20">
        <RadioFavs
          filteredFavoriteRadios={filteredFavoriteRadios}
          searchQueryMain={searchQueryMain}
          setSearchQueryMain={setSearchQueryMain}
          playingRadio={playingRadio}
          handleStop={radio.handleStop}
          handlePlayPause={radio.handlePlayPause}
          handleEditRadio={radio.handleEdit}
          handleDeleteRadio={radio.handleDelete}
        />
      </main>
      <audio ref={audioRef}></audio>
      {editingRadio && (
        <RadioEditModal
          radio={editingRadio}
          onSave={radio.handleSave}
          onCancel={radio.handleCancelEdit}
        />
      )}
    </div>
  );
}

export default App;
