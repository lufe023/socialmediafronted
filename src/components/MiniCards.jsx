import React from 'react';

const MiniCards = ({ orders }) => {

  // Filtra las órdenes según su estado
  const inProgressOrders = orders.filter(order => order.externalStatus === 'In progress').length;
  const completedOrders = orders.filter(order => order.externalStatus === 'Completed').length;
  const partialOrders = orders.filter(order => order.externalStatus === 'Pending').length;
  const canceledOrders = orders.filter(order => order.externalStatus === 'Canceled').length;
  return (
    <>
  <div className="row">
  <div className="col-12 col-sm-6 col-md-3">
    <div className="info-box">
      <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog" /></span>
      <div className="info-box-content">
        <span className="info-box-text">En Progreso</span>
        <span className="info-box-number">
        {inProgressOrders}
        </span>
      </div>
    </div>
  </div>
  <div className="col-12 col-sm-6 col-md-3">
    <div className="info-box mb-3">
      <span className="info-box-icon bg-success elevation-1"><i className="fas fa-thumbs-up" /></span>
      <div className="info-box-content">
        <span className="info-box-text">Completadas</span>
        <span className="info-box-number">{completedOrders}</span>
      </div>
    </div>
  </div>
  <div className="clearfix hidden-md-up" />
  <div className="col-12 col-sm-6 col-md-3">
    <div className="info-box mb-3">
      <span className="info-box-icon bg-warning elevation-1">
        {/* <i className="fas fa-shopping-cart" /> */}
        {/* <i className="fas fa-truck-loading" /> */}
        <i className="fas fa-spinner" />


        </span>
      <div className="info-box-content">
        <span className="info-box-text">Pendiente</span>
        <span className="info-box-number">{partialOrders}</span>
      </div>
    </div>
  </div>
  <div className="col-12 col-sm-6 col-md-3">
    <div className="info-box mb-3">
      <span className="info-box-icon bg-danger elevation-1">
      
        <i className="fas fa-ban" />
        </span>
      <div className="info-box-content">
        <span className="info-box-text">Canceladas</span>
        <span className="info-box-number">{canceledOrders}</span>
      </div>
    </div>
  </div>
</div>

  
    </>
  );
};

export default MiniCards;


{/* <div className="row">
<div className="col-lg-3 col-6">
  
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

<div className="col-lg-3 col-6">

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

<div className="col-lg-3 col-6">

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

<div className="col-lg-3 col-6">

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

</div> */}