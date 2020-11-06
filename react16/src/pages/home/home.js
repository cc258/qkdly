import React, { useState } from 'react'

const Home = () => {
	const [haha, setHaha] = useState('123456789')
	return (
		<div className="pages home">
			<h2>Home</h2> {haha}A Wolf found GREat difficulty in getting at the sheep
			owing to the vigilance of the shepherd and his dogs. But one day it found
			the skin of a sheep that had been flayed and thrown aside, so it put it on
			over its own pelt and strolled down among the sheep. The Lamb that
			belonged to the sheep, whose skin the Wolf was wearing, began to follow
			the Wolf in the Sheep’s clothing; so, leading the Lamb a little apart, he
			soon made a meal off her, and for some time he succeeded in deceiving the
			sheep, and enjoying hearty meals.
		</div>
	)
}

export default Home
