// Components
import { Endpoints } from "../../../../../components/Endpoints/Tables/Endpoints";
import { ProjectName } from "../../../../../components/Projects/ProjectName";

// Imports
import { getDictionary } from '../../../dictionaries';

export default async function Project( { params: { lang, id } }) {

    const dict = await getDictionary(lang);

    return (
        <div>
            <h1>
                Project <ProjectName id={id} />
            </h1>
            <h3>· Operacions <span>- Conjunt d'operacions disponibles al projecte.</span></h3>
            <Endpoints type="projects" id={id} dict={dict} lang={lang} ></Endpoints>
        </div>
    )
}