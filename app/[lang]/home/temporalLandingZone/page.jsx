import { Endpoints } from '../../../../components/Endpoints/Tables/Endpoints'

import { getDictionary } from '../../dictionaries'

export default async function TemporalLandingZone ({ params: { lang } }) {
  const dict = await getDictionary(lang)

  return (
    <div>
      <h1>{dict.page.temporalLandingZone.title}</h1>
      <h3>· {dict.commons.operations}  <span>- {dict.page.temporalLandingZone.description}.</span></h3>
      <Endpoints type='zones' id='Temporal landing zone' dict={dict} lang={lang} />
    </div>
  )
}
