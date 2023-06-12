'use client'

// Imports
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

// Styles
import styles from './Endpoints.module.css'

// Model
import { EndpointsDTO } from '../../../payloads/response/EndpointsDTO'

// Icons
import searchIcon from '../../../public/icons/filters/search.svg'
import clickIcon from '../../../public/icons/filters/click.svg'
import caretDownIcon from '../../../public/icons/caretDown.svg'

// Components
import { Error } from '../../Error/Error'

export function Endpoints ({ dict, id, type, lang }) {
  const router = useRouter()

  const [endpoints, setEndpoints] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const [loadingMessage, setLoadingMessage] = useState(dict.commons.loading)

  const [errorMessage, setErrorMessage] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)

  // use state filters...
  const [searchFilter, setSearchFilter] = useState('')
  const [methodFilter, setMethodFilter] = useState('any')
  const [filteredEndpoints, setFilteredEndpoints] = useState(false)

  // Session
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/${type}/${id}/endpoints`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`
          }
        })
        .then(async (res) => {
          if (res.status === 403) {
            setErrorMessage(dict.commons.notEnoughPermissions)
            setErrorStatus(403)
            setLoadingMessage(dict.commons.endpointTable.noOperations)
          } else if (res.status === 401) {
            await signOut({
              callbackUrl: `/${lang}/auth/login`,
              redirect: true
            })
          } else {
            res.json().then((data) => {
              console.log(data)
              const endpointsDTO = new EndpointsDTO(data)
              setEndpoints(endpointsDTO)
              setFilteredEndpoints(endpointsDTO)
              setLoading(false)
            })
              .catch((err) => {
                setErrorMessage(err.message)
                setErrorStatus(500)
              })
          }
        })
    }
  }, [session])

  const showDetails = (target, keyId) => {
    const endpointRow = document.getElementById(keyId)
    if (!endpointRow.querySelector(`.${styles.endpointTitle}`).querySelector('button').contains(target)) {
      const details = endpointRow.querySelector(`.${styles.endpointDetails}`)
      const caretDown = endpointRow.querySelector(`.${styles.caretDown}`)
      details.classList.toggle(styles.active)
      endpointRow.classList.toggle(styles.active)
      caretDown.classList.toggle(styles.active)
    }
  }

  const handleSelectEndpoint = (keyId) => {
    router.push(`${lang}/home/endpoint/${keyId}`)
  }

  const endpointsList = filteredEndpoints && filteredEndpoints.getList().map((endpoint) => (
    <div id={endpoint.id} key={endpoint.id} className={styles.endpoint}>
      <div className={styles.endpointTitle} onClick={e => showDetails(e.target, endpoint.id)}>
        <p><strong>{endpoint.route}</strong>  - <span> {endpoint.summary} </span></p>
        <Image className={styles.caretDown} src={caretDownIcon} alt='CaretDown' width={25} height={25} />
        <button onClick={() => handleSelectEndpoint(endpoint.id)}>
          <span>{dict.commons.select}</span>
          <Image src={clickIcon} alt='Click' width={25} height={25} />
        </button>
      </div>
      <div className={styles.endpointDetails}>
        <div>
          {endpoint.description}
        </div>
        <div>
          <br />
          <strong>{dict.commons.endpointTable.endpoint}:</strong> <span>{endpoint.route}</span>
          <br />
          <strong>{dict.commons.endpointTable.method}:</strong> {endpoint.method.toUpperCase()}
          <br />
          <strong>{dict.commons.endpointTable.parameters}:</strong> {(endpoint.parameters.length === 0) ? dict.commons.endpointTable.noParametersRequired : ''}
          <ul>
            {endpoint.parameters.map((parameter) => (
              <li key={parameter.id}>
                {parameter.name} ({parameter.type}): {parameter.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ))

  const focusInputFilter = () => {
    const input = document.getElementById('searchInput')
    input.focus()
  }

  const handleSearchFilter = () => {
    if (endpoints && endpoints.getList().length > 0) {
      filterData()
    } else {
      // Cannot perform any filter

    }
  }

  const filterData = () => {
    if (endpoints && endpoints.getList().length > 0) {
      const filteredEndpoints = new EndpointsDTO(endpoints.filter(methodFilter, searchFilter))
      if (filteredEndpoints.getNumberOfEndpoints() === 0) setFilteredEndpoints(false)
      else setFilteredEndpoints(filteredEndpoints)
    }
  }

  return (
    <>
      {errorMessage ? <Error status={errorStatus} message={errorMessage} action={() => { setErrorMessage(false); setErrorStatus(false) }} dict={dict} lang={lang} /> : ''}
      <div className={styles.endpointsWrapper}>
        <div className={styles.filtersContainer}>
          <h4>{dict.commons.endpointTable.filter}</h4>
          <div className={styles.filtersWrapper}>
            <p>{dict.commons.endpointTable.filterDescription}</p>
            <div className={styles.searchWrapper} onClick={e => focusInputFilter(e.target)}>
              <input
                id='searchInput' type='text' placeholder={dict.commons.endpointTable.search} onChange={
                                e => setSearchFilter(e.target.value)
                            }
              />
              <Image src={searchIcon} alt='SearchIcon' width={25} height={25} onClick={() => handleSearchFilter()} />
            </div>
            <div className={styles.filterSelectors}>
              <div>
                <label htmlFor='method'>{dict.commons.endpointTable.method}</label>
                <select
                  name='method' id='method' onChange={
                                    e => setMethodFilter(e.target.value)
                                }
                >
                  <option value='any'>-</option>
                  <option value='GET'>GET</option>
                  <option value='POST'>POST</option>
                  <option value='PUT'>PUT</option>
                  <option value='PATCH'>PATCH</option>
                </select>
              </div>
            </div>
            <button onClick={() => filterData()}>
              {dict.commons.endpointTable.applyFilters}
            </button>
          </div>
        </div>
        <div className={styles.endpointsContainer}>
          <h4>{dict.commons.endpointTable.listOperations}</h4>
          {
                    endpointsList || (isLoading
                      ? <p>{loadingMessage}</p>
                      : <p>{dict.commons.endpointTable.noOperations}.</p>
                    )
                    }
        </div>
      </div>
    </>
  )
}
