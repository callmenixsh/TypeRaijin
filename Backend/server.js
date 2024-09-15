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

app.get("/", (req, res) => {
	res.send("Hello World!");
});

const PORT = process.env.PORT || 4000;

// Store room data with player details
const rooms = {};

// Function to generate a unique room ID
const generateRoomID = () => {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	return Array.from(
		{ length: 6 },
		() => alphabet[Math.floor(Math.random() * alphabet.length)]
	).join("");
};

// Socket.io connection
io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);

	// Handle room creation
	socket.on("createRoom", ({ playerInfo }, callback) => {
		const roomId = generateRoomID();
		console.log(`Generated Room ID is: ${roomId}`);

		rooms[roomId] = {
			players: [{ id: socket.id, name: playerInfo.name, ready: false }],
			readyCount: 0,
		};

		socket.join(roomId);
		callback({ roomId });
		console.log(`Room ${roomId} created by ${playerInfo.name}`);
	});

	// Handle joining a room
	socket.on("joinRoom", ({ roomId, username }, callback) => {
		if (rooms[roomId]) {
			socket.join(roomId);

			const existingPlayer = rooms[roomId].players.find(p => p.id === socket.id);
			if (!existingPlayer) {
				rooms[roomId].players.push({
					id: socket.id,
					name: username,
					ready: false,
				});
			}

			// Emit the updated player list to all players in the room
			io.in(roomId).emit("playerJoined", { players: rooms[roomId].players });

			// Confirm join for the client
			callback({ success: true, players: rooms[roomId].players });
			console.log(`${username} joined room ${roomId}`);
		} else {
			callback({ success: false });
		}
	});

	// Handle when a player marks as ready
	socket.on("playerReady", ({ roomId, playerName }) => {
		if (rooms[roomId]) {
			const player = rooms[roomId].players.find((p) => p.name === playerName);
			if (player) {
				player.ready = true;
			}
			io.to(roomId).emit("playerReadyStatus", { players: rooms[roomId].players });

			// Check if all players are ready
			const allReady = rooms[roomId].players.every((p) => p.ready);
			if (allReady) {
				io.to(roomId).emit("gameStarted");
			}
		}
	});

	// Handle leaving the room
	socket.on('leaveRoom', ({ roomId, username }) => {
		const room = rooms[roomId];
		if (room) {
			// Remove the player from the room
			room.players = room.players.filter(player => player.name !== username);

			// Emit updated player list to all clients in the room
			io.in(roomId).emit('playerJoined', { players: room.players });

			// Leave the socket room
			socket.leave(roomId);

			// If no players are left in the room, delete the room
			if (room.players.length === 0) {
				delete rooms[roomId];
			}

			console.log(`${username} has left room ${roomId}`);
		}
	});

	// Handle player disconnection
	socket.on("disconnect", async () => {
		console.log("User disconnected:", socket.id);

		// Remove player from rooms
		for (const roomId in rooms) {
			const room = rooms[roomId];
			const playerIndex = room.players.findIndex((player) => player.id === socket.id);
			if (playerIndex !== -1) {
				room.players.splice(playerIndex, 1);
				io.in(roomId).emit('playerJoined', { players: room.players });

				// Delete room if empty
				if (room.players.length === 0) {
					delete rooms[roomId];
				}
			}
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
