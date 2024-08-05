import React from 'react';
import copy from 'clipboard-copy';
import Swal from 'sweetalert2';

const ServiceOrderCard = ({ order }) => {
    const iconMap = {
        Instagram: 'fab fa-instagram',
        Facebook: 'fab fa-facebook',
        Twitter: 'fab fa-twitter',
        // Añade más mapeos de iconos según sea necesario
    };

    const getColorClass = (status) => {

        switch (status) {
            case 'Completed':
                return 'bg-primary';
            case 'Pending':
                return 'bg-warning';
            case 'Failed':
                return 'bg-danger';
            case 'In progress':
                return 'bg-info';
            default:
                return 'bg-secundary';
        }
    };

    const copiarUrlLink = () => {
        copy(order.link)
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

    return  (
        <div className="col-sm-6 col-12">
            <div className="card card-widget widget-user-2 shadow-sm">
                <div className={`widget-user-header ${getColorClass(order.externalStatus)}`}>
                    <div className="widget-user-image" style={{ display: 'flex', alignItems: 'center' }}>
                        <i className={`${iconMap[order.serviceDetails.parentCategory] || 'fas fa-info'}`} style={{ fontSize: '40px', marginRight: '10px' }}></i>
                        <p className="widget-user-desc" style={{ fontSize: '16px', margin: 0 }}>{order.serviceDetails.name}</p>
                        
                    </div>
                </div>
                
                <div className="card-footer p-0">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                            <span className="nav-link">
                                Link: <span className="float-right badge">
                                    <a href={order.link}><i className="fas fa-link"></i></a>
                                   
                                    <i className="far fa-copy" style={{marginLeft:"10px"}} onClick={()=>copiarUrlLink()} />
                                

                                </span>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                Estado: <span className="float-right badge">{order.externalStatus}</span>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                Costo Total: <span className="float-right badge">{order.totalCost.toFixed(2)}</span>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                La cuenta inició en: <span className="float-right badge">{order.startCount}</span>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                Quedan: <span className="float-right badge">{order.remains}</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ServiceOrderCard;
