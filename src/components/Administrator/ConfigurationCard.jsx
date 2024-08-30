import React, { useState, useEffect } from "react";
import axios from "axios";
import getConfig from "../utils/getConfig";
import Spinner from "../utils/Spiner";
import Swal from "sweetalert2";


const ConfigurationCard = () => {
    const [configuration, setConfiguration] = useState({
        siteTitle: "",
        multiplier: 1,
    });
    const [isLoading, setIsLoading] = useState(true);
    const configId = "3e8d5742-350e-42c8-9563-2838920f64a3";
    const API_URL = `${import.meta.env.VITE_API_SERVER}/api/v1/configurations/${configId}`;

    useEffect(() => {
        const fetchConfiguration = () => {
            axios
                .get(API_URL, getConfig())
                .then((res) => {
                    setConfiguration(res.data);
                    setIsLoading(false);
                })
                .catch((err) => console.log(err));
        };

        fetchConfiguration();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfiguration({
            ...configuration,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(API_URL, configuration, getConfig())
            .then((res) => {
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
                    title: `Configuración Guardada con éxito`
                  })
                setIsLoading(false)
            })
            .catch((err) => {console.log(err)
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
                    icon: 'error',
                    title: `La Configuración no pudo guardarse`
                  })
                setIsLoading(false)
            });
    };

    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Configuración</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="card-body">
                    {isLoading ? (
                        <div><Spinner/>Cargando</div>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="siteTitle">Site Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="siteTitle"
                                    name="siteTitle"
                                    value={configuration.siteTitle}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="multiplier">Multiplicador</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="multiplier"
                                    name="multiplier"
                                    value={configuration.multiplier}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    required
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="card-footer">
                    <button type="submit" onClick={()=>setIsLoading(true)} className="btn btn-primary">
                        Update Configuration
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConfigurationCard;
