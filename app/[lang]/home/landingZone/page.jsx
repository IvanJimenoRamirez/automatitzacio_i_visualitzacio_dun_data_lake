import { Endpoints } from '../../../../components/Endpoints/Tables/Endpoints'

import { getDictionary } from '../../dictionaries'

export default async function LandingZone ({ params: { lang } }) {
  const dict = await getDictionary(lang)
  return (
    <div>
      <h1>{dict.page.landingZone.title}</h1>
      <h3>· {dict.commons.operations}  <span>- {dict.page.landingZone.description}.</span></h3>
      <Endpoints type='zones' id='Landing zone' dict={dict} lang={lang} />
    </div>
  )
}
