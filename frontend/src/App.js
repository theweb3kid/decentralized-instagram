import "./App.css";
import Header from "./components/Header";
import Uploader from "./components/Uploader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Stories from "./components/Stories";
import Post from "./components/Post";
import { ethers } from "ethers";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";
import DecentagramABI from "./components/assets/Decentragram.json";

const Main = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 100vh;
	background: rgba(0, 0, 0, 0.01);
	font-family: "IBM Plex Sans Thai Looped", sans-serif;
`;

function App() {
	const [clicked, setClicked] = useState(false);
	const [account, setAccount] = useState("");

	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log("Please Download Metamask");
			alert("Please Download Metamask :)");
		} else {
			console.log(
				"Metamask Found, Checking For Authorized Accounts...",
			);
			const accounts = await ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length !== 0) {
				setAccount(account[0]);
				console.log(
					"Authorized Account Found",
					accounts[0],
				);
			} else {
				console.log(
					"No Authorized Account Found, Please Connect An Account",
				);
				alert(
					"Hi, Click On The MetaMask Icon To Connect Your Wallet And See More Posts, Then You Can Click On Add Image Icon To Post An Image. Warning, Some Users Are Facing Issues With Loading Photos, Please Use Brave Browser Or VPN To Connect.",
				);
			}
		} 
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				console.log("Please Download Metamask");
			} else {
				console.log(
					"Please Approve Metamask Request...",
				);
				const accounts = await ethereum.request({
					method: "eth_requestAccounts",
				});

				if (accounts.length !== 0) {
					setAccount(account[0]);
					console.log(
						"Connected To",
						accounts[0],
					);
				} else {
					console.log(
						"Connection Request Wasn't Approved",
					);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const createSvg = () => {
		let svg = createAvatar(style, {
			seed: "Ojas",
			dataUri: true,
		});
		setSvg(svg);
	};

	const [svg, setSvg] = useState("");

	const contractAddress =
		"0x13E171DE8C7F6aba1368E000e9Fc4148ecf00D90";
	const ABI = DecentagramABI.abi;

	const post = async (
		imgHash,
		postTitle,
		postDescription,
	) => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider =
					new ethers.providers.Web3Provider(
						ethereum,
					);
				const signer = provider.getSigner();
				const decentragramContract =
					new ethers.Contract(
						contractAddress,
						ABI,
						signer,
					);

				let uploadImageFunction =
					await decentragramContract.uploadImage(
						imgHash,
						postTitle,
						postDescription,
					);
				await uploadImageFunction.wait();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const [posts, setPosts] = useState([]);

	const getAllPosts = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider =
					new ethers.providers.Web3Provider(
						ethereum,
					);
				const signer = provider.getSigner();
				const decentragramContract =
					new ethers.Contract(
						contractAddress,
						ABI,
						signer,
					);

				let getUploadedImagesFunction =
					await decentragramContract.getUploadedImages();
				setPosts(getUploadedImagesFunction);
				console.log(getUploadedImagesFunction);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
		getAllPosts();
		createSvg();
	}, []);

	return (
		<div className="App">
			<Main>
				<Header
					setClicked={setClicked}
					clicked={clicked}
					connectWallet={connectWallet}
				/>
				{clicked ? (
					<Uploader
						setClicked={setClicked}
						clicked={clicked}
						post={post}
					/>
				) : (
					""
				)}
				<Stories />
				<Post
					title={"Just A Demo Post"}
					img={svg}
					description={
						"This is just a sample of how your post will look like, thanks for your love and support..."
					}
					sender={"Ojas"}
				/>
				{posts.map((post) => (
					<Post
						key={post[0].toNumber()}
						title={post[2]}
						img={post[1]}
						description={post[3]}
						sender={post[5]}
					/>
				))}
			</Main>
		</div>
	);
}

export default App;
