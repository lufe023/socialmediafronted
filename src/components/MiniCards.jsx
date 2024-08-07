import React from 'react';

const MiniCards = ({ orders }) => {
  // Filtra las órdenes según su estado
  const inProgressOrders = orders.filter(order => order.externalStatus === 'In Progress').length;
  const completedOrders = orders.filter(order => order.externalStatus === 'Completed').length;
  const partialOrders = orders.filter(order => order.externalStatus === 'Partial').length;
  const canceledOrders = orders.filter(order => order.externalStatus === 'Canceled').length;
  return (
    <div className="row">
      <div className="col-lg-3 col-6">
        {/* small box */}
        <div className="small-box bg-info">
          <div className="inner">
            <h3>{inProgressOrders}</h3>
            <p> En Progreso</p>
          </div>
          <div className="icon">
            <i className="ion ion-bag" />
          </div>
          <a className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
        </div>
      </div>
      {/* ./col */}
      <div className="col-lg-3 col-6">
        {/* small box */}
        <div className="small-box bg-success">
          <div className="inner">
            <h3>{completedOrders}</h3>
            <p> Completadas</p>
          </div>
          <div className="icon">
            <i className="ion ion-stats-bars" />
          </div>
          <a  className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
        </div>
      </div>
      {/* ./col */}
      <div className="col-lg-3 col-6">
        {/* small box */}
        <div className="small-box bg-warning">
          <div className="inner">
            <h3>{partialOrders}</h3>
            <p> Parciales</p>
          </div>
          <div className="icon">
            <i className="ion ion-person-add" />
          </div>
          <a  className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
        </div>
      </div>
      {/* ./col */}
      <div className="col-lg-3 col-6">
        {/* small box */}
        <div className="small-box bg-danger">
          <div className="inner">
            <h3>{canceledOrders}</h3>
            <p> Canceladas</p>
          </div>
          <div className="icon">
            <i className="ion ion-pie-graph" />
          </div>
          <a  className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
        </div>
      </div>
      {/* ./col */}
    </div>
  );
};

export default MiniCards;
