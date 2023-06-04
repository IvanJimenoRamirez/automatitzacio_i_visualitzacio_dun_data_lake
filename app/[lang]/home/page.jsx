import styles from "./Home.module.css";
import { Zone } from "../../../components/Home/Zones/Zone";
import { HomeTable } from "../../../components/Home/Tables/HomeTable";

import { getDictionary } from '../dictionaries';


export default async function Home({ params: { lang } }) {
    const dict = await getDictionary(lang);
    return (
        <div>
            <h1>{dict.page.home.title}</h1>
            <h3>· {dict.page.home.zones.name}  <span>- {dict.page.home.zones.description}</span></h3>
            <div className={styles.zonesWrapper}>
                <Zone name={dict.page.home.zones.tlz.name} description={dict.page.home.zones.tlz.description} id="TemporalLandingZone" dict={dict} />
                <Zone name={dict.page.home.zones.lz.name} description={dict.page.home.zones.lz.description} id="LandingZone" dict={dict} />
                <Zone name={dict.page.home.zones.fz.name} description={dict.page.home.zones.fz.description} id="FormattedZone" dict={dict} />
            </div>
            <h3>· {dict.page.home.sources.name}  <span>- {dict.page.home.sources.description}</span></h3>
            <div>
                <HomeTable id="TemporalLandingZone" col1={dict.page.home.sources.columns.name} col2={dict.page.home.sources.columns.providedData} loading={dict.commons.loading} />
            </div>
        </div>
    )
}