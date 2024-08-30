import React from 'react'
import copy from 'clipboard-copy';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'

const OrderTable = ({orders}) => {
  const iconMap = {
    Facebook: 'fab fa-facebook',
    Instagram: 'fab fa-instagram',
    Twitter: 'fab fa-twitter',
    LinkedIn: 'fab fa-linkedin',
    TikTok: 'fab fa-tiktok',
    Spotify: 'fab fa-spotify',
    Pinterest: 'fab fa-pinterest',
    SoundCloud: 'fab fa-soundcloud',
    // Agrega más iconos según sea necesario
};

  const copiarUrlLink = (linkTocopy) => {
    copy(linkTocopy)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'URL copiada al porta papeles'
        })
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles: ', err);
      });
  };

  return (
    <div className="card">
  <div className="card-header border-transparent bg-dark">
    <h3 className="card-title">Últimas ordenes</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
    </div>
  </div>
  <div className="card-body p-0" style={{display: 'block'}}>
    <div className="table-responsive " style={{height: "490px"}}>
      <table className="table m-0  table-head-fixed ">
        <thead>
          <tr>
            <th>Servicio</th>
            <th style={{minWidth:"200px"}}>Detalles </th>
            
            <th style={{minWidth:"170px"}}>Opciones</th>
          </tr>
        </thead>
        <tbody>
            {orders.map((order, idx) => (
          <tr key={idx}>
            <td>
              {order.serviceDescription}
              </td>
            <td>
              <ul>
                <li>
                Estado: {order.externalStatus}
                </li>
                <li>
                Costo Total: {order.customerPrice.toFixed(5)}
                </li>
                <li>
                  Inició en: <span> {order.startCount} </span>
                </li>
                <li>Cantidad: {order.quantity}</li>
              </ul>
            
            </td>
            <td>
    <div className="btn-group-vertical">
  <a type="button" target='blank' href={order.link} className="btn btn-default" style={{textAlign:"left"}}><i className="fas fa-link"></i> Ir al Link</a>
  <button style={{textAlign:"left"}} type="button" className="btn btn-default" onClick={()=>copiarUrlLink(order.link)}><i className="far fa-copy"/> Copiar Link</button>
  {/* <Link 
  style={{textAlign:"left", minWidth:"130px"}}
    to={`/service/buying/${order.serviceId}?url=${encodeURIComponent(order.link)}&cantidad=${order.quantity}`} 
    className="btn btn-default">
    <i className="fas fa-shopping-cart" /> Recontratar
</Link> */}
</div>


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