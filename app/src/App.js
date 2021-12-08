import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";
import { Heading, Text, Stack, Image } from "@chakra-ui/react";

// Constants
const TWITTER_HANDLE = "clague17";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Feature = ({ title, desc, ...rest }) => (
  <div>
    <Heading fontSize={"72px"}>{title}</Heading>
    <Text mt={4} fontSize={"36px"}>
      {desc}
    </Text>
  </div>
);

const App = () => {
  // Actions

  const [walletAddress, setWalletAddress] = useState(null);

  /*
   * Declare your function
   */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          // try to connect here
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => {
    return (
      <div id="renderNotConnectedContainer">
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
    );
  };

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <Stack spacing={8} align="center">
            <Feature
              title={"🍭 PokeCandy Drop"}
              desc={"NFT drop machine to catch 'em all"}
            />

            <Image
              src={
                "https://media2.giphy.com/media/fSvqyvXn1M3btN8sDh/giphy.gif?cid=ecf05e47f3cmli4l64unl59820kxmcaocd0855t7s1hfsk5v&rid=giphy.gif&ct=g"
              }
              boxSize="300px"
              objectFit="cover"
              alt="dancing pikachu"
              borderRadius="20"
              maxWidth="100%"
            />
            {!walletAddress && renderNotConnectedContainer()}
          </Stack>
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
