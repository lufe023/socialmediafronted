import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const PurchaseSimulator = ({ service, userFunds }) => {
    const [quantity, setQuantity] = useState(1);
    const [link, setLink] = useState('');
    const [totalCost, setTotalCost] = useState(service.price);

    useEffect(() => {
        if (service.price && quantity > 0) {
            const calculatedPrice = service.price * quantity;
            setTotalCost(calculatedPrice);
        } else {
            setTotalCost(0);
        }
    }, [service.price, quantity]);

    const handlePurchase = () => {
        if (quantity <= 0 || !link.trim()) {
            Swal.fire('Error', 'Por favor, ingrese una cantidad válida y un enlace.', 'error');
            return;
        }

        if (totalCost > userFunds) {
            Swal.fire('Fondos insuficientes', 'No tiene suficientes fondos para realizar esta compra.', 'error');
            return;
        }

        // Aquí iría la lógica para procesar la compra
        Swal.fire('Compra realizada', 'Su compra se ha procesado exitosamente.', 'success');
    };

    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Simulador de Compra</h3>
            </div>
            <div className="card-body">
                <p><strong>Categoría:</strong> {service.parentCategory.name}</p>
                <p><strong>Servicio:</strong> {service.name}</p>
                <p><strong>Precio por unidad:</strong> ${service.price}</p>
                <div className="form-group">
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                    />
                </div>
                <div className="form-group">
                    <label>Enlace:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Ingrese el enlace"
                    />
                </div>
                <p><strong>Costo total:</strong> ${totalCost}</p>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary" onClick={handlePurchase}>Comprar</button>
            </div>
        </div>
    );
};

export default PurchaseSimulator;
