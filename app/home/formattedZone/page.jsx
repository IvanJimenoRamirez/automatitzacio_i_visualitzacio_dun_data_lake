import { Endpoints } from "../../../components/Endpoints/Tables/Endpoints";

export default function FormattedZone() { 
    return (
        <div>
            <h1>Formatted zone</h1>
            <h3>· Operacions  <span>- Conjunt d'operacions disponibles a la Formatted Zone.</span></h3>
            <Endpoints type="zones" id="Formatted zone"></Endpoints>
        </div>
    )
}