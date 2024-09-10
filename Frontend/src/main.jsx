import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./helper.css";
import HomeScreen from "./Component/HomePage/HomeScreen.jsx";
import GameScreen from "./Component/GameScreen/GameScreen.jsx";
import QuitConfirm from "./Component/GameScreen/QuitConfirm.jsx";
import CreateGame from "./Component/HomePage/CreateHomeScreen.jsx";
import JoinGame from "./Component/HomePage/JoinHomeScreen.jsx";
import ResultPage from "./Component/Result/ResultPage.jsx";
import WaitingScreen from "./Component/HomePage/WaitingScreen.jsx";


const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeScreen />,
		errorElement: <div>404 Not Found</div>,
	},
	{
		path: "/gamescreen",
		element: <GameScreen />,
	},
	{
		path: "/quitconfirm",
		element: (
			<>
				<GameScreen />
				<QuitConfirm />
			</>
		),
	},
	{
		path: "/creategame",
		element: <CreateGame />,
	},
	{
		path: "/joingame",
		element: <JoinGame />,
	},
	{
		path: "/result",
		element: <ResultPage />,
	},
	{
		path: "/in-queue",
		element: <WaitingScreen />
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
