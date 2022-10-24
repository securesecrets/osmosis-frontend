import { useEffect, useState } from "react";
import { useStore } from "../../stores";

const IS_TESTNET = process.env.NEXT_PUBLIC_IS_TESTNET === "true";

/** Use transak-sdk to open their modal in our window. Bypasses our `react-modal` setup. */
export function useTransakModal(
  {
    onRequestClose,
    showOnMount,
  }: {
    onRequestClose?: () => void;
    showOnMount?: boolean;
  } = { showOnMount: false }
): {
  setModal: (show: boolean) => void;
} {
  const { chainStore, accountStore } = useStore();

  const account = accountStore.getAccount(chainStore.osmosis.chainId);

  const [transak, setTransak] = useState<any | null>(null);

  useEffect(() => {
    if (account.bech32Address !== "") {
      import("@transak/transak-sdk" as any).then(({ default: transakSdk }) => {
        const transak = new transakSdk({
          apiKey: IS_TESTNET
            ? "901b8814-ce22-46e4-813f-4f3e46cd96cb"
            : process.env.NEXT_PUBLIC_TRANSAK_KEY, // Your API Key
          environment: IS_TESTNET ? "STAGING" : "PRODUCTION", // STAGING/PRODUCTION
          widgetHeight: "625px",
          widgetWidth: "500px",
          // Examples of some of the customization parameters you can pass
          defaultCryptoCurrency: "OSMO", // Example 'ETH'
          walletAddress: account.bech32Address, // Your customer's wallet address
          themeColor: "#462ADF", // App theme color // wosmongton-700
          fiatCurrency: "USD", // If you want to limit fiat selectison eg 'USD'
          email: "", // Your customer's email address
          redirectURL: "",
        });

        setTransak(transak);

        // This will trigger when the user closed the widget
        transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
          transak.close();
          onRequestClose?.();
        });

        // This will trigger when the user marks payment is made.
        transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, () => {
          transak.close();
          onRequestClose?.();
        });
      });
    }
  }, [account.bech32Address]);

  useEffect(() => {
    if (showOnMount && transak) {
      transak.init();
    }
  }, [transak]);

  return {
    setModal: (show) => {
      if (show) transak?.init();
      else transak?.close();
    },
  };
}
