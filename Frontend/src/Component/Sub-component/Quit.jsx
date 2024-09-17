import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Quit = ({ roomId }) => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername) {
			setUsername(storedUsername);
		}
	}, []);

	const onQuitClick = () => {
		navigate("/quitconfirm", {
			state: { roomId, username },
		});
	};

	return (
		<div className="quits" onClick={onQuitClick}>
			QUIT
		</div>
	);
};

export default Quit;
