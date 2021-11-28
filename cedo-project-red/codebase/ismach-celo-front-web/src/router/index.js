// --

import AuthLayout from 'layouts/auth/Layout.svelte';

import AuthLogin from 'views/auth/Login.svelte';


import DashboardLayout from 'layouts/dashboard/Layout.svelte';

import DashboardHome from 'views/dashboard/Home.svelte';

import DashboardPacket from 'views/dashboard/Packet.svelte';

import DashboardPacketLucky from 'views/dashboard/LuckyWinners.svelte';

import DashboardSend from 'views/dashboard/Send.svelte';


import Home from 'views/Home.svelte';

import Collect from 'views/Collect.svelte';



const routes = [
	{
		name: '/login',
		component: AuthLogin,
		layout: AuthLayout,
	},
	{
		name: '/dashboard/home',
		component: DashboardHome,
		layout: DashboardLayout,
	},
	{
		name: '/dashboard/packet/:slug',
		component: DashboardPacket,
		// layout: DashboardLayout,
	},
	{
		name: '/dashboard/packet/:slug/lucky',
		component: DashboardPacketLucky,
		layout: DashboardLayout,
	},
	{
		name: '/dashboard/send',
		component: DashboardSend,
		layout: DashboardLayout,
	},
	{
		name: '/',
		component: Home,
	},
	{
		name: '/collect/:slug',
		component: Collect,
	},
	{
		name: '/logged-in',
		redirectTo: '/dashboard/home',
	},
]


export { routes };



