import type { NextPage } from "next";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { IncentivizedPoolCard, MyPools } from "../../components/cards";
import { OverviewLabelValue } from "../../components/overview-label-value";
import { LeftTime } from "../../components/left-time";
import { Button } from "../../components/buttons/button";

const Pools: NextPage = observer(function () {
  const { chainStore, accountStore, queriesOsmosisStore } = useStore();

  const chainInfo = chainStore.getChain("osmosis");

  const queryOsmosis = queriesOsmosisStore.get(chainInfo.chainId);
  const account = accountStore.getAccount(chainInfo.chainId);

  const myPools = queryOsmosis.queryGammPoolShare.getOwnPools(
    account.bech32Address
  );
  const incentivizedPools =
    queryOsmosis.queryIncentivizedPools.incentivizedPools;
  // const allPools = queryOsmosis.queryGammPools.getPoolsDescendingOrderTVL();

  return (
    <main>
      <section className="bg-background">
        <div className="max-w-container mx-auto">
          <div className="bg-[url('/images/osmosis-pool-machine.png')] bg-right bg-contain bg-no-repeat p-10">
            <div className="flex items-center">
              <h5 className="text-white-full">Active Pools</h5>
              <Button color="primary" size="sm" className="ml-6">
                Create New Pool
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-20">
              <OverviewLabelValue label="OSMO Price" value="$10" />
              <OverviewLabelValue
                label="Reward distribution in"
                value={<LeftTime hour="08" minute="20" />}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface">
        <div className="max-w-container mx-auto p-10">
          <h5>My Pools</h5>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {myPools.map((poolId) => {
              const pool = queryOsmosis.queryGammPools.getPool(poolId);
              if (pool) {
                return <IncentivizedPoolCard pool={pool} key={pool.id} />;
              }
            })}
          </div>
        </div>
      </section>
      <section className="bg-background">
        <div className="max-w-container mx-auto p-10">
          <h5>Incentivized Pools</h5>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {incentivizedPools.map((poolId) => {
              const pool = queryOsmosis.queryGammPools.getPool(poolId);
              if (pool) {
                return <MyPools pool={pool} key={pool.id} />;
              }
            })}
          </div>
        </div>
      </section>
      <section className="bg-surface">
        <div className="max-w-container mx-auto p-10">
          <div className="flex items-center justify-between">
            <h5>All Pools</h5>
            <label
              htmlFor="show-all-pools"
              className="text-base flex items-center"
            >
              <input className="mr-2" id="show-all-pools" type="checkbox" />
              Show pools less then $1,000 TVL
            </label>
          </div>
          <table className="mt-4 w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Token Info</th>
                <th>TVL</th>
                <th>24h Volume</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  50% ATOM, 50% OSMO
                  <span className="ml-2 rounded-lg bg-card py-1 px-1.5">
                    0.3%
                  </span>
                </td>
                <td>$466,803,653</td>
                <td>$28,646,361</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  50% ATOM, 25% OSMO, 25% REGEN
                  <span className="ml-2 rounded-lg bg-card py-1 px-1.5">
                    0.3%
                  </span>
                </td>
                <td>$466,803,653</td>
                <td>$28,646,361</td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  50% ATOM, 50% OSMO
                  <span className="ml-2 rounded-lg bg-card py-1 px-1.5">
                    0.3%
                  </span>
                </td>
                <td>$466,803,653</td>
                <td>$28,646,361</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
});

export default Pools;