import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  useProgram,
  useProgramMetadata,
  useNFTs,
  useSDK,
} from "@thirdweb-dev/react/solana";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const PROGRAM_ADDRESS = "6gQTNGV2K32yFAJuq4ya1BmTJFAcnaZxMztTrz6nXixn";

const Home: NextPage = () => {
  // Here's how to get the thirdweb SDK instance
  const sdk = useSDK();
  // Get the nft collection
  const { program } = useProgram(
    "6gQTNGV2K32yFAJuq4ya1BmTJFAcnaZxMztTrz6nXixn",
    "nft-collection"
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Image
            src="/cutemint.svg"
            height={60}
            width={100}
            objectFit="contain"
            alt="cutemint"
          />
          <h1 className={styles.h1}>cutemint</h1>
        </div>

        <WalletMultiButton />
      </div>
    </>
  );
};

export default Home;
