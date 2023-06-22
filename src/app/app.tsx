import './global.css';

import { useState, useRef, useEffect } from 'react';
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
    async function fetchData() {
      const response = await fetch(
        'https://de1.api.radio-browser.info/json/stations/search?limit=10'
      );
      const data = await response.json();
      setRadioData(data);
    }
    fetchData();
  }, []);

  const filteredRadiosMenu = radioData.filter((radio) =>
    radio.name.toLowerCase().includes(searchQueryMenu.toLowerCase())
  );

  const filteredFavoriteRadios = favoriteRadios.filter((radio) =>
    radio.name.toLowerCase().includes(searchQueryMain.toLowerCase())
  );

  const handleEditRadio = (radio) => {
    setEditingRadio(radio);
  };

  const handleSaveRadio = (editedRadio) => {
    setEditingRadio(null);
  };

  const handleCancelEdit = () => {
    setEditingRadio(null);
  };

  const handlePlayPause = (radio) => {
    if (playingRadio && playingRadio.stationuuid === radio.stationuuid) {
      audioRef.current.pause();
      setPlayingRadio(null);
    } else {
      audioRef.current.src = radio.url;
      audioRef.current.play();
      setPlayingRadio(radio);
    }
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPlayingRadio(null);
  };

  const handleDeleteRadio = (radio) => {
    setFavoriteRadios(
      favoriteRadios.filter(
        (favRadio) => favRadio.stationuuid !== radio.stationuuid
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <nav className="bg-white shadow">
        <MenuHamburguer
          radioData={filteredRadiosMenu}
          favoriteRadios={favoriteRadios}
          setFavoriteRadios={setFavoriteRadios}
          searchQueryMenu={searchQueryMenu}
          setSearchQueryMenu={setSearchQueryMenu}
        />
      </nav>
      <main className="container mx-auto p-4 pl-20">
        <RadioFavs
          filteredFavoriteRadios={filteredFavoriteRadios}
          searchQueryMain={searchQueryMain}
          setSearchQueryMain={setSearchQueryMain}
          playingRadio={playingRadio}
          handleStop={handleStop}
          handlePlayPause={handlePlayPause}
          handleEditRadio={handleEditRadio}
          handleDeleteRadio={handleDeleteRadio}
        />
      </main>
      <audio ref={audioRef}></audio>
      {editingRadio && (
        <RadioEditModal
          radio={editingRadio}
          onSave={handleSaveRadio}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default App;
