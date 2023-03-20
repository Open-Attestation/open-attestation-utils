import { useEffect, useState, useRef } from "react";
import { useRefresh } from "./useRefresh";

const gasApi = {
  ethereum: "https://api.blocknative.com/gasprices/blockprices",
  polygon: "https://api.blocknative.com/gasprices/blockprices?chainid=137",
};

const gasApiOptions = () => {
  return {
    headers: {
      Authorization: "",
    },
  };
};

const parseGasRes = (res: any) => {
  const estPrice = res.blockPrices[0].estimatedPrices[0];
  if (estPrice.price || estPrice.maxPriorityFeePerGas) {
    return estPrice.price + estPrice.maxPriorityFeePerGas;
  }
  return 0;
};

const priceApi = {
  ethereum: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
  polygon: "https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD",
};

type chainType = "ethereum" | "polygon";

const fetchGasCostData = async (chain: chainType) => {
  try {
    const [ethReq, gweiReq] = await Promise.all([fetch(priceApi[chain]), fetch(gasApi[chain], gasApiOptions())]);
    const [ethRes, gweiRes] = await Promise.all([ethReq.json(), gweiReq.json()]);

    return {
      price: ethRes.USD,
      gwei: parseGasRes(gweiRes),
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
    }
  }
};

export const useFetchGasCost = (chain: chainType, interval = 0): { price: number; gwei: number } => {
  const [price, setPrice] = useState(0);
  const [gwei, setGwei] = useState(0);
  const tick = useRefresh(interval);
  const isMounted = useRef(true);
  const fetchData = async () => {
    const data = await fetchGasCostData(chain);
    if (!isMounted || !data) return;
    setPrice(data.price);
    setGwei(data.gwei);
  };

  useEffect(() => {
    fetchData();
    isMounted.current = false;
  }, [tick]);

  return { price, gwei };
};
