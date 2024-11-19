import React, { useEffect, useState } from 'react';
import EmbarcacionForm from './components/EmbarcacionForm';
import EmbarcacionList from './components/EmbarcacionList';
import { Embarcacion } from './types';
import './App.css';

const App: React.FC = () => {
  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
  const [currentEmbarcacion, setCurrentEmbarcacion] = useState<Embarcacion | null>(null);

  useEffect(() => {
    fetch('/api/embarcaciones')
      .then(response => response.json())
      .then(data => setEmbarcaciones(data));
  }, []);

  const addEmbarcacion = (embarcacion: Omit<Embarcacion, 'id'>) => {
    fetch('/api/embarcaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(embarcacion),
    })
      .then(response => response.json())
      .then(newEmbarcacion => setEmbarcaciones([...embarcaciones, newEmbarcacion]));
  };

  const updateEmbarcacion = (embarcacion: Embarcacion) => {
    fetch(`/api/embarcaciones/${embarcacion.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(embarcacion),
    })
      .then(response => response.json())
      .then(updatedEmbarcacion => {
        setEmbarcaciones(embarcaciones.map(e => (e.id === updatedEmbarcacion.id ? updatedEmbarcacion : e)));
        setCurrentEmbarcacion(null);
      });
  };

  const deleteEmbarcacion = (id: number) => {
    fetch(`/api/embarcaciones/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setEmbarcaciones(embarcaciones.filter(embarcacion => embarcacion.id !== id));
    });
  };

  const editEmbarcacion = (embarcacion: Embarcacion) => {
    setCurrentEmbarcacion(embarcacion);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Embarcaciones</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <EmbarcacionForm onAddEmbarcacion={addEmbarcacion} onUpdateEmbarcacion={updateEmbarcacion} currentEmbarcacion={currentEmbarcacion} />
        </div>
        <div className="col-md-6">
          <EmbarcacionList embarcaciones={embarcaciones} onEdit={editEmbarcacion} onDelete={deleteEmbarcacion} />
        </div>
      </div>
    </div>
  );
};

export default App;