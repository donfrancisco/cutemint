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
import { useWallet } from "@solana/wallet-adapter-react";
import Card from "../components/Card";
import MintButton from "../components/MintButton";
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const PROGRAM_ADDRESS = "6gQTNGV2K32yFAJuq4ya1BmTJFAcnaZxMztTrz6nXixn";

const Home: NextPage = () => {
  // Here's how to get the thirdweb SDK instance
  const sdk = useSDK();
  // Get the nft collection

  const { data: program } = useProgram(PROGRAM_ADDRESS, "nft-collection");
  const { data: metadata, isLoading: loadingMetadata } =
    useProgramMetadata(program);
  const { data: nfts, isLoading } = useNFTs(program);

  const { publicKey } = useWallet();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <Image
            src="/cutemint.svg"
            height={60}
            width={100}
            objectFit="contain"
            alt="cutemint"
          />
          <h1 className={styles.h1}>cutemint</h1>
        </div>

        <div>
          <WalletMultiButton />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          {loadingMetadata ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <>
              <h1 className={styles.h1}>{metadata?.name}</h1>
              <div className={styles.iconContainer}>
                <img
                  className={styles.thumbnail}
                  src={String(metadata?.image)}
                  alt={String(metadata?.name)}
                  height={120}
                />
              </div>
              <p className={styles.explain}>{metadata?.description}</p>
              <div className={styles.buttons}>
                {publicKey && <MintButton />}
              </div>
              <div className={styles.galleryContainer}>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <main className={styles.gallery}>
                    {nfts?.map((nft, idx) => (
                      <Card key={idx} nft={nft} />
                    ))}
                  </main>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
