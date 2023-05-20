// Imports
import { getDictionary } from '../../dictionaries';

// Styles
import styles from './profile.module.css'

// Components
import { ProfileTable } from "../../../../components/Profile/ProfileTable"

export default async function LandingZone({ params: { lang } }) { 
    const dict = await getDictionary(lang);

    return (
        <div>
            <h1>{dict.page.profile.title}</h1>
            <h3>· {dict.page.profile.subtitle}  <span>- {dict.page.profile.description}.</span></h3>
            <ProfileTable lang={lang} dict={dict} styles={styles} />
        </div>
    )
}