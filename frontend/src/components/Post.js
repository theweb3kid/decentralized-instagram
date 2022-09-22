import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";
import heart from "./assets/heart.png";
import save from "./assets/save.png";
import menu from "./assets/menu.png";

const Main = styled.div`
	width: 80vw;
	height: 80vh;
	background: white;
	margin: 0 10vw 5vh 10vw;
	border: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
`;

const Top = styled.div`
	width: 100%;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	height: 12%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.user {
		height: 50px;
		width: 50px;
		border-radius: 25px;
		border: 1px solid rgba(0, 0, 0, 0.4);
		padding: 2px;
	}

	div {
		display: flex;
		margin-left: 5%;
		align-items: center;
		width: auto;
	}

	h4 {
		padding: none;
		margin: 0 5%;
		margin-left: 15%;
		width: 200px;
		overflow-x: hidden;
		text-align: left;
	}

	.menu {
		height: 30px;
		width: 30px;
		margin-right: 5%;
	}
`;

const Mid = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	height: 60%;
	display: flex;
	align-items: center;
	background: rgba(0, 0, 0, 0.03);
	display: flex;
	justify-content: center;

	img {
		height: 100%;
		background: rgba(255, 255, 255);
		max-width: 100%;
	}

	h6 {
		position: absolute;
		color: red;
		width: 60%;
	}
`;

const Bottom = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	padding: 0 5vw;
	overflow-y: hidden;
	height: 28%;

	div {
		display: flex;
		justify-content: space-between;
		padding: 0.5vh 0;
	}

	.imgOne {
		height: 30px;
	}

	.imgTwo {
		height: 25px;
	}

	.strong {
		font-weight: 800;
	}

	h5 {
		margin-bottom: 0.5vh
		padding: none;
	}
`;

const Post = (props) => {
	let svg = createAvatar(style, {
		seed: props.sender,
		dataUri: true,
	});


	return (
		<Main>
			<Top>
				<div>
					<img className="user" src={svg} />
					<h4>{props.sender}</h4>
				</div>
				<img className="menu" src={menu} />
			</Top>
			<Mid>
				
				<img
					src={props.img ? props.img : svg}
					alt={
						`If Image Is Not Displayed, You Can Open This Link In Brave Browser Or Connect Through VPN To US Network: ` +
						props.img
					}
				/>
				{props.img ? (
					""
				) : (
					<h6>
						Sorry, Image Could Not Be Loaded Due
						To Some Network Issues, Showing An
						Dummy Image. Use VPN To Connect With
						US Server And Try Again! Here Is The
						Link To The Original Image:{" "}
						<a>{props.img}</a>
					</h6>
				)}
			</Mid>
			<Bottom>
				<div>
					<img className="imgOne" src={heart} />
					<img className="imgTwo" src={save} />
				</div>
				<h5 className="strong">{props.title}</h5>
				<h5>{props.description}</h5>
			</Bottom>
		</Main>
	);
};

export default Post;
