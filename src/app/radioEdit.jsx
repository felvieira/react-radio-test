import React, { useState } from 'react';

const RadioEditModal = ({ radio, onSave, onCancel }) => {
  const [editedRadio, setEditedRadio] = useState(radio);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedRadio((prevRadio) => ({
      ...prevRadio,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedRadio);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div
      className="absolute w-full h-screen flex items-center justify-center z-50 bg-black bg-opacity-50"
      style={{ backgroundColor: '#0000006b' }}
    >
      <div className="bg-white rounded shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4">Editar Rádio</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome:
            </label>
            <input
              type="text"
              name="name"
              value={editedRadio.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              País:
            </label>
            <input
              type="text"
              name="country"
              value={editedRadio.country}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Votos:
            </label>
            <input
              type="number"
              name="votes"
              value={editedRadio.votes}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Homepage:
            </label>
            <input
              type="text"
              name="homepage"
              value={editedRadio.homepage}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RadioEditModal;
