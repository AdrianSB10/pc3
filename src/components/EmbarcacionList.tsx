
import React from 'react';
import { Embarcacion } from '../types';

interface EmbarcacionListProps {
  embarcaciones: Embarcacion[];
  onEdit: (embarcacion: Embarcacion) => void;
  onDelete: (id: number) => void;
}

const EmbarcacionList: React.FC<EmbarcacionListProps> = ({ embarcaciones, onEdit, onDelete }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-center mb-4">Lista de Embarcaciones</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Capacidad</th>
                <th>Descripción</th>
                <th>Fecha Programada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {embarcaciones.map((embarcacion) => (
                <tr key={embarcacion.id}>
                  <td>{embarcacion.nombre}</td>
                  <td>{embarcacion.capacidad}</td>
                  <td>{embarcacion.descripcion}</td>
                  <td>{embarcacion.fechaProgramada}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(embarcacion)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(embarcacion.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmbarcacionList;