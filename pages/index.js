import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import banner from "/img/banner.png";
import gif from "/img/pengus.gif";
import { Contract, providers, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";



export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const web3ModalRef = useRef();

  const publicMint = async () => {
    try {
      console.log("Public mint");
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await nftContract.mint({
        value: utils.parseEther("0.003"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("Successfull minting");
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _tokenIds = await nftContract.tokenIds();
      console.log("tokenIds", _tokenIds);
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 8453) {
      window.alert("Base network has to be selected");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "base",
        providerOptions: {},
        disableInjectedProvider: false,
      });


      getTokenIdsMinted();

      setInterval(async function () {
        await getTokenIdsMinted();
      }, 5 * 1000);
    }
  }, [walletConnected]);

  const renderButton = () => {
    if (!walletConnected) {
      return <button onClick={connectWallet}>Connect your wallet</button>;
    }

    if (loading) {
      return <button className={styles.button}>Loading...</button>;
    }

    return (
      <button className={styles.button} onClick={publicMint}>
        Public Mint 🚀
      </button>
      
    );
  };
  
  
  return (
    
    <div>
      
      <nav id="header" className="w-full z-30 top-0 text-white py-1 lg:py-6 bg-black">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2 lg:py-6">
      
          <div className="pl-4 flex items-center">
          
            <a
              className="text-white text-center no-underline hover:no-underline font-bold text-2xl lg:text-4xl text-white"
              href="#"
            >
              
              
               
              Based Pengus
            </a>
            
          </div>

          <div
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20" id="nav-content">
            
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <a
                  className="inline-block py-2 px-4 text-black font-bold no-underline"
                  href="#"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto h-screen " style={{
      backgroundImage: `url(${banner.src})`,
      width: '100%',
      height: '100%',
      backgroundRepeat: 'repeat',

          }}>
        <div className="flex justify-center items-center">
          <div className=" text-black text-center  ">
          <iframe
            src="https://embed.ipfscdn.io/ipfs/bafybeihazpt6pkm4azgtupdz7hc2j3o4zpjsvtcgfq4t2keozxkss3ud6q/?contract=0x7758AD796E9d19C93541285489000e3Fb8B2C24d&chain=%7B%22name%22%3A%22Base%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fbase.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22base%22%2C%22chainId%22%3A8453%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22base%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmW5Vn15HeRkScMfPcW12ZdZcC2yUASpu6eCsECRdEmjjj%2Fbase-512.png%22%2C%22height%22%3A512%2C%22width%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=b3d9e96913cb595be8c9b32efc5fddcc&primaryColor=blue"
            width="600"
            height="600"
            
            frameborder="0"
          ></iframe>
          </div>
        </div>
      </div>
      v
      <section className="bg-gray-100 border-b py-8">
      
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-gray-800">
            RoadMap
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div className="flex flex-wrap ">
            <div className="w-full p-6 sm:w-1/2">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">
                Base Summer festival
              </h3>
              <Image
                alt="Mountains"
                src={banner}
                placeholder="blur"
                quality={100}
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                }}
              />
              <p className="text-gray-600 mb-8 text-center">
                Adopt a pengu to spend the festivities together with your new pal 
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6 text-center">
              
                <h3 className="text-3xl text-gray-800 font-bold leading-none text-center">
                  Sneak peak!
                  
                </h3>
                
                <Image
                
                  src={gif}
                  width={200}
                  height={200}
                  a
                 
                />  
             
                <p className="text-gray-600 mb-8 text-center">
                After one week, or when all 5000 pengus have been adopted they will be revealed to the world
                  <br />
                  <br />
                </p>
              
            </div>
            <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-gray-800">
            More info coming soon!
          </h2>

          </div>
          
          <div className="flex-1 flex-wrap sm:w-1/2">
          <p className="uppercase font-extrabold text-gray-500 md:mb-6">
                Social
              </p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="https://discord.gg/ehJtCZDscc"
                    className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                  >
                    Discord
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="https://basescan.org/address/0x7758ad796e9d19c93541285489000e3fb8b2c24d"
                    className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                  >
                    Contract
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="https://www.twitter.com/pengu_nft/"
                    className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
      </section>
      
          </div>
         
  );
  
}
