import {Route, Routes} from "react-router-dom";
import Yangcheon from "./pages/Yangcheon.jsx";
import Login from "./pages/Login.jsx";

function App() {
	return (
		<div id='root' className='App'>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/Yangcheon' element={<Yangcheon />} />
			</Routes>
		</div>
	);
}

export default App;
