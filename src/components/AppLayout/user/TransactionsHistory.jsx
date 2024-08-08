import React from 'react';
import OrderCard from './OrderCard';

const TransactionsHistory = ({ transactions = [] }) => {
  // Ordenar las transacciones por fecha en orden descendente (más reciente primero)
  const sortedTransactions = transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Historia de Transacciones</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="card-body" style={{ display: 'block' }}>
        <div className="tab-pane" id="timeline">
          <div className="timeline timeline-inverse">
            {console.log(sortedTransactions)}
            {sortedTransactions.map(transaction => (
             <OrderCard transaction={transaction}/>
            ))}
            <div>
              <i className="far fa-clock bg-gray" />
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer p-0" style={{ display: 'block' }}>
      </div>
    </div>
  );
};

export default TransactionsHistory;
