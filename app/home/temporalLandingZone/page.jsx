import { Endpoints } from "../../../components/Endpoints/Tables/Endpoints";

export default function TemporalLandingZone() { 
    return (
        <div>
            <h1>Temporal landing zone</h1>
            <h3>· Operacions  <span>- Conjunt d'operacions disponibles a la Temporal Landing Zone.</span></h3>
            <Endpoints type="zones" id="temporalLandingZone"></Endpoints>
        </div>
    )
}