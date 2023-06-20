import { Endpoints } from '../../../../components/Endpoints/Tables/Endpoints'

import { getDictionary } from '../../dictionaries'

export default async function FormattedZone ({ params: { lang } }) {
  const dict = await getDictionary(lang)
  return (
    <div>
      <h1>{dict.page.formattedZone.title}</h1>
      <h3>· {dict.commons.operations}  <span>- {dict.page.formattedZone.description}.</span></h3>
      <Endpoints type='zones' id='Formatted zone' dict={dict} lang={lang} />
    </div>
  )
}
