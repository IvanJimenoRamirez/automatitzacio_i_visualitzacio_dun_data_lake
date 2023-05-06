// Imports
import { AdminContent } from "../../../../components/Admin/Admin";
import { getDictionary } from '../../dictionaries';

export default async function Admin({ params: { lang } }) {
  const dict = await getDictionary(lang);

    return (
        <div>
            <h1>{dict.page.admin.title}</h1>
            <h3>· {dict.page.admin.subtitle}  <span>- {dict.page.admin.description}.</span></h3>
            <AdminContent lang={lang} dict={dict} />
        </div>
    )
}
