import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

app.use(cors());
app.get("/", (req, res) => {
	res.send("Sayonara Onii chan");
});

const PORT = process.env.PORT || 4000;

const rooms = {};

const generateRoomID = () => {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	return Array.from(
		{ length: 6 },
		() => alphabet[Math.floor(Math.random() * alphabet.length)]
	).join("");
};

let wordsList = [];
let usedWords = new Set();

const fetchRandomWords = async () => {
	try {
		while (wordsList.length < 200) {
			const response = await fetch(
				"https://random-word-api.herokuapp.com/word?number=100"
			);
			const data = await response.json();

			const filteredWords = data.filter((word) => word.length <= 10);

			wordsList = [...wordsList, ...filteredWords];
			if (wordsList.length > 200) {
				wordsList = wordsList.slice(0, 200);
			}
		}
		return wordsList;
	} catch (error) {
		console.error("Error fetching words:", error);
		return [];
	}
};

const getUniqueWord = () => {
	if (wordsList.length === 0) {
		console.error("No words left to select.");
		return null;
	}

	let randomWord = null;
	while (randomWord === null || usedWords.has(randomWord)) {
		if (wordsList.length === 0) {
			return null;
		}
		randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
	}

	usedWords.add(randomWord);
	wordsList = wordsList.filter((word) => word !== randomWord);

	return randomWord;
};

io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);

	socket.on("createRoom", ({ playerInfo }, callback) => {
		const roomId = generateRoomID();
		console.log(`Generated Room ID is: ${roomId}`);

		rooms[roomId] = {
			players: [{ id: socket.id, name: playerInfo.name, score: 0, ready: false, stats: {} }],
			readyCount: 0,
		};

		socket.join(roomId);
		callback({ roomId });
		console.log(`Room ${roomId} created by ${playerInfo.name}`);
	});

	socket.on("joinRoom", ({ roomId, username }, callback) => {
		const room = rooms[roomId];
		if (room) {
			if (room.gameStarted) {
				return callback({
					success: false,
					message: "Game has already started",
				});
			}

			socket.join(roomId);

			const existingPlayer = room.players.find((p) => p.id === socket.id);
			if (!existingPlayer) {
				room.players.push({
					id: socket.id,
					name: username,
					score: 0,
					ready: false,
					stats: {}
				});
			}

			io.in(roomId).emit("playerJoined", { players: room.players });

			callback({ success: true, players: room.players });
			console.log(`${username} joined room ${roomId}`);
		} else {
			callback({ success: false });
		}
	});

	socket.on("playerReady", ({ roomId, playerName }) => {
		const room = rooms[roomId];
		if (room) {
			const player = room.players.find((p) => p.name === playerName);
			if (player) {
				player.ready = true;
			}
			io.to(roomId).emit("playerReadyStatus", {
				players: room.players,
			});

			const allReady = room.players.every((p) => p.ready);
			if (allReady) {
				io.to(roomId).emit("gameStarted");
			}
		}
	});

	socket.on("leaveRoom", ({ roomId, username }) => {
		const room = rooms[roomId];
		if (room) {
			room.players = room.players.filter((player) => player.name !== username);

			io.in(roomId).emit("playerJoined", { players: room.players });

			socket.leave(roomId);

			if (room.players.length === 0) {
				delete rooms[roomId];
			}

			console.log(`${username} has left room ${roomId}`);
		}
	});

	socket.on("quitGame", ({ roomId, username }) => {
		const room = rooms[roomId];

		if (room) {
			room.players = room.players.filter(
				(player) => player.name !== username
			);

			io.to(roomId).emit("quitUpdate", {
				playerList: room.players,
			});

			if (room.players.length === 0) {
				delete rooms[roomId];
			}
		}
	});

	socket.on("disconnect", async () => {
		console.log("User disconnected:", socket.id);

		for (const roomId in rooms) {
			const room = rooms[roomId];
			const playerIndex = room.players.findIndex(
				(player) => player.id === socket.id
			);
			if (playerIndex !== -1) {
				room.players.splice(playerIndex, 1);
				io.in(roomId).emit("playerJoined", { players: room.players });

				if (room.players.length === 0) {
					delete rooms[roomId];
				}
			}
		}
	});

	socket.on("gamestart", async ({ roomId }) => {
		console.log(`Game started in room ${roomId}`);

		const room = rooms[roomId];

		if (!room) {
			console.error("Room not found");
			return;
		}
		if (room.gameStarted) {
			return;
		}

		if (wordsList.length < 200) {
			await fetchRandomWords();
		}

		console.log("Words fetched and ready:", wordsList.length);

		io.to(roomId).emit("sendWords", { words: wordsList });
		room.gameStarted = true;
	});

	socket.on("requestWord", () => {
		const uniqueWord = getUniqueWord();
		if (uniqueWord) {
			socket.emit("receiveWord", { word: uniqueWord });
		} else {
			socket.emit("noMoreWords");
		}
	});

	socket.on("requestPlayerList", ({ roomId }) => {
		const room = rooms[roomId];
		if (room) {
			const playerList = room.players.map((player) => ({
				name: player.name,
				score: player.score || 0,
			}));
			io.to(roomId).emit("updatePlayerList", { playerList });
		}
	});

	socket.on('updateScore', ({ roomId, score }) => {
		const room = rooms[roomId];
		if (room) {
			const player = room.players.find(p => p.id === socket.id);
			if (player) {
				player.score = score;
				io.to(roomId).emit('updatePlayerList', { playerList: room.players });
			}
		}
	});

	// socket.on('submitStats', ({ roomId, stats }) => {
	// 	const room = rooms[roomId];
	// 	if (room) {
	// 		const player = room.players.find(p => p.id === socket.id);
	// 		if (player) {
	// 			player.stats = stats;
	// 			io.to(roomId).emit('updatePlayerList', { playerList: room.players });
	// 		}
	// 	}
	// });

	socket.on('endGame', ({ roomId }) => {
		const room = rooms[roomId];
		if (room) {
			const sortedPlayers = room.players.sort((a, b) => b.score - a.score);
			io.to(roomId).emit('gameEnded', {
				leaderboardData: sortedPlayers,
			});
		}
	});



});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
