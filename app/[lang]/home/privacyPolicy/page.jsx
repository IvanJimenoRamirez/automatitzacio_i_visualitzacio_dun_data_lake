// Dictionary
import { getDictionary } from '../../dictionaries'

// Styles
import styles from './PrivacyPolicy.module.css'

export default async function PrivacyPolicy ({ params: { lang } }) {
  const dict = await getDictionary(lang)
  return (
    <div>
      <h1>{dict.page.privacyPolicy.title}</h1>
      <div className={styles.content}>
        <h4>{dict.page.privacyPolicy.content.title}</h4>
        <p>
          {dict.page.privacyPolicy.content.welcomeUser}
        </p>

        <p>
          {dict.page.privacyPolicy.content.welcomeContent}
        </p>

        <p>
          {dict.page.privacyPolicy.content.recolectedData}
        </p>

        <p>
          <ul>
            <li>{dict.page.privacyPolicy.content.data.name}</li>
            <li>{dict.page.privacyPolicy.content.data.email}</li>
            <li>{dict.page.privacyPolicy.content.data.password}</li>
          </ul>
        </p>

        <p>
          {dict.page.privacyPolicy.content.dataUsage}
        </p>

        <p>
          {dict.page.privacyPolicy.content.thanksUser}
        </p>

      </div>
    </div>
  )
}
