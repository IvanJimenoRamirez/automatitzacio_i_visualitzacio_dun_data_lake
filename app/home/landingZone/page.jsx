import { Endpoints } from "../../../components/Endpoints/Tables/Endpoints";

export default function LandingZone() { 
    return (
        <div>
            <h1>Landing zone</h1>
            <h3>· Operacions  <span>- Conjunt d'operacions disponibles a la Landing Zone.</span></h3>
            <Endpoints type="zones" id="Landing zone"></Endpoints>
        </div>
    )
}