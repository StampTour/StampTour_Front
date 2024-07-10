import React, {useState} from "react";

const Input = () => {
	const [name, setName] = useState();
	const inputName = (e) => {
		setName(e.target.name);
	};
	return (
		<div>
			<input
				onChange={inputName}
				type='text'
				value={name}
			/>
		</div>
	);
};

export default Input;
