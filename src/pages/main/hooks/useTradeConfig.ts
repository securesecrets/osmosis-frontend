import { ChainGetter, IQueriesStore, ObservableQueryBalances } from '@keplr-wallet/stores';
import { useState } from 'react';
import { ObservableQueryPools } from '../../../stores/osmosis/query/pools';
import { GammSwapManager } from '../../../stores/osmosis/swap';
import { TradeConfig } from '../stores/trade/config';
import { OsmosisQueries } from 'src/stores/osmosis/query';

export const useTradeConfig = (
	chainGetter: ChainGetter,
	queriesStore: IQueriesStore<OsmosisQueries>,
	chainId: string,
	sender: string,
	swapManager: GammSwapManager
) => {
	const [config] = useState(() => new TradeConfig(chainGetter, queriesStore, chainId, sender, swapManager));
	config.setChain(chainId);
	config.setSender(sender);

	return config;
};
