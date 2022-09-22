import React, { useState } from "react";
import styled from "styled-components";
import instagramLogo from "./assets/instagram.png";
import addImage from "./assets/addImage.png";
import metamask from "./assets/metamask.png";

const Main = styled.div`
	position: absolute;
	top: 0;
	width: 100vw;
	padding: 1vh 0;
	display: flex;
	align-items: center;
	background: white;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	justify-content: space-evenly;

	input:focus {
		outline: none;
	}

	label {
		cursor: pointer;
		/* Style as you please, it will become the visible UI component. */
	}

	#upload-photo {
		opacity: 0;
		position: absolute;
		z-index: -1;
	}
`;

const InstagramLogo = styled.img`
	height: 40px;
	margin-left: 2vw;
	cursor: pointer;
`;

const SearchBar = styled.input`
	height: 35px;
	width: 60vw;
	margin: 0;
	padding-left: 2vw;
	border: none;
	background: rgba(0, 0, 0, 0.05);
	cursor: not-allowed;
`;

const AddImage = styled.img`
	height: 40px;
	margin-right: 2vw;
	cursor: pointer;
`;

const Metamask = styled.img`
	height: 40px;
	cursor: pointer;
`;

const Header = (props) => {
	const handleClick = () => {
		props.setClicked(true);
	};

	return (
		<Main>
			<InstagramLogo src={instagramLogo} />
			<SearchBar
				type={"search"}
				placeholder="Search"
				disabled
			/>
			<Metamask src={metamask} onClick={e => props.connectWallet()} />
			<AddImage
				src={addImage}
				onClick={handleClick}
			/>
		</Main>
	);
};

export default Header;
