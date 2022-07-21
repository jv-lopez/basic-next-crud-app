import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Header from '../components/header';
import { app } from '../firebaseConfig'
import {
	getAuth, createUserWithEmailAndPassword,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup
} from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'


export default function Register() {
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((response) => {
				console.log(response.user)
				sessionStorage.setItem('Token', response.user.accessToken);
				router.push('/home')
			}).catch(err => {
				alert(err);
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
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		let token = sessionStorage.getItem('Token')

		if (token) {
			router.push('/home')
		}
	}, [])

	return (
		<div>
			<Head>
				<title>NEXT CRUD APP</title>
				<meta name="description" content="NEXT CRUD APP" />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<Header>
				<Link href={`/login`}><a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">LOGIN</a></Link>
			</Header>
			<main className='my-0 mx-auto w-2/5 text-center'>
				<div>
					<h1 className='text-3xl font-bold m-5'>Register</h1>
					<input
						placeholder='Email'
						className='input-style focus:outline-none focus:shadow-outline'
						onChange={(event) => setEmail(event.target.value)}
						value={email}
						type="email" />
					<input
						placeholder='Password'
						className='input-style focus:outline-none focus:shadow-outline'
						onChange={(event) => setPassword(event.target.value)}
						value={password}
						type="password" />

					<button className='primary-button' onClick={signUp}>Sign Up</button>
					<button className='primary-button' onClick={signUpWithGoogle}>Sign Up with Google</button>
					<button className='primary-button' onClick={signUpWithGithub}>Sign Up with Github</button>
				</div>

			</main>
		</div>
	)
}