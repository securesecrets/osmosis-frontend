import { RatePretty } from "@keplr-wallet/unit";
import { IPriceStore } from "../../price";
import { ObservableQueryGuage } from "../incentives";
import { ObservableQueryEpochProvisions, ObservableQueryMintParmas } from "../mint";
import { ObservableQueryPool } from "../pools";
export declare class ExternalPoolIncentives {
    protected readonly pool: ObservableQueryPool;
    protected readonly priceStore: IPriceStore;
    protected readonly queryGauge: ObservableQueryGuage;
    protected readonly queryMintParams: ObservableQueryMintParmas;
    protected readonly queryEpochProvision: ObservableQueryEpochProvisions;
    constructor(pool: ObservableQueryPool, priceStore: IPriceStore, queryGauge: ObservableQueryGuage, queryMintParams: ObservableQueryMintParmas, queryEpochProvision: ObservableQueryEpochProvisions);
    readonly computeExternalIncentiveGaugeApy: (gaugeId: string) => RatePretty;
}
