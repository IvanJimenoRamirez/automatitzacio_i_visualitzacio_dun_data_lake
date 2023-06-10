import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render } from '@testing-library/react'
import { Zone } from '../../components/Home/Zones/Zone'
import { HomeTable } from '../../components/Home/Tables/HomeTable'
import { getDictionary } from '../../app/[lang]/dictionaries'

describe('Home Page tests', () => {
    let lang = "en-US";
    process.env.NEXT_PUBLIC_API_URL = "http://127.0.0.1:8000";

    test('Relative information about each zone is rendered', async () => {
        let dict = await getDictionary(lang);
        const tlzComponent = render(
                <Zone name={dict.page.home.zones.tlz.name} description={dict.page.home.zones.tlz.description} id="TemporalLandingZone" dict={dict} />
        );
        await new Promise(resolve => setTimeout(resolve, 300));
        expect(tlzComponent.container).toHaveTextContent(dict.page.home.zones.tlz.name)
        expect(tlzComponent.container).toHaveTextContent("4")

        const lzComponent = render(
            <Zone name={dict.page.home.zones.lz.name} description={dict.page.home.zones.lz.description} id="LandingZone" dict={dict} />
        );
        await new Promise(resolve => setTimeout(resolve, 300));
        expect(lzComponent.container).toHaveTextContent(dict.page.home.zones.lz.name)
        expect(lzComponent.container).toHaveTextContent("3")

        const fzComponent = render(
            <Zone name={dict.page.home.zones.fz.name} description={dict.page.home.zones.fz.description} id="FormattedZone" dict={dict} />
        );
        await new Promise(resolve => setTimeout(resolve, 300));
        expect(fzComponent.container).toHaveTextContent(dict.page.home.zones.fz.name)
        expect(fzComponent.container).toHaveTextContent("1")
    })

    describe('Data sources in the data lake', () => {
        test('Data sources table is rendered', async () => {
            let dict = await getDictionary(lang);
            const component = render(
                    <HomeTable id="TemporalLandingZone" col1={dict.page.home.sources.columns.name} col2={dict.page.home.sources.columns.providedData} loading={dict.commons.loading} /> 
            );
            await new Promise(resolve => setTimeout(resolve, 300));
            expect(component.container).toHaveTextContent(dict.page.home.sources.columns.name)
            expect(component.container).toHaveTextContent(dict.page.home.sources.columns.providedData)
            expect(component.container).toHaveTextContent("AnnotationAppAnnotations")
        })
    })
})