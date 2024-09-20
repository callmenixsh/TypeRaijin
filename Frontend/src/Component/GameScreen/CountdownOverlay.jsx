import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./GameScreen.css";

const CountdownOverlay = ({ onComplete }) => {
	const [countdown, setCountdown] = useState(3);

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		} else {
			setTimeout(() => onComplete(), 1000);
		}
	}, [countdown, onComplete]);

	return (
		<motion.div className="countdown-overlay">
			<motion.div
				className="countdown-text"
				key={countdown} // Add key to trigger re-animation
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 10 }}
			>
				{countdown > 0 ? countdown : "Type!"}
			</motion.div>
		</motion.div>
	);
};

export default CountdownOverlay;
