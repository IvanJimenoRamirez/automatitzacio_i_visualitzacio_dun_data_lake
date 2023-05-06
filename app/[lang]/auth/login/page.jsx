// Components
import { LoginContent } from "../../../../components/Auth/LoginContent";

import { getDictionary } from '../../dictionaries';

export default async function ({ params: { lang } }) {
    const dict = await getDictionary(lang);

    return (
        <LoginContent dict={dict} lang={lang} />
    )
}