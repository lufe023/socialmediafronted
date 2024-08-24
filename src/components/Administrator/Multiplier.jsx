import React, { useEffect, useState } from "react";
import "./Slider.css"; // Asegúrate de crear este archivo CSS
import axios from "axios";
import getConfig from "../utils/getConfig";
import Swal from "sweetalert2"; // Si usas SweetAlert2 para notificaciones

const Slider = ({ min, max, step, value, onChange }) => {
  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider"
      />
      <div className="slider-value">{value}%</div>
    </div>
  );
};

const Multiplier = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groupedServices, setGroupedServices] = useState({});
  const [selectedServices, setSelectedServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/categories`;
    axios
      .get(URL, getConfig())
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error cargando las categorías:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al cargar las categorías.",
          "error"
        );
      });
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const promises = categories.map((category) => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/admin/category/${category}`;
        return axios.get(URL, getConfig());
      });

      try {
        const servicesData = await Promise.all(promises);
        const services = servicesData.map((res, index) => ({
          category: categories[index],
          services: res.data,
        }));
        setServices(services);

        // Agrupar servicios por categoría
        const grouped = {};
        services.forEach(({ category, services }) => {
          grouped[category] = services;
        });
        setGroupedServices(grouped);
        setAvailableServices(servicesData.flatMap((res) => res.data));
      } catch (error) {
        console.error("Error cargando los servicios:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al cargar los servicios.",
          "error"
        );
      }
    };

    if (categories.length > 0) {
      fetchServices();
    }
  }, [categories]);

  const handleSelectService = (service) => {
    setAvailableServices(availableServices.filter((s) => s !== service));
    setSelectedServices([
      ...selectedServices,
      { ...service, isPublished: service.published }
    ]);
  };

  const handleDeselectService = (service) => {
    setSelectedServices(selectedServices.filter((s) => s !== service));
    setAvailableServices([...availableServices, service]);
  };

  const handleSelectAll = () => {
    setSelectedServices([
      ...selectedServices,
      ...availableServices.map(s => ({ ...s, isPublished: s.published }))
    ]);
    setAvailableServices([]);
  };

  const handleDeselectAll = () => {
    setAvailableServices([
      ...availableServices,
      ...selectedServices.map(s => ({ ...s, isPublished: s.published }))
    ]);
    setSelectedServices([]);
  };

  const handleTogglePublished = (service) => {
    const updatedServices = selectedServices.map(s =>
      s.id === service.id ? { ...s, isPublished: !s.isPublished } : s
    );
    setSelectedServices(updatedServices);
  };

  const handleGroupTogglePublished = () => {
    const updatedServices = selectedServices.map(service => ({
      ...service,
      isPublished: published
    }));
    setSelectedServices(updatedServices);
    setPublished(!published);
  };

  const handleSubmit = async () => {
    const updatedServices = selectedServices.map(service => ({
      id: service.id,
      service: service.service,
      name: service.name,
      type: service.type,
      description: service.description,
      price: service.jqawPrice * (1 + sliderValue / 100),
      published: service.isPublished
    }));
    
    try {
      const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/edit/group`;
      const response = await axios.patch(URL, { updatedServices }, getConfig());

      Swal.fire("Éxito", "Servicios actualizados correctamente.", "success");
    } catch (error) {
      console.error('Error:', error.response.data);
      Swal.fire("Error", "Hubo un problema al actualizar los servicios.", "error");
    }
  };
  
  

  return (
    <div className="container">
      <div className="card card-warning">
        <div className="card-header">
          <h3 className="card-title">Multiplicador de Servicios</h3>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="alert alert-info alert-dismissible">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button>
                <h5>
                  <i className="icon fas fa-info" /> Importante!
                </h5>
                <p>
                  1. Este multiplicador funciona sumándole el porcentaje
                  seleccionado a los precios base.
                </p>
                <p>
                  2. Este multiplicador toma como referencia el precio base que
                  tienen los servicios en <b>jqaw.org</b>, es decir si en
                  jqaw.org el servicio <i>
                    <b>Seguidores de Instagram</b>
                  </i>{" "}
                  vale 1USD pero en la plataforma el servicio shop vale 5USD y
                  usted multiplica por 10%, el servicio <i>
                    <b>Seguidores de Instagram</b>
                  </i>{" "}
                  valdrá 1.1USD.
                </p>
                <p>
                  3. Este multiplicador también publica o despublica los
                  servicios en la parte de activador, como es una función grupal
                  se aplicarán los cambios a todos los seleccionados.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <h5>Servicios Disponibles</h5>
              {Object.keys(groupedServices).map((category, index) => (
                <div className="card card-primary card-outline collapsed-card" key={index}>
                  <div className="card-header">
                    <h3 className="card-title">
                      {category}
                    </h3>
                    <div className="card-tools">
                      <button type="button" className="btn btn-tool" data-card-widget="collapse">
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group">
                      {groupedServices[category].map((service, idx) => (
                        <li key={idx} className="list-group-item">
                          {service.name}
                          <br /> jqawPrice: {service.jqawPrice}
                          <br /> Precio Actual a cliente: {service.price}
                          <br /> Publicado: {service.published ? "Sí" : "No"}
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`switch-${service.id}`}
                              checked={service.isPublished}
                              onChange={() => handleTogglePublished(service)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`switch-${service.id}`}
                            >
                              {service.isPublished ? "Publicado" : "No Publicado"}
                            </label>
                          </div>
                          <button
                            className="btn btn-primary btn-sm float-right"
                            onClick={() => handleSelectService(service)}
                          >
                            Agregar
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-2 d-flex justify-content-center align-items-center p-4">
              <div className="arrows">
                <button
                  className="btn btn-outline-primary"
                  onClick={handleDeselectAll}
                >
                  &lt;&lt;
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleSelectAll}
                >
                  &gt;&gt;
                </button>
              </div>
            </div>

            <div className="col-md-5">
              <h5>Servicios Seleccionados</h5>
              <ul className="list-group">
                {selectedServices.map((service, idx) => (
                  <li key={idx} className="list-group-item">
                    {service.name}
                    <br /> jqawPrice: {service.jqawPrice}
                    <br /> Precio Actual a cliente: {service.price}
                    <br /> Publicado: {service.isPublished ? "Sí" : "No"}
                    <br /> Precio quedará en: {service.jqawPrice * (1 + sliderValue / 100)} despues del calculo del {sliderValue} %
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={`switch-selected-${service.id}`}
                        checked={service.isPublished}
                        onChange={() => handleTogglePublished(service)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`switch-selected-${service.id}`}
                      >
                        {service.isPublished ? "Publicado" : "No Publicado"}
                      </label>

                      
                    </div>
                   
                    <button
                      className="btn btn-warning btn-sm float-right mx-1"
                      onClick={() => handleDeselectService(service)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Slider
                min={0}
                max={200}
                step={1}
                value={sliderValue}
                onChange={setSliderValue}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mt-2">
              <button
                className="btn btn-primary float-right"
                onClick={handleGroupTogglePublished}
              >
                {published ? "Despublicar Todos" : "Publicar Todos"}
              </button>
              <button
                className="btn btn-primary float-right mx-2"
                onClick={handleSubmit}
                disabled={!selectedServices.length}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Multiplier;
