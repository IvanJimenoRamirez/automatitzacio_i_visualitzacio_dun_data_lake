import styles from "./Projects.module.css";

import { ListProjects } from "../../../../components/Projects/ListProjects";

import { getDictionary } from '../../dictionaries';


export default async function Projects({ params: { lang } }) { 
    const dict = await getDictionary(lang);    

    return (
        <div>
            <h1>{dict.page.projects.title}</h1>
            <h3>· {dict.commons.operations}  <span>- {dict.page.projects.description}.</span></h3>
            <div className={styles.projectsContainer}>
                <h4>{dict.page.projects.projectsList}</h4>
                <ListProjects lang={lang} styles={styles} dict={dict} />
            </div>
        </div>
    )
}