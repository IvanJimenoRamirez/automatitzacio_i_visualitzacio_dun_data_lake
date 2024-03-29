'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Modal } from '../Modal/Modal'

// Components
import { Loader } from '../loader'
import { Error } from '../Error/Error'

// Styles
import styles from './endpoint.module.css'

// Icons
import closeIcon from '../../public/icons/close.svg'
import fileIcon from '../../public/icons/endpoint/file.svg'

export function EndpointContent ({ id, dict, lang }) {
  const router = useRouter()

  const [endpoint, setEndpoint] = useState(false)
  const [jobs, setJobs] = useState(false)

  // Required parameters
  let finalUrl = ''
  let finalBodyParams = {}
  let finalFormData = {}
  let finalQueryParams = {}
  let finalPathParams = {}

  // Error handling
  const [errorMessage, setErrorMessage] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)

  const [showResult, setShowResult] = useState(false)
  let isScheduled = false

  // modal
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState(null)
  const [modalActions, setModalActions] = useState([])

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/endpoint/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`
          }
        })
        .then(async (res) => {
          if (res.status === 403) {
            router.push(`${lang}/home?error=403`)
          } else if (res.status === 401) {
            await signOut({
              callbackUrl: `/${lang}/auth/login`,
              redirect: true
            })
          } else {
            res.json().then((data) => {
              setEndpoint(data)
              if (data.jobs && data.jobs.length > 0) setJobs(data.jobs[0])
            }).catch((err) => {
              setErrorMessage(err.message)
              setErrorStatus(500)
            })
          }
        })
    }
  }, [session])

  const handleSubmit = (e) => {
    e.preventDefault()

    const params = e.target.querySelectorAll('input')

    const queryParams = []
    const qParams = {}
    const pathParams = {}
    const bodyParams = {}
    const formData = {}
    let url = endpoint.route

    let isValid = true
    const errorMsg = []

    endpoint.parameters.forEach((param, index) => {
      if (param.location === 'path') {
        pathParams[param.name] = params[index].value
        url = url.replace(`{${param.name}}`, params[index].value)
      } else if (param.location === 'query') {
        qParams[param.name] = params[index].value
        queryParams.push(`${param.name}=${params[index].value}`)
      } else if (param.location === 'body') { bodyParams[param.name] = params[index].value } else if (param.location === 'formData') {
        if (param.type === 'file') {
          formData[param.name] = params[index].files[0]
        } else {
          formData[param.name] = params[index].value
        }
      }

      if (param.required && params[index].value === '') {
        isValid = false
        errorMsg.push(`${dict.page.endpoint.parameterErrors.parameter} '${param.name}' ${dict.page.endpoint.parameterErrors.required}`)
      }
      if (param.type === 'integer' && isNaN(params[index].value)) {
        isValid = false
        errorMsg.push(`${dict.page.endpoint.parameterErrors.parameter} '${param.name}' ${dict.page.endpoint.parameterErrors.numeric}`)
      }
    })

    if (!isValid) {
      setModalTitle(dict.page.endpoint.parameterErrors.title)
      setModalContent(
        <p>
          {dict.page.endpoint.parameterErrors.description}
          <br />
          <ul>
            {
            errorMsg.map((msg) => (<li key={msg}><span>{msg}<br /></span></li>))
          }
          </ul>
        </p>
      )
      setModalActions([
        {
          label: dict.commons.close,
          onClick: () => setModalOpen(false)
        }
      ])
      setModalOpen(true)
      return
    }

    if (queryParams.length > 0) url = `${url}?${queryParams.join('&')}`
    finalUrl = url
    finalBodyParams = bodyParams
    if (Object.keys(formData).length > 0) finalFormData = formData
    finalQueryParams = qParams
    finalPathParams = pathParams

    createExecuteEndpointModal()
  }

  const createExecuteEndpointModal = () => {
    setModalTitle(dict.page.endpoint.execute.confirm)
    setModalContent(
      <div className={styles.modalBody}>
        <div
          id='loaderContainer'
          className={[styles.loader, styles.hidden].join(' ')}
        >
          <Loader />
        </div>
        <p>
          <strong>URL: </strong> {finalUrl}
        </p>
        <p>
          <strong>{dict.page.endpoint.execute.method}: </strong>{' '}
          {endpoint && endpoint.method.toUpperCase()}
        </p>
        <p>
          <strong>Body: </strong>
        </p>
        {
        (Object.keys(finalFormData).length === 0)
          ? (
            <pre>{JSON.stringify(finalBodyParams, undefined, 2)}</pre>
            )
          : (
            <pre>{JSON.stringify(finalFormData, undefined, 2)}</pre>
            )
        }
        <div className={jobs ? styles.hidden : ''}>
          <p>
            <strong>{dict.page.endpoint.execute.schedule}:</strong>{' '}
            <input
              id='scheduleCheckbox'
              type='checkbox'
              onChange={(e) => handleShowSchedule(e.target.checked)}
            />
          </p>

          <div
            className={[styles.scheduleContainer, styles.hidden].join(' ')}
          >
            <hr />
            <p>
              <strong>{dict.page.endpoint.execute.startDate}: </strong>{' '}
              <input type='datetime-local' />{' '}
            </p>
            <p>
              <strong>{dict.page.endpoint.execute.repeat}</strong>{' '}
              <input type='number' />{' '}
            </p>
          </div>
        </div>
      </div>
    )
    setModalActions([
      {
        label: dict.page.endpoint.execute.execute,
        onClick: runEndpointOrSchedule
      },
      { label: dict.commons.cancel, onClick: () => setModalOpen(false), customStyle: styles.cancel }
    ])
    setModalOpen(true)
  }

  const toggleModal = () => {
    document
      .querySelector(`.${styles.modalContainer}`)
      .classList.toggle(styles.hidden)
  }

  const scheduleEndpoint = () => {
    // Get the schedule time from the scheduleContainer div, the input type datetime-local
    const scheduleTime = document.querySelector(
      `.${styles.scheduleContainer} input[type="datetime-local"]`
    ).value
    let seconds = document.querySelector(
      `.${styles.scheduleContainer} input[type="number"]`
    ).value

    // If the schedule time is empty, return
    if (scheduleTime === '') {
      return alert(dict.page.endpoint.execute.missingDate)
    }

    // If the seconds are empty, set it to 0
    if (seconds === '') seconds = 0

    // Get the endpoint id
    const endpointId = endpoint.id

    // Merge the bodyParams and queryParams and pathParams
    const params = { ...finalBodyParams, ...finalQueryParams, ...finalPathParams }

    // Toggle the loader
    setModalTitle(dict.page.endpoint.execute.running + '...')
    setModalActions([])
    toggleLoader()

    // Send the request to the API
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/schedule-endpoint/${endpointId}/${seconds}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY
        },
        body: JSON.stringify({
          start_date: scheduleTime,
          params
        })
      }
    )
      .then((res) =>
        res.json().then((data) => {
          showEndpointResult(data, res.status)
          setJobs(data)
        })
      )
      .catch((err) => {
        setErrorMessage(err.message)
        setErrorStatus(500)
      })
  }

  const runEndpointOrSchedule = () => {
    if (isScheduled) scheduleEndpoint()
    else runEndpoint()
  }

  const runEndpoint = () => {
    setModalTitle(dict.page.endpoint.execute.running + '...')
    setModalActions([])
    toggleLoader()

    const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL + finalUrl}`

    console.log(finalUrl)

    const handleCatch = (err) => {
      showEndpointResult(err.message, 500)
    }

    const handleThen = (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          setErrorMessage(res.statusText)
          setErrorStatus(res.status)
        }
      }
      const contentType = res.headers.get('content-type')
      if (contentType && contentType.includes('application/x-zip-compressed')) {
        return res.blob().then((data) => ({ res, data }))
      } else {
        return res.json().then((data) => ({ res, data }))
      }
    }

    const handleData = ({ res, data }) => {
      if (data instanceof Blob) {
        const blob = new Blob([data], {
          type: 'application/x-zip-compressed'
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'received_data.zip'
        a.click()
        URL.revokeObjectURL(url)
        showEndpointResult(dict.commons.fileDownloaded, 200)
      } else {
        showEndpointResult(data, res.status)
      }
    }

    const requestOptions = {
      method: endpoint.method.toUpperCase(),
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    }

    if (['PUT', 'POST', 'PATCH'].includes(endpoint.method.toUpperCase())) {
      if (Object.keys(finalFormData).length > 0) {
        const fData = new FormData()
        Object.keys(finalFormData).forEach((key) => {
          console.log(key, finalFormData[key])
          fData.append(key, finalFormData[key])
        })
        requestOptions.body = fData
      } else {
        requestOptions.body = JSON.stringify(finalBodyParams)
        if (requestOptions.body === '{}') delete requestOptions.body
        else requestOptions.headers['Content-Type'] = 'application/json'
      }
    } else {
      requestOptions.headers['Content-Type'] = 'application/json'
    }

    fetch(endpointUrl, requestOptions)
      .then(handleThen)
      .then(handleData)
      .catch(handleCatch)
  }

  const toggleLoader = () => {
    const loader = document.querySelector('#loaderContainer')
    loader.classList.toggle(styles.hidden)
  }

  const showEndpointResult = (data, status) => {
    setShowResult(!showResult)
    let prettyData
    try {
      // Try to parse the data
      const parsedData = JSON.parse(data)
      prettyData = JSON.stringify(parsedData, undefined, 2)
    } catch (error) {
      // If parsing fails, it's already a JSON object
      prettyData = JSON.stringify(data, undefined, 2)
    }

    setModalTitle(dict.page.endpoint.execute.response)
    setModalContent(
      <div className={styles.result}>
        <p>
          <strong>{dict.commons.status}:</strong>{' '}
          <span
            style={
              status >= 200 && status <= 200
                ? { color: '#3dcf35' }
                : { color: '#E63946' }
            }
          >
            {status}
          </span>
        </p>
        <p>
          <strong>{dict.commons.result}:</strong>
          <pre>{prettyData}</pre>
        </p>
      </div>
    )
    setModalActions([
      { label: dict.commons.close, onClick: () => setModalOpen(false) }
    ])
  }

  const handleShowSchedule = (checked) => {
    const scheduleContainer = document.querySelector(
      `.${styles.scheduleContainer}`
    )
    scheduleContainer.classList.toggle(styles.hidden)
    isScheduled = checked
  }

  const handleDeleteJob = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/schedule-endpoint/stop_job/${jobs.job_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      if (res.status === 200) setJobs(false)
    }).catch((err) => {
      setErrorMessage(err.message)
      setErrorStatus(500)
    })
  }

  const handleChangeFileName = (inputId, labelId) => {
    const input = document.getElementById(inputId)
    const label = document.getElementById(labelId)
    if (input.files.length > 0) label.innerHTML = input.files[0].name
    else label.innerHTML = dict.page.endpoint.fileNotUploaded
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        title={modalTitle}
        content={modalContent}
        onClose={() => setModalOpen(false)}
        actions={modalActions}
      />
      {errorMessage ? <Error status={errorStatus} message={errorMessage} action={() => { setErrorMessage(false); setErrorStatus(false) }} dict={dict} lang={lang} /> : ''}
      <div className={[styles.modalContainer, styles.hidden].join(' ')}>
        <div className={styles.modal}>
          <Image
            onClick={(e) => toggleModal()}
            src={closeIcon}
            alt='close'
            width={20}
            height={20}
          />
          <div className={styles.modalTitle}>
            <p>
              <strong>{dict.page.endpoint.execute.confirm}</strong>
            </p>
          </div>
        </div>
      </div>
      <h1>{dict.page.endpoint.title}</h1>
      {endpoint && (
        <>
          <h3>
            · {endpoint.route} <span>- {endpoint.summary}.</span>
          </h3>
          <p>
            <strong>{dict.page.endpoint.description}:</strong>{' '}
            {endpoint.description}
          </p>
          <div className={styles.endpointWrapper}>
            {jobs && (
              <div className={styles.jobWrapper}>
                <span>{dict.page.endpoint.activeJob}</span>{' '}
                <Image
                  src={closeIcon}
                  onClick={(e) => handleDeleteJob()}
                  alt='delete job'
                  width={20}
                  height={20}
                />
              </div>
            )}
            <h4>{dict.page.endpoint.configuration}</h4>
            <div className={styles.endpointParams}>
              <form onSubmit={(e) => handleSubmit(e)}>
                {endpoint.parameters.map((param) => (
                  <div key={param.id} className={styles.paramWrapper}>
                    <div className={styles.paramDescription}>
                      <p>
                        <strong>{param.name}:</strong> {param.description}{' '}
                        <span>
                          [{param.location}][{param.type}]
                          {
                            param.required
                              ? <span className={styles.required}>[{dict.page.endpoint.required}]</span>
                              : ''
                          }
                        </span>{' '}
                      </p>
                    </div>
                    <div className={styles.inputContainer}>
                      {
                            param.type === 'file'
                              ? (
                                <div className={styles.fileInputContainer}>
                                  <label htmlFor={param.name + '-file'}>
                                    <Image src={fileIcon} alt='file icon' width={20} height={20} />
                                  </label>
                                  <label id={param.name + '_filename'} htmlFor={param.name + '-file'}>
                                    {dict.page.endpoint.fileNotUploaded}
                                  </label>
                                  <input id={param.name + '-file'} type='file' onChange={e => handleChangeFileName(param.name + '-file', param.name + '_filename')} />
                                </div>
                                )
                              : (
                                <input
                                  type={
                                    param.type === 'integer'
                                      ? 'number'
                                      : 'text'
                                    }
                                  placeholder={
                                    param.type === 'string' || param.type === 'integer'
                                      ? param.name
                                      : undefined
                                    }
                                />
                                )
                        }
                    </div>
                  </div>
                ))}
                <div className={styles.buttonContainer}>
                  <button>{dict.page.endpoint.execute.execute}</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
