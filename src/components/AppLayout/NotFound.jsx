import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="wrapper">


  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper" style={{marginLeft:"0px", height:"100vh"}}>
    {/* Content Header (Page header) */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>404 Error Page</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><Link to='/'>Inicio</Link></li>
              <li className="breadcrumb-item active">404 Error Page</li>
            </ol>
          </div>
        </div>
      </div>{/* /.container-fluid */}
    </section>
    {/* Main content */}
    <section className="content" style={{ alignContent:"center", minHeight:"90vh"}}>
      <div className="error-page" > 
        <h2 className="headline text-warning"> 404</h2>
        <div className="error-content">
          <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! no he encontrado esta pagina</h3>
          <p>
          No pudimos encontrar la página que estabas buscando. Mientras tanto, puede regresar al <Link to='/dashboard'>Dashboard</Link>
          </p>
     
        </div>
        {/* /.error-content */}
      </div>
      {/* /.error-page */}
    </section>
    {/* /.content */}
  </div>
  {/* /.content-wrapper */}
  
  {/* Control Sidebar */}
  
</div>

  )
}

export default NotFound