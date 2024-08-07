import React from 'react'

const TransactionsHistoyMuestra = () => {
  return (
    <div className="card">
      <div className="card-header">
      <h3 className="card-title">Transacciones</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
  {/* /.card-header */}
  <div className="card-body" style={{display: 'block'}}>
  <div className="tab-pane" id="timeline">
                {/* The timeline */}
                <div className="timeline timeline-inverse">
                    <div>
                    <i className="fas fa-plus bg-success" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> 10 Feb. 2014</span>
                      <h3 className="timeline-header"><a href="#">  Deposito sub Agente</a></h3>
                      <div className="timeline-body">
                  
                        Se hizo un deposito vía oxxo tiket #454654
                        <br/>
                        <b>
                        <span style={{fontWeight:"500"}}> Monto: </span> 5,000.00
                        </b>
                      </div>
                      <div className="timeline-footer">
                      </div>
                    </div>
                  </div>
                  {/* END timeline item */}

                  <div>
                    <i className="fas fa-minus bg-danger" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> 11 Feb. 2014</span>
                      <h3 className="timeline-header"><a href="#"> Seguidores de prueba NO VENTA</a></h3>
                      <div className="timeline-body">
                  
                      Servicios de prueba instagram no garantizado, solo prueba
                        <br/>
                        <b>
                        <span style={{fontWeight:"500"}}> Monto: </span> 1,000.00
                        </b>
                      </div>
                      <div className="timeline-footer">
                      </div>
                    </div>
                  </div>

                  <div>
                    <i className="far fa-clock bg-gray" />
                  </div>
                </div>
              </div>
  </div>
  <div className="card-footer p-0" style={{display: 'block'}}>

  </div>
  {/* /.footer */}
</div>
  )
}

export default TransactionsHistoyMuestra