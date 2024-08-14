import React from 'react'

const Advertisement = () => {
  return (
    <div className="alert alert-info alert-dismissible">
  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i className="icon fas fa-info" /> Link</h5>
  El campo link se refiere a adonde a punta tu servicio, si quieres likes en tu post pues ahí va el link de ese post.
  <br />
  En Cambio si lo que quieres son likes en un perfil pues el link seria el link de ese perfil.
</div>

  )
}

export default Advertisement