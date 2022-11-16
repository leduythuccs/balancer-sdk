import {HistoricalPriceRequest, PoolJoinExit, PoolJoinExitRepository, TokenPriceProvider} from "@/modules/data";
import {Pool, PoolType, Price, Searchable} from "@/types";

export const MOCK_POOLS: {[key:string]: Pool} = {
  WeightedPool_1: {
    chainId: 1,
    name: "WeightedPool",
    id: "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014",
    address: "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56",
    swapFee: "0.002",
    swapEnabled: true,
    tokens: [
      {
        address: "0x6b175474e89094c44da98b954eedeac495271d0f",
        balance: "10000000000000",
        decimals: 18,
        weight: "0.5",
        priceRate: "1",
        symbol: "DAI"
      },
      {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        balance: "20000000000000",
        decimals: 6,
        weight: "0.5",
        priceRate: "1",
        symbol: "USDC"
      }
    ],
    tokensList: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    ],
    totalWeight: "10",
    totalShares: "10000000000000",
    totalLiquidity: "10000000000000",
    poolType: PoolType.Weighted
  },
  WeightedPool_2: {
    chainId: 1,
    name: "WeightedPool",
    id: "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014",
    address: "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56",
    swapFee: "0.002",
    swapEnabled: true,
    tokens: [
      {
        address: "0x6b175474e89094c44da98b954eedeac495271d0f",
        balance: "10000000000000",
        decimals: 18,
        weight: "0.5",
        priceRate: "1",
        symbol: "DAI"
      },
      {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        balance: "20000000000000",
        decimals: 6,
        weight: "0.5",
        priceRate: "1",
        symbol: "USDC"
      }
    ],
    tokensList: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    ],
    totalWeight: "10",
    totalShares: "10000000000000",
    totalLiquidity: "10000000000000",
    poolType: PoolType.Weighted
  },
  StablePool: {
    chainId: 1,
    name: "StablePool",
    id: "0xc45d42f801105e861e86658648e3678ad7aa70f900010000000000000000011e",
    address: "0xc45d42f801105e861e86658648e3678ad7aa70f9",
    swapFee: "0.0004",
    swapEnabled: true,
    amp: "10",
    tokens: [
      {
        address: "0x6b175474e89094c44da98b954eedeac495271d0f",
        balance: "10000000",
        decimals: 18,
        weight: "0.3",
        priceRate: "1",
        symbol: "DAI"
      },
      {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        balance: "10000000",
        decimals: 6,
        weight: "0.3",
        priceRate: "1",
        symbol: "USDC"
      },
      {
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        balance: "10000000",
        decimals: 6,
        weight: "0.4",
        priceRate: "1",
        symbol: "USDT"
      }
    ],
    tokensList: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7"
    ],
    totalWeight: "10",
    totalShares: "100000",
    totalLiquidity: "10000000000000",
    poolType: PoolType.Stable
  },
};

export class MockPoolJoinExitRepository extends PoolJoinExitRepository {

  query(args: any): Promise<PoolJoinExit[]> {
    return Promise.resolve([{
      id: '',
      userAddress: '',
      poolId: '',
      timestamp: 1666272901,
      type: '',
      amounts: [],
      tokens: []
    }]);
  }

}


export const MOCK_PRICES = new Map<string, Price>([
  ['0x6b175474e89094c44da98b954eedeac495271d0f', { usd: '1.002'}],
  ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', { usd: '1.002'}],
  ['0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', { usd: '1.002'}],
  ['0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4', { usd: '1.002'}],
]);

export const MOCK_HISTORICAL_PRICES = new Map<string, {[timestamp:number]: Price}>([
  ['0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', { 1666276501: { usd: '0.9993785272283172'}}],
  ['0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4', { 1666276501: { usd: '1.9996776052990013'}}],
]);

export class MockPriceProvider extends TokenPriceProvider {

  async find(address: string): Promise<Price | undefined> {
    return MOCK_PRICES.get(address);
  }

  async findBy<V = string | HistoricalPriceRequest>(attribute: string, value: V): Promise<Price | undefined> {
    const req = value as unknown as HistoricalPriceRequest;
    const historicalPrice = (MOCK_HISTORICAL_PRICES.has(req.address)) ? MOCK_HISTORICAL_PRICES.get(req.address) : undefined;
    return historicalPrice ? historicalPrice[req.timestamp] : undefined;
  }

}