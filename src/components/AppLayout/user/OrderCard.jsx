import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({ transaction, allCollapsed }) => {
  const [collapsed, setCollapsed] = useState(allCollapsed);

  // Actualiza el estado colapsado cuando cambia `allCollapsed`
  useEffect(() => {
    setCollapsed(allCollapsed);
  }, [allCollapsed]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div key={transaction.id}>
      <i className={`fas fa-${transaction.type === 'Ingreso' ? 'plus' : 'minus'} bg-${transaction.type === 'Ingreso' ? 'success' : 'info'}`} />

      <div className="card" style={{ marginLeft: "60px" }}>
        <div className="card-header" onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
          <h3 className="card-title">
            <a href="#">{transaction.type}</a>
          </h3>

          <div className="card-tools">
            <span className="badge badge-info">{transaction.amount}</span>
            <span className="time badge">
              {new Date(transaction.createdAt).toLocaleDateString()}
            </span>
            <button type="button" className="btn btn-tool" onClick={e => { e.stopPropagation(); toggleCollapse(); }}>
              <i className={`fas fa-${collapsed ? 'plus' : 'minus'}`} />
            </button>
          </div>
        </div>

        <div
          className="card-body"
          style={{
            padding: '0',
            height: collapsed ? '0' : 'auto',
            overflow: 'hidden',
            opacity: collapsed ? 0 : 1,
            transition: 'height 0.3s ease, opacity 0.3s ease'
          }}
        >
          <ul className="products-list product-list-in-card pl-4 pr-4">
            <li className="item">
              <div className="product-img">
                {transaction.link}
              </div>
              <div className="product-info" style={{ marginLeft: "0" }}>
                <a className="product-title">{transaction.typeDetail}
                  <span className="badge badge-info float-right">{transaction.amount}</span></a>
                <span className="product-description" style={{ whiteSpace: "wrap" }}>
                  {transaction.description}
                </span>
              </div>
            </li>
          </ul>
          <div className="card-footer text-center">
            {transaction.type === 'Ingreso' ? '' :
              <Link to={`/orders/${transaction.id}`} className="uppercase">Ver Comprobante</Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
