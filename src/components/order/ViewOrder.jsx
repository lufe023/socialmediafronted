import React from 'react'
import NavBar from '../AppLayout/NavBar'
import Aside from '../AppLayout/Aside'
import ContentPath from '../AppLayout/ContentPath'

const ViewOrder = () => {
  return (
    <>
       <div className="wrapper control-sidebar-slide-open">
    <NavBar/>
    <Aside/>
    <div className="content-wrapper">
    <ContentPath PageName={'Factura'}/>
   <section className="content">
  <div className="container-fluid">
    <div className="row">
      <div className="col-12">
      <div className="callout callout-info">
  <h5><i className="fas fa-info-circle" /> Nota:</h5>
  Por favor, evita imprimir esta factura para ayudar a proteger el medio ambiente.
</div>

        <div className="invoice p-3 mb-3">
          <div className="row">
            <div className="col-12">
              <h4>
                <i className="fas fa-globe" /> Necio Corporation.
                <small className="float-right">Fecha: 2/10/2024</small>
              </h4>
            </div>
          </div>
          <div className="row invoice-info">
            <div className="col-sm-4 invoice-col">
              Emisor
              <address>
                <strong>Necio, Inc.</strong><br />
                795 Folsom Ave, Suite 600<br />
                San Francisco, CA 94107<br />
                Phone: (804) 123-5432<br />
                Email: elnecio@gmail.com
              </address>
            </div>
            <div className="col-sm-4 invoice-col">
              En favor de
              <address>
                <strong>Oscar Mier</strong><br />
                795 Folsom Ave, Suite 600<br />
                San Francisco, CA 94107<br />
                Phone: (555) 539-1037<br />
                Email: john.doe@example.com
              </address>
            </div>
           
          </div>
          <div className="row">
            <div className="col-12 table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Categoría</th>
                    <th>Description</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Instagram</td>
                    <td>Instagram Followers | Stable | Speed: +100K/Day | Refill Button: 1 Year | MAX 5M  ♻️ ⛔</td>
                    <td>$64.50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p className="lead">Payment Methods:</p>
              <img src="../../dist/img/credit/visa.png" alt="Visa" />
              <img src="../../dist/img/credit/mastercard.png" alt="Mastercard" />
              <img src="../../dist/img/credit/american-express.png" alt="American Express" />
              <img src="../../dist/img/credit/paypal2.png" alt="Paypal" />
             
            </div>
            <div className="col-6">
              
              <div className="table-responsive">
                <table className="table">
                  <tbody><tr>
                      <th style={{width: '50%'}}>Subtotal:</th>
                      <td>$64.50</td>
                    </tr>
                   
                   
                    <tr>
                      <th>Total:</th>
                      <td>$64.50</td>
                    </tr>
                  </tbody></table>
              </div>
            </div>
          </div>
          <div className="row no-print">
            <div className="col-12">
              <button type="button" className="btn btn-dark float-right">
              <i className="fas fa-print" /> Imprimir
              </button>
              <button type="button" className="btn btn-primary float-right" style={{marginRight: 5}}>
                <i className="fas fa-download" /> Generar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
</div>
    </>
  )
}

export default ViewOrder