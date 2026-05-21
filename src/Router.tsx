import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import AllComplaints from './pages/AllComplaints';
import OneComplaint from './pages/OneComplaint';
import SubmitComplaint from './pages/SubmitComplaint';
import Profile from './pages/Profile';
import EditComplaint from './pages/EditComplaint';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: 'allComplaints',
				element: <AllComplaints />
			},
			{
				path: 'complaints/:id',
				element: <OneComplaint />
			},
			{
				path: 'submit',
				element: <SubmitComplaint />
			},
			{
				path: 'profile',
				element: <Profile />
			},
			{
				path: 'edit/:id',
				element: <EditComplaint />
			}
		]
	},
	{
		path: '*',
		element: <NotFound />
	}
]);

export default router;
