import Head from 'next/head';
import { app } from '../firebaseConfig';
import { useEffect } from 'react';
import Link from 'next/link';

import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup
} from 'firebase/auth'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
export default function Register() {
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((response) => {
				console.log(response.user)
				sessionStorage.setItem('Token', response.user.accessToken);
				router.push('/home')
			})
			.catch(err => {
				alert('Cannot Log in')
			})
	}

	const signUpWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then((response) => {
				sessionStorage.setItem('Token', response.user.accessToken)
				console.log(response.user)
				router.push('/home')
			})
	}

	const signUpWithGithub = () => {
		signInWithPopup(auth, githubProvider)
			.then((response) => {
				sessionStorage.setItem('Token', response.user.accessToken)
				console.log(response.user)
				router.push('/home')
			})
	}

	useEffect(() => {
		let token = sessionStorage.getItem('Token')

		if (token) {
			router.push('/home')
		}
	}, [])

	return (
		<div >
			<Head>
				<title>Next CRUD AUTH</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header>
				<Link href={`/register`}><a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">REGISTER</a></Link>
			</Header>
			<main className='my-0 mx-auto w-2/5 text-center'>
				<h1 className='text-3xl font-bold m-5'>Login</h1>
				<input
					placeholder='Email'
					className='input-style focus:outline-none focus:shadow-outline'
					onChange={(event) => setEmail(event.target.value)}
					value={email}
					type='email'
				/>
				<input
					placeholder='Password'
					className='input-style focus:outline-none focus:shadow-outline'
					onChange={(event) => setPassword(event.target.value)}
					value={password}
					type='password'
				/>

				<button
					className='primary-button'
					onClick={signUp}>Sign In</button>
		
				<button
					className='primary-button'
					onClick={signUpWithGoogle}>
					Sign In with Google
				</button>
				<button
					className='primary-button'
					onClick={signUpWithGithub}>
					Sign In with Github
				</button>
			</main>
		</div>
	)
}