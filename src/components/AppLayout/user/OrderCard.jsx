import React from 'react'

const OrderCard = ({transaction}) => {
  return (
    <div key={transaction.id}>
                <i className={`fas fa-${transaction.type === 'Ingreso' ? 'plus' : 'minus'} bg-${transaction.type === 'Ingreso' ? 'success' : 'info'}`} />
             
<div className="card collapsed-card" style={{marginLeft:"60px"}}>
  <div className="card-header">
  <h3 className="card-title"><a href="#">{transaction.type}</a></h3>
  

    <div className="card-tools">
    <span className="badge badge-info"> {transaction.amount}</span>
   
    <span className="time badge">
        
       {new Date(transaction.createdAt).toLocaleDateString()}</span>
       <button type="button" className="btn btn-tool" data-card-widget="collapse">
  <i className="fas fa-plus" />
</button>

     
    </div>
  </div>
  <div className="card-body p-3">
    <ul className="products-list product-list-in-card pl-2 pr-2">
      <li className="item">
        <div className="product-img">
        {transaction.link}
          
        </div>
        <div className="product-info" style={{marginLeft:"0"}}>
          <a  className="product-title">{transaction.typeDetail}
            <span className="badge badge-info float-right">{transaction.amount}</span></a>
          <span className="product-description" style={{whiteSpace:"wrap"}}>
          {transaction.description}
          </span>
        </div>
      </li>

    </ul>
  </div>
  <div className="card-footer text-center">
    <a href="javascript:void(0)" className="uppercase">Ver Comprobante</a>
  </div>
</div>
</div>


  )
}

export default OrderCard