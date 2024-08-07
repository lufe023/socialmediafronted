import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../../utils/getConfig";
import getHistoryTransactions from './getHistoryTransactions'

const FundTransactionForm = ({ userId, getPeople, setTransactions }) => {
  const [formData, setFormData] = useState({
    userId: userId,
    amount: "",
    type: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Evita el envío múltiple

    setIsSubmitting(true); // Indica que la solicitud está en curso

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/transactions`, formData, getConfig());
      
      // Usar SweetAlert2 para mostrar la alerta de éxito
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Transacción creada exitosamente",
      });
     getPeople()
     getHistoryTransactions(userId, setTransactions)
      // Limpiar el formulario
      setFormData({
        userId: userId, // Asegúrate de restaurar el userId
        amount: "",
        type: "",
        description: "",
      });

    } catch (error) {
      console.error("Error al crear la transacción", error);

      // Usar SweetAlert2 para mostrar la alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error al crear la transacción",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false); // Rehabilita el formulario para enviar otra solicitud
    }
  };

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Crear Transacción de Fondos</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="type">Tipo</label>
            <select
              className="form-control"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="deposit">Transferencia Bancaria</option>
              <option value="deposit">Depósito en sub Agente</option>
              <option value="refund">Reembolso</option>
              
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Cantidad</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FundTransactionForm;
