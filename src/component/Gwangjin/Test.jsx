import React, {useState} from "react";

const Test = () => {
	const [state, setstate] = useState({
		name: "",
		birth: "",
		gender: "",
		text: "",
	});

	function handleOnChange(e) {
		setstate({
			[e.target.name]: e.target.value,
			[e.target.birth]: e.target.value,
			[e.target.gender]: e.target.value,
			[e.target.text]: e.target.value,
		});
	}
	return (
		<div>
			<h2>사용자 입력</h2>
			<div>
				<input
					value={state.name}
					type='text'
					onChange={handleOnChange}
				/>
				<input
					value={state.birth}
					type='date'
					onChange={handleOnChange}
				></input>
				<div>
					<select
						value={state.gender}
						onChange={handleOnChange}
					>
						<option key='남' value='남자'>
							남자
						</option>
						<option key='여' value='여자'>
							여자
						</option>
					</select>
				</div>
				<textarea
					value={state.text}
					type='text'
					onChange={handleOnChange}
				></textarea>
			</div>
			<div>
				<div>이름: {state.name}</div>
				<div>성별: {state.birth}</div>
				<div>성별: {state.gender}</div>
				<div>하고 싶은 말: {state.text}</div>
			</div>
		</div>
	);
};

export default Test;
