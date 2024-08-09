import React, { useState } from 'react';
import OrderCard from './OrderCard';

const TransactionsHistory = ({ transactions = [] }) => {
  const [allCollapsed, setAllCollapsed] = useState(true);

  const sortedTransactions = transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const toggleAll = () => {
    setAllCollapsed(!allCollapsed);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Historia de Transacciones</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" onClick={toggleAll}>
            <i className={`fas fa-${allCollapsed ? 'layer-group' : 'layer-group'}`}></i> 
          </button>
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
            {sortedTransactions.map((transaction, idx) => (
              <OrderCard key={idx} transaction={transaction} allCollapsed={allCollapsed} />
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
