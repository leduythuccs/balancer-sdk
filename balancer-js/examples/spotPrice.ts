import dotenv from 'dotenv';
import {
  BalancerSDK,
  Network,
  BalancerSdkConfig,
  BalancerError,
  BalancerErrorCode,
} from '../src/index';
import { ADDRESSES } from '../src/test/lib/constants';

dotenv.config();

const network = Network.MAINNET;
const config: BalancerSdkConfig = {
  network,
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA}`,
};

const balancer = new BalancerSDK(config);

/*
Uses SDK to find spot price for pair in specific pool.
*/
async function getSpotPricePool() {
  const poolId =
    '0x8e85e97ed19c0fa13b2549309965291fbbc0048b0000000000000000000003ba';
  const phantomStablePool = await balancer.pools.find(poolId);
  if (!phantomStablePool)
    throw new BalancerError(BalancerErrorCode.POOL_DOESNT_EXIST);

  const spotPriceBptWsteth = await phantomStablePool.calcSpotPrice(
    ADDRESSES[network].wSTETH.address,
    '0x8e85e97ed19c0fa13b2549309965291fbbc0048b',
  );
  console.log(spotPriceBptWsteth.toString());
}

/*
Uses SDK to find most liquid path for a pair and calculate spot price.
*/
async function getSpotPriceMostLiquid() {
  // This will fetch pools information using data provider
  const spotPriceEthDai = await balancer.pricing.getSpotPrice(
    ADDRESSES[network].DAI.address,
    ADDRESSES[network].WETH.address
  );
  console.log(spotPriceEthDai.toString());

  // Reuses previously fetched pools data
  const pools = balancer.pricing.getPools();
  const spotPriceBalDai = await balancer.pricing.getSpotPrice(
    ADDRESSES[network].DAI.address,
    ADDRESSES[network].BAL.address,
    pools
  );
  console.log(spotPriceBalDai.toString());
}

// yarn examples:run ./examples/spotPrice.ts
getSpotPricePool();
// getSpotPriceMostLiquid();
