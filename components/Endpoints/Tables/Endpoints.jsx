'use client'

import styles from './Endpoints.module.css'
import { useState, useEffect } from "react";
import {EndpointsDTO} from "../../../payloads/response/EndpointsDTO";

export function Endpoints(type, id) {
    
    const [endpoints, setEndpoints] = useState(false);
    const [isLoading, setLoading] = useState(false);
    
    // use state filters...
    
    useEffect(() => {
        setLoading(true);
        fetch("http://127.0.0.1:8000/DataLakeAPI/zones/temporalLandingZone/endpoints")
        .then((res) => res.json())
        .then((data) => {
          const endpointsDTO = new EndpointsDTO(data);
          setEndpoints(endpointsDTO);
          setLoading(false);
        });
    }, []);

    const showDetails = (target, key_id) => {
        let endpointRow = document.getElementById(key_id);
        console.log("Pressed element: ", endpointRow)
        if (endpointRow.querySelector(`.${styles.endpointTitle}`).querySelector("button") !== target) {
            let details = endpointRow.querySelector(`.${styles.endpointDetails}`);
            details.classList.toggle(styles.active);
            endpointRow.classList.toggle(styles.active);
        }
    }

    const endpointsList = endpoints && endpoints.getList().map((endpoint) => (
      <div id={endpoint.id} key={endpoint.id} className={styles.endpoint}>
          <div className={styles.endpointTitle} onClick={e => showDetails(e.target, endpoint.id)}>
              <p><strong>{endpoint.name}</strong>  - <span> {endpoint.route} </span></p>
              <button>Seleccionar</button>
          </div>
          <div className={styles.endpointDetails}>
              <div>
                  {endpoint.description}
              </div>
              <div>
                  <strong>Tipus d'operació:</strong> {endpoint.method}
                  <br />
                  <strong>Paràmetres:</strong>
                  <ul>
                      {endpoint.parameters.map((parameter) => (
                          <li key={parameter.id}>
                              {parameter.name} ({parameter.param_type}): {parameter.description}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
    ));

    return (
        <div className={styles.endpointsWrapper}>
            <div className={styles.filtersWrapper}>
                <h4>Filtre</h4>
            </div>
            <div className={styles.endpointsContainer}>
                <h4>Llistat d'operacions disponibles</h4>
                {endpointsList ? endpointsList : (isLoading ? <p>Loading...</p> : <p>No endpoints found.</p>)}
            </div>
        </div>
    )    
  
}

