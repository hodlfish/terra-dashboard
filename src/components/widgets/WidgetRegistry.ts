import LunaPrice from "./LunaPrice/LunaPricePanel";
import * as LunaPriceSettings from './LunaPrice/LunaPriceSettings';

import AnchorProposals from "./AnchorProposals/AnchorProposalsPanel";
import * as AnchorProposalsSettings from "./AnchorProposals/AnchorProposalsSettings";

import TerraProposalsPanel from "./TerraProposals/TerraProposalsPanel";
import * as TerraProposalSettings from "./TerraProposals/TerraProposalsSettings";

import WalletPanel from "./Wallet/WalletPanel";
import * as WalletSettings from "./Wallet/WalletSettings";

import RecentTransactionsPanel from "./RecentTransactions/RecentTransactionsPanel";
import * as RecentTransactionsSettings from "./RecentTransactions/RecentTransactionsSettings";

import MirrorProposalsPanel from "./MirrorProposals/MirrorProposalsPanel";
import * as MirrorProposalsSettings from "./MirrorProposals/MirrorProposalsSettings";

import MirrorAssetsPanel from './MirrorAssets/MirrorAssetsPanel';
import * as MirrorAssetsSettings from "./MirrorAssets/MirrorAssetsSettings";

import AnchorPricePanel from './AnchorPrice/AnchorPricePanel';
import * as AnchorPriceSettings from "./AnchorPrice/AnchorPriceSettings";

import MirrorPricePanel from './MirrorPrice/MirrorPricePanel';
import * as MirrorPriceSettings from "./MirrorPrice/MirrorPriceSettings";

import TerraTransactionVolumePanel from './TerraTransactionVolume/TerraTransactionVolumePanel';
import * as TerraTransactionVolumeSettings from './TerraTransactionVolume/TerraTransactionVolumeSettings';

import TerraStakingReturnPanel from './TerraStakingReturn/TerraStakingReturnPanel';
import * as TerraStakingReturnSettings from './TerraStakingReturn/TerraStakingReturnSettings';

import TerraTaxRewardsPanel from './TerraTaxRewards/TerraTaxRewardsPanel';
import * as TerraTaxRewardsSettings from './TerraTaxRewards/TerraTaxRewardsSettings';

import TerraTotalAccountsPanel from './TerraTotalAccounts/TerraTotalAccountsPanel';
import * as TerraTotalAccountsSettings from './TerraTotalAccounts/TerraTotalAccountsSettings';

import LunaSupply from './LunaSupply/LunaSupplyPanel';
import * as LunaSupplySettings from './LunaSupply/LunaSupplySettings';

import WalletValidators from './WalletValidators/WalletValidatorsPanel';
import * as WalletValidatorsSettings from './WalletValidators/WalletValidatorsSettings';

import NativeTokenSupply from './NativeTokenSupply/NativeTokenSupplyPanel';
import * as NativeTokenSupplySettings from './NativeTokenSupply/NativeTokenSupplySettings';

import EmbeddedImage from './EmbeddedImage/EmbeddedImagePanel';
import * as EmbeddedImageSettings from './EmbeddedImage/EmbeddedImageSettings';

import AnchorTotalDeposits from './AnchorTotalDeposits/AnchorTotalDepositsPanel';
import * as AnchorTotalDepositsSettings from './AnchorTotalDeposits/AnchorTotalDepositsSettings';

import AnchorTotalCollateral from './AnchorTotalCollateral/AnchorTotalCollateralPanel';
import * as AnchorTotalCollateralSettings from './AnchorTotalCollateral/AnchorTotalCollateralSettings';

import AnchorRatePanel from "./AnchorRates/AnchorRatesPanel";
import * as AnchorRateSettings from './AnchorRates/AnchorRatesSettings';

import MineOverviewPanel from "./MineOverview/MineOverviewPanel";
import * as MineOverviewSettings from './MineOverview/MineOverviewSettings';

import MineProjectsPanel from "./MineProjects/MineProjectsPanel";
import * as MineProjectsSettings from './MineProjects/MineProjectsSettings';

import SpectrumVaultsPanel from "./SpectrumVaults/SpectrumVaultsPanel";
import * as SpectrumVaultsSettings from "./SpectrumVaults/SpectrumVaultsSettings";

import LiquidityPoolPanel from "./LiquidityPool/LiquidityPoolPanel";
import * as LiquidityPoolSettings from "./LiquidityPool/LiquidityPoolSettings";

import AnchorLiquidationBidsPanel from "./AnchorLiquidationBids/AnchorLiquidationBids";
import * as AnchorLiquidationBidsSettings from "./AnchorLiquidationBids/AnchorLiquidationBidsSettings";

export interface RegisteredWidget {
    name: string,
    group: string,
    value: string,
    component: () => JSX.Element,
    settingsComponent?: () => JSX.Element,
    defaultSettings: any,
    deprecated?: boolean
}

export const groups = {
    astroport: 'Astroport',
    terra: 'Terra',
    terraSwap: 'TerraSwap',
    mirror: 'Mirror',
    anchor: 'Anchor',
    loTerra: 'LoTerra',
    pylon: 'Pylon',
    spectrum: 'Spectrum',
    utility: 'Utility'
}

const widgets = [
    {
        name: 'Luna Price',
        group: groups.terra,
        value: 'LunaPrice',
        component: LunaPrice,
        settingsComponent: LunaPriceSettings.SettingsPanel,
        defaultSettings: LunaPriceSettings.defaults
    },
    {
        name: 'TerraSwap Contract',
        group: groups.terraSwap,
        value: 'TerraSwap',
        component: LiquidityPoolPanel,
        settingsComponent: LiquidityPoolSettings.SettingsPanel,
        defaultSettings: LiquidityPoolSettings.defaults,
        deprecated: true
    },
    {
        name: 'Terra Proposals',
        group: groups.terra,
        value: 'TerraProposals',
        component: TerraProposalsPanel,
        settingsComponent: TerraProposalSettings.SettingsPanel,
        defaultSettings: TerraProposalSettings.defaults
    },
    {
        name: 'Mirror Proposals',
        group: groups.mirror,
        value: 'MirrorProposals',
        component: MirrorProposalsPanel,
        settingsComponent: MirrorProposalsSettings.SettingsPanel,
        defaultSettings: MirrorProposalsSettings.defaults
    },
    {
        name: 'Anchor Proposals',
        group: groups.anchor,
        value: 'AnchorProposals',
        component: AnchorProposals,
        settingsComponent: AnchorProposalsSettings.SettingsPanel,
        defaultSettings: AnchorProposalsSettings.defaults
    },
    {
        name: 'Wallet',
        group: groups.terra,
        value: 'Wallet',
        component: WalletPanel,
        settingsComponent: WalletSettings.SettingsPanel,
        defaultSettings: WalletSettings.defaults
    },
    {
        name: 'Recent Transactions',
        group: groups.terra,
        value: 'RecentTransactions',
        component: RecentTransactionsPanel,
        settingsComponent: RecentTransactionsSettings.SettingsPanel,
        defaultSettings: RecentTransactionsSettings.defaults
    },
    {
        name: 'Mirrored Assets',
        group: groups.mirror,
        value: 'MirrorAssets',
        component: MirrorAssetsPanel,
        settingsComponent: MirrorAssetsSettings.SettingsPanel,
        defaultSettings: MirrorAssetsSettings.defaults
    },
    {
        name: 'Anchor Price',
        group: groups.anchor,
        value: 'AnchorPrice',
        component: AnchorPricePanel,
        settingsComponent: AnchorPriceSettings.SettingsPanel,
        defaultSettings: AnchorPriceSettings.defaults
    },
    {
        name: 'Mirror Price',
        group: groups.mirror,
        value: 'MirrorPrice',
        component: MirrorPricePanel,
        settingsComponent: MirrorPriceSettings.SettingsPanel,
        defaultSettings: MirrorPriceSettings.defaults
    },
    {
        name: 'Transaction Volume',
        group: groups.terra,
        value: 'TerraTransactionVolume',
        component: TerraTransactionVolumePanel,
        settingsComponent: TerraTransactionVolumeSettings.SettingsPanel,
        defaultSettings: TerraTransactionVolumeSettings.defaults
    },
    {
        name: 'Staking Return',
        group: groups.terra,
        value: 'TerraStakingReturn',
        component: TerraStakingReturnPanel,
        settingsComponent: TerraStakingReturnSettings.SettingsPanel,
        defaultSettings: TerraStakingReturnSettings.defaults
    },
    {
        name: 'Tax Rewards',
        group: groups.terra,
        value: 'TerraTaxRewards',
        component: TerraTaxRewardsPanel,
        settingsComponent: TerraTaxRewardsSettings.SettingsPanel,
        defaultSettings: TerraTaxRewardsSettings.defaults
    },
    {
        name: 'Total Accounts',
        group: groups.terra,
        value: 'TerraTotalAccounts',
        component: TerraTotalAccountsPanel,
        settingsComponent: TerraTotalAccountsSettings.SettingsPanel,
        defaultSettings: TerraTotalAccountsSettings.defaults
    },
    {
        name: 'Luna Supply',
        group: groups.terra,
        value: 'LunaSupply',
        component: LunaSupply,
        settingsComponent: LunaSupplySettings.SettingsPanel,
        defaultSettings: LunaSupplySettings.defaults
    },
    {
        name: 'Wallet Validators',
        group: groups.terra,
        value: 'WalletValidators',
        component: WalletValidators,
        settingsComponent: WalletValidatorsSettings.SettingsPanel,
        defaultSettings: WalletValidatorsSettings.defaults
    },
    {
        name: 'Native Token Supply',
        group: groups.terra,
        value: 'NativeTokenSupply',
        component: NativeTokenSupply,
        settingsComponent: NativeTokenSupplySettings.SettingsPanel,
        defaultSettings: NativeTokenSupplySettings.defaults
    },
    {
        name: 'Embedded Image',
        group: groups.utility,
        value: 'EmbeddedImage',
        component: EmbeddedImage,
        settingsComponent: EmbeddedImageSettings.SettingsPanel,
        defaultSettings: EmbeddedImageSettings.defaults
    },
    {
        name: 'Total Deposits',
        group: groups.anchor,
        value: 'AnchorTotalDeposits',
        component: AnchorTotalDeposits,
        settingsComponent: AnchorTotalDepositsSettings.SettingsPanel,
        defaultSettings: AnchorTotalDepositsSettings.defaults
    },
    {
        name: 'Total Collateral',
        group: groups.anchor,
        value: 'AnchorTotalCollateral',
        component: AnchorTotalCollateral,
        settingsComponent: AnchorTotalCollateralSettings.SettingsPanel,
        defaultSettings: AnchorTotalCollateralSettings.defaults
    },
    {
        name: 'Anchor Rates',
        group: groups.anchor,
        value: 'AnchorRates',
        component: AnchorRatePanel,
        settingsComponent: AnchorRateSettings.SettingsPanel,
        defaultSettings: AnchorRateSettings.defaults
    },
    {
        name: 'Mine Overview',
        group: groups.pylon,
        value: 'MineOverview',
        component: MineOverviewPanel,
        settingsComponent: MineOverviewSettings.SettingsPanel,
        defaultSettings: MineOverviewSettings.defaults
    },
    {
        name: 'Pylon Projects',
        group: groups.pylon,
        value: 'MineProjects',
        component: MineProjectsPanel,
        settingsComponent: MineProjectsSettings.SettingsPanel,
        defaultSettings: MineProjectsSettings.defaults
    },
    {
        name: 'Spectrum Vaults',
        group: groups.spectrum,
        value: 'SpectrumVaults',
        component: SpectrumVaultsPanel,
        settingsComponent: SpectrumVaultsSettings.SettingsPanel,
        defaultSettings: SpectrumVaultsSettings.defaults
    },
    {
        name: 'Liquidity Pool',
        group: groups.terra,
        value: 'LiquidityPool',
        component: LiquidityPoolPanel,
        settingsComponent: LiquidityPoolSettings.SettingsPanel,
        defaultSettings: LiquidityPoolSettings.defaults
    },
    {
        name: 'Anchor Liquidation Bids',
        group: groups.anchor,
        value: 'AnchorLiquidationBids',
        component: AnchorLiquidationBidsPanel,
        settingsComponent: AnchorLiquidationBidsSettings.SettingsPanel,
        defaultSettings: AnchorLiquidationBidsSettings.defaults
    }
].sort((a, b) => a.name.localeCompare(b.name)) as RegisteredWidget[];

export default widgets;
