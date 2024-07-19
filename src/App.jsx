import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Gwangjin from "./pages/Gwangjin.jsx";
import Login from "./pages/Login.jsx";

function App() {
	return (
		<div id='root' className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/Login' element={<Login />} />
				<Route path='/Gwangjin' element={<Gwangjin />} />
			</Routes>
		</div>
	);
}

export default App;
