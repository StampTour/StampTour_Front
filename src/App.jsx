import {Route, Routes} from "react-router-dom";
import "./css/App.css";
import "./css/index.css";
import "./css/font.css";
import Home from "./pages/Home.jsx";
import Gwangjin from "./pages/Gwangjin.jsx";
import Input from "./pages/Input.jsx";

function App() {
	return (
		<div id='root' className='App relative'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/Input' element={<Input />} />
				<Route path='/Gwnagjin' element={<Gwangjin />} />
			</Routes>
		</div>
	);
}

export default App;
