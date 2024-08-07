import React from 'react';

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
            {sortedTransactions.map(transaction => (
              <div key={transaction.id}>
                <i className={`fas fa-${transaction.type === 'Ingreso' ? 'plus' : 'minus'} bg-${transaction.type === 'Ingreso' ? 'success' : 'danger'}`} />
                <div className="timeline-item">
                  <span className="time"><i className="far fa-clock" /> {new Date(transaction.createdAt).toLocaleDateString()}</span>
                  <h3 className="timeline-header"><a href="#">{transaction.description}</a></h3>
                  <div className="timeline-body">
                    {transaction.description}
                    <br />
                    <b>
                      <span style={{ fontWeight: "500" }}> Monto: </span> {transaction.amount}
                    </b>
                  </div>
                  <div className="timeline-footer"></div>
                </div>
              </div>
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
