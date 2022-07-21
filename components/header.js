import Link from 'next/link';

const Header = ({ children }) => {
	return (
		<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<Link href={`/`}>
					<a><span className="font-semibold text-xl tracking-tight">BASIC AUTH AND CRUD APP</span></a>
				</Link>
				
			</div>
			<div className="block lg:hidden">
				<button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
				</button>
			</div>
			<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
				<div className="text-sm lg:flex-grow">
				</div>
				<div>
					{children}
				</div>
			</div>
		</nav>
	)
}
export default Header;