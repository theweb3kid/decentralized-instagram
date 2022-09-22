import React, { useEffect } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";
import styled from "styled-components";
import names from "random-names-generator";

const StoriesSection = styled.div`
	min-width: 80vw;
	display: flex;
	justify-content: space-evenly;
	margin: 10vh 10vw 5vh 10vw;
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 1vh 0;
	background-color: white;
	overflow-x: scroll;

	.div {
		margin-right: 20px;
	}

	img {
		height: 60px;
		width: 60px;
		border-radius: 30px;
		border: 1px solid rgba(0, 0, 0, 0.4);
		padding: 2px;
	}

	h6 {
		font-size: 15px;
		margin: 5px 0 0 0;
		padding: 0;
		text-align: center;
	}
`;

const Stories = () => {
	let Avatars = [];

	for (let i = 0; i <= 20; i++) {
		let svg = createAvatar(style, {
			seed: Avatars[i - 1],
			dataUri: true,
		});
		Avatars.push(svg);
	}

	return (
		<StoriesSection>
			{Avatars.map((source) => (
				<div key={source} className="div">
					<img src={source} />
					<h6>{names.random()}</h6>
				</div>
			))}
		</StoriesSection>
	);
};

export default Stories;
