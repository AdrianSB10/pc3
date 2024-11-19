
import React, { useState, useEffect } from 'react';
import { Embarcacion } from '../types';

interface EmbarcacionFormProps {
  onAddEmbarcacion: (embarcacion: Omit<Embarcacion, 'id'>) => void;
  onUpdateEmbarcacion: (embarcacion: Embarcacion) => void;
  currentEmbarcacion: Embarcacion | null;
}

const EmbarcacionForm: React.FC<EmbarcacionFormProps> = ({ onAddEmbarcacion, onUpdateEmbarcacion, currentEmbarcacion }) => {
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaProgramada, setFechaProgramada] = useState('');

  useEffect(() => {
    if (currentEmbarcacion) {
      setNombre(currentEmbarcacion.nombre);
      setCapacidad(currentEmbarcacion.capacidad.toString());
      setDescripcion(currentEmbarcacion.descripcion);
      setFechaProgramada(currentEmbarcacion.fechaProgramada);
    }
  }, [currentEmbarcacion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const capacidadNumber = parseFloat(capacidad);
    if (currentEmbarcacion) {
      onUpdateEmbarcacion({ id: currentEmbarcacion.id, nombre, capacidad: capacidadNumber, descripcion, fechaProgramada });
    } else {
      onAddEmbarcacion({ nombre, capacidad: capacidadNumber, descripcion, fechaProgramada });
    }
    setNombre('');
    setCapacidad('');
    setDescripcion('');
    setFechaProgramada('');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h3 className="card-title mb-4">{currentEmbarcacion ? 'Actualizar Embarcación' : 'Agregar Embarcación'}</h3>
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Capacidad:</label>
        <input
          type="text"
          className="form-control"
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción:</label>
        <input
          type="text"
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha Programada:</label>
        <input
          type="date"
          className="form-control"
          value={fechaProgramada}
          onChange={(e) => setFechaProgramada(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {currentEmbarcacion ? 'Actualizar Embarcación' : 'Agregar Embarcación'}
      </button>
    </form>
  );
};

export default EmbarcacionForm;