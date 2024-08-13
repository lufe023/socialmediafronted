import React from 'react'
import { Link } from 'react-router-dom'

const OrderTable = ({orders}) => {
  return (
    <div className="card">
  <div className="card-header border-transparent bg-dark">
    <h3 className="card-title">Últimas ordenes</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  <div className="card-body p-0" style={{display: 'block'}}>
    <div className="table-responsive">
      <table className="table m-0">
        <thead>
          <tr>
            <th>Red</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Inició</th>
          </tr>
        </thead>
        <tbody>
            {orders.map((order, idx) => (
          <tr key={idx}>
            <td>
                <Link href="#">{order.serviceDetails.parentCategory}</Link>
                </td>
            <td>{order.serviceDetails.name}</td>
            <td><span className="badge badge-success">{order.externalStatus}</span></td>
            <td>
              <div className="sparkbar" data-color="#00a65a" data-height={20}>{order.startCount}</div>
            </td>
          </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  <div className="card-footer clearfix" style={{display: 'block'}}>
    
  </div>
</div>

  )
}

export default OrderTable