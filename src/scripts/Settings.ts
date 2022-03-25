export interface DataSource {
    icon?: string,
    name: string,
    infoUrl?: string,
    dataUrl?: string
}

export const sources = {
    terraMantle: {
        name: 'Terra Mantle',
        infoUrl: 'https://mantle.terra.dev/',
        dataUrl: 'https://mantle.terra.dev'
    },
    terraFCD: {
        name: 'Terra FCD',
        infoUrl: 'https://fcd.terra.dev/swagger',
        dataUrl: 'https://fcd.terra.dev'
    },
    terraLCD: {
        name: 'Terra LCD',
        infoUrl: 'https://lcd.terra.dev/swagger-ui/',
        dataUrl: 'https://lcd.terra.dev'
    },
    anchorAPI: {
        name: 'Anchor API',
        infoUrl: 'https://docs.anchorprotocol.com/',
        dataUrl: 'https://api.anchorprotocol.com'
    },
    anchorMantle: {
        name: 'Anchor Mantle',
        infoUrl: 'https://docs.anchorprotocol.com/',
        dataUrl: 'https://mantle.anchorprotocol.com'
    },
    mirrorGraphQL: {
        name: 'Mirror GraphQL',
        infoUrl: 'https://docs.mirror.finance/developer-tools/mirror-api',
        dataUrl: 'https://graph.mirror.finance'
    },
    pylonAPI: {
        name: 'Pylon API',
        infoUrl: 'https://docs.pylon.money/',
        dataUrl: 'https://api.pylon.money'
    },
    loterraAPI: {
        name: 'LoTerra API',
        icon: 'https://loterra.io/logo.png',
        infoUrl: 'https://docs.loterra.io/'
    },
    spectrumAPI: {
        name: 'Spectrum Finance',
        icon: ' https://terra.spec.finance/assets/SPEC.png',
        infoUrl: 'https://terra.spec.finance/vaults',
        dataUrl: 'https://specapi.azurefd.net/'
    }
}
