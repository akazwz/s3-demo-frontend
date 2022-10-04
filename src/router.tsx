import {createBrowserRouter} from 'react-router-dom'

import Index from '../routes/index'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Index/>,
		children: [],
	},
])

export default router