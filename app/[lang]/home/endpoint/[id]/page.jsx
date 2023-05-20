// Components
import { EndpointContent } from "../../../../../components/Endpoints/EndpointContent"

// Import
import { getDictionary } from '../../../dictionaries';

export default async function Endpoint( { params: { lang, id } } ) {
    const dict = await getDictionary(lang);

    return (
        <>
            <EndpointContent id={id} dict={dict} lang={lang} />
        </>
    )
}