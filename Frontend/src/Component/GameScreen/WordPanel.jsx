import React, { useState, useEffect, useRef } from "react";
import "./WordPanel.css";

const WordPanel = ({ showCountdown }) => {
	const [words, setWords] = useState([]);
	const wordsList = useRef([]);
	const usedWords = useRef(new Set());
	const panelRef = useRef(null); // Reference to the panel for position calculations

	// Function to fetch words from the API
	const fetchRandomWords = async () => {
		try {
			const response = await fetch(
				"https://random-word-api.herokuapp.com/word?number=10"
			);
			const data = await response.json();
			const filteredWords = data.filter((word) => word.length <= 10);

			// Update wordsList with new words
			wordsList.current = [...wordsList.current, ...filteredWords];
		} catch (error) {
			console.error("Error fetching words:", error);
		}
	};

	// Function to check if a new word overlaps with existing words
	const isOverlapping = (newY, wordHeight) => {
		const panel = panelRef.current;
		if (!panel) return false;

		return words.some((word) => {
			const existingWordTop = word.yPos;
			const existingWordBottom = existingWordTop + wordHeight;

			return (
				(newY >= existingWordTop && newY < existingWordBottom) ||
				(newY + wordHeight > existingWordTop &&
					newY + wordHeight <= existingWordBottom)
			);
		});
	};

	// Function to get a random unique word
	const getUniqueWord = () => {
		if (wordsList.current.length === 0) {
			fetchRandomWords();
			return null;
		}

		let randomWord = null;
		while (randomWord === null || usedWords.current.has(randomWord)) {
			if (wordsList.current.length === 0) {
				return null; // No more words available
			}
			randomWord =
				wordsList.current[Math.floor(Math.random() * wordsList.current.length)];
		}

		usedWords.current.add(randomWord);
		wordsList.current = wordsList.current.filter((word) => word !== randomWord);
		return randomWord;
	};

	useEffect(() => {
		fetchRandomWords();

		if (!showCountdown) {
			const wordInterval = setInterval(() => {
				let randomWord = getUniqueWord();
				if (!randomWord) return;

				let wordHeight = 20;
				let randomY = Math.random() * (100 - wordHeight);

				// Add the word to the state
				setWords((prevWords) => [
					...prevWords,
					{ text: randomWord, id: Date.now(), yPos: randomY },
				]);
			}, 2000);

			return () => clearInterval(wordInterval);
		}
	}, [showCountdown]);

	return (
		<div className="wordPanel" ref={panelRef}>
			{words.map((word) => (
				<div key={word.id} className="word" style={{ top: `${word.yPos}%` }}>
					<p>{word.text}</p>
				</div>
			))}
		</div>
	);
};

export default WordPanel;
