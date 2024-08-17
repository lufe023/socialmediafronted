import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import getConfig from '../utils/getConfig';


const LookUser = () => {
    const [results, setResults] = useState([])

    const findPeople = (findWord)=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/userSearch`
            axios.post(URL,
                {
                    findUser:findWord  
                },
            getConfig(),
            )
            .then(res => {
                setResults(res.data.data.rows)
        })
        .catch(err =>{
            setResults([])
            console.log(err)
        })
        }

const findingWord = e => {
    const fn = e.target.value.trim()

    if(fn!=''){
      findPeople(fn)
}else{
  setResults([])
}
}
return (
<div className="card">
  <div className="card-body">
<div className='col-12'>
<div className="form-group" >
<h4>Encontrar un usuario</h4>

  <div className="form-group">
  <input autoComplete='off' type="text" className="form-control" id="exampleInputEmail1" placeholder="Nombre, apellido, telefono o email" onChange={findingWord}/>
</div>
</div>
<div  className='card-footer card-comments'>
    {
        results?.map(user=>
         
                <div  key={user?.id} className="card-comment">
                <img className="img-circle img-sm" src={user?.picture ? user.picture : "/img/noprofilepic.jpg"} alt="User Image" />
                <div className="comment-text">
                
                    <span className="username">
                    <Link to={`/administrator/user/${user?.id}`}> {user?.firstName} {user?.lastName}</Link>
                    <span className="text-muted float-right">{user?.user_role.roleName}</span>
                    </span>
                    {user?.email} {user.active?<button className='btn btn-success btn-xs'>Activado</button>:<button className='btn btn-danger btn-xs'>Desactivado</button>}
                </div>
                </div>
)
}
</div>
    </div>
    </div>
    </div>
  )
}

export default LookUser