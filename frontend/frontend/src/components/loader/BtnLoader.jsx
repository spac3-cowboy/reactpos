import { Spin } from "antd";
import React from "react";

function BtnLoader(props) {
	return (
		<div className='text-center'>
			<div className='loading'>
				<p> Loading </p>
				<Spin size={"default"} />
			</div>
		</div>
	);
}

export default BtnLoader;
