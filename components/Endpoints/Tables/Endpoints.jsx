'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

// Styles
import styles from './Endpoints.module.css'

// Model
import {EndpointsDTO} from "../../../payloads/response/EndpointsDTO";

// Icons
import searchIcon from "../../../public/icons/filters/search.svg";
import clickIcon from "../../../public/icons/filters/click.svg";
import caretDownIcon from "../../../public/icons/caretDown.svg";

export function Endpoints(type, id) {
    const router = useRouter();
    
    const [endpoints, setEndpoints] = useState(false);
    const [isLoading, setLoading] = useState(false);
    
    // use state filters...
    const [searchFilter, setSearchFilter] = useState("");
    const [methodFilter, setMethodFilter] = useState("any");
    const [filteredEndpoints, setFilteredEndpoints] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetch("http://127.0.0.1:8000/DataLakeAPI/zones/temporalLandingZone/endpoints")
        .then((res) => res.json())
        .then((data) => {
          const endpointsDTO = new EndpointsDTO(data);
          setEndpoints(endpointsDTO);
          setFilteredEndpoints(endpointsDTO);
          setLoading(false);
        });
    }, []);

    const showDetails = (target, key_id) => {
        let endpointRow = document.getElementById(key_id);
        if (!endpointRow.querySelector(`.${styles.endpointTitle}`).querySelector("button").contains(target)) {
            let details = endpointRow.querySelector(`.${styles.endpointDetails}`);
            let caretDown = endpointRow.querySelector(`.${styles.caretDown}`);
            details.classList.toggle(styles.active);
            endpointRow.classList.toggle(styles.active);
            caretDown.classList.toggle(styles.active);
        }
    }

    const handleSelectEndpoint = (key_id) => {
        router.push(`/home/endpoint/${key_id}`);
    }

    const endpointsList = filteredEndpoints && filteredEndpoints.getList().map((endpoint) => (
      <div id={endpoint.id} key={endpoint.id} className={styles.endpoint}>
          <div className={styles.endpointTitle} onClick={e => showDetails(e.target, endpoint.id)}>
            <p><strong>{endpoint.name}</strong>  - <span> {endpoint.route} </span></p>
            <Image className={styles.caretDown} src={caretDownIcon} alt="CaretDown" width={25} height={25}></Image>
            <button onClick={e => handleSelectEndpoint(endpoint.id)}>
                <span>Seleccionar</span>
                <Image src={clickIcon} alt="Click" width={25} height={25}></Image>
            </button>
          </div>
          <div className={styles.endpointDetails}>
              <div>
                  {endpoint.description}
              </div>
              <div>
                  <br />
                  <strong>Endpoint:</strong> <span>{endpoint.route}</span> 
                  <br />
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

    const focusInputFilter = (target) => {
        let input = document.getElementById("searchInput");
        input.focus();
    }

    const handleSearchFilter = () => {
        let input = document.getElementById("searchInput");
        if (endpoints && endpoints.getList().length > 0) {
            filterData();
        } else {
            // Cannot perform any filter
            return;
        }
    }

    const filterData = () => {
        let filteredEndpoints = new EndpointsDTO(endpoints.filter(methodFilter, searchFilter));
        if (filteredEndpoints.getNumberOfEndpoints() === 0) setFilteredEndpoints(false);
        else setFilteredEndpoints(filteredEndpoints);
    }

    return (
        <div className={styles.endpointsWrapper}>
            <div className={styles.filtersContainer}>
                <h4>Filtre</h4>
                <div className={styles.filtersWrapper}>
                    <p>Aplica una cerca sobre les operacions disponibles</p>
                    <div className={styles.searchWrapper} onClick={e => focusInputFilter( e.target )}>
                        <input id="searchInput" type="text" placeholder="Cerca" onChange={
                            e => setSearchFilter(e.target.value)
                        } />
                        <Image src={searchIcon} alt="SearchIcon" width={25} height={25} onClick={e => handleSearchFilter()} ></Image>
                    </div>
                    <div className={styles.filterSelectors}>
                        <div>
                            <label htmlFor="method">Mètode</label>
                            <select name="method" id="method" onChange={
                                e => setMethodFilter(e.target.value)
                            }>
                                <option value="any">-</option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={e => filterData()}>
                        Aplica Filtres
                    </button>
                </div>
            </div>
            <div className={styles.endpointsContainer}>
                <h4>Llistat d'operacions disponibles</h4>
                {endpointsList ? endpointsList : (isLoading ? <p>Loading...</p> : <p>No s'han trobat operacions.</p>)}
            </div>
        </div>
    )    
  
}

