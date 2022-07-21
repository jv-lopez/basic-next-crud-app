import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link';
import Header from '../components/header';

export default function Home() {

	return (
		<div>
			<Head>
				<title>NEXT CRUD APP</title>
				<meta name="description" content="NEXT CRUD APP" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header>
				<Link href={`/register`}><a className='primary-button'>REGITER</a></Link>
				<Link href={`/login`}><a className='primary-button'>LOGIN</a></Link>
			</Header>
			<main className='my-0 mx-auto w-2/5  mx-auto w-2/5 flex justify-center'>
				<div className='flex justify-center'>
					<Link href={`/register`}><a className='primary-button'>REGITER</a></Link>
					<Link href={`/login`}><a className='primary-button'>LOGIN</a></Link>
				</div>
			</main>
		</div>
	)
}
