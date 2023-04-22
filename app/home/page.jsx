import styles from "./Home.module.css";
import { Zone } from "../../components/Home/Zones/Zone";
import { HomeTable } from "../../components/Home/Tables/HomeTable";

export default function Home() {
    return (
        <div>
            <h1>Administració del Data Lake</h1>
            <h3>· Zones  <span>- Zones del Data Lake. Resum del contingut.</span></h3>
            <div className={styles.zonesWrapper}>
                <Zone name="Temporal Landing Zone" description="Some statistics about the temporal landing zone" id="temporalLandingZone" />
                <Zone name="Landing Zone" description="Some statistics about the landing zone" id="temporalLandingZone" />
                <Zone name="Formatted Zone" description="Some statistics about the formatted zoone" id="temporalLandingZone" />
            </div>
            <h3>· Fonts  <span>- Fonts de dades enregistrades</span></h3>
            <div>
                <HomeTable id="temporalLandingZone" />
            </div>
        </div>
    )
}