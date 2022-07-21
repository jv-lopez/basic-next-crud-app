import Head from 'next/head'
import Image from 'next/image'
import { app, database } from '../firebaseConfig'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router'
import {
	collection,
	addDoc,
	getDocs,
	doc,
	updateDoc,
	deleteDoc
} from 'firebase/firestore';

import Link from 'next/link';
import Header from '../components/header';
export default function Home() {
	const [ID, setID] = useState(null);
	const [name, setName] = useState('');
	const [age, setAge] = useState(null);
	const [fireData, setFireData] = useState([]);
	const [isUpdate, setIsUpdate] = useState(false);
	const databaseRef = collection(database, 'CRUD Data');
	let router = useRouter()
	useEffect(() => {
		let token = sessionStorage.getItem('Token')
		if (token) {
			getData()
		}
		if (!token) {
			router.push('/register')
		}
	}, [])


	const addData = () => {
		addDoc(databaseRef, {
			name: name,
			age: Number(age)
		})
			.then(() => {
				alert('Data Sent')
				getData()
				setName('')
				setAge(null)
			})
			.catch((err) => {
				console.error(err);
			})
	}

	const getData = async () => {
		await getDocs(databaseRef)
			.then((response) => {
				setFireData(response.docs.map((data) => {
					return { ...data.data(), id: data.id }
				}))
			})
	}

	const getID = (id, name, age) => {
		setID(id)
		setName(name)
		setAge(age)
		setIsUpdate(true)
	}

	const updateFields = () => {
		let fieldToEdit = doc(database, 'CRUD Data', ID);
		updateDoc(fieldToEdit, {
			name: name,
			age: Number(age)
		})
			.then(() => {
				alert('Data Updated')
				getData()
				setName('')
				setAge(null)
				setIsUpdate(false)
			})
			.catch((err) => {
				console.log(err);
			})
	}

	const deleteDocument = (id) => {
		let fieldToEdit = doc(database, 'CRUD Data', id);
		deleteDoc(fieldToEdit)
			.then(() => {
				alert('Data Deleted')
				getData()
			})
			.catch((err) => {
				alert('Cannot Delete that field..')
			})
	}

	const logout = () => {
		sessionStorage.removeItem('Token')
		router.push('/register')
	}
	return (
		<div>
			<Head>
				<title>NEXT CRUD APP</title>
				<meta name="description" content="NEXT CRUD APP" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header>
				<button onClick={logout} className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0'>Log Out</button>
			</Header>

			<main >
				<div className='my-0 mx-auto w-2/5 text-center'>
					<h1 className='text-3xl font-bold m-5'>Add Information</h1>

					<input
						placeholder='Name'
						className='input-style focus:outline-none focus:shadow-outline'
						type="text"
						value={name}
						onChange={event => setName(event.target.value)}
					/>
					<input
						placeholder='Age'
						className='input-style focus:outline-none focus:shadow-outline'
						type="number"
						value={age}
						onChange={event => setAge(event.target.value)}
					/>

					{isUpdate ? (
						<button
							className='primary-button'
							onClick={updateFields}
						>
							UPDATE
						</button>
					) : (
						<button
							className='primary-button'
							onClick={addData}
						>
							ADD
						</button>
					)}
				</div>

				<div className="my-0 mx-auto w-2/5 text-center py-5">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="py-3 px-6">
									Product name
								</th>
								<th scope="col" className="py-3 px-6">
									Color
								</th>
								<th scope="col" className="py-3 px-6">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{fireData.map((data) => {
								return (
									<tr key={data.id} className="bg-white border-b">
										<th scope="row" className="py-4 px-6 font-medium">
											{data.name}
										</th>
										<td className="py-4 px-6">
											{data.age}
										</td>
										<td>
											<button
												className='text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900'
												onClick={() => getID(data.id, data.name, data.age)}
											>Edit</button>
											<button
												className='text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900'
												onClick={() => deleteDocument(data.id)}
											>Delete</button>
										</td>
									</tr>
								)
							})}

						</tbody>
					</table>
				</div>

			</main>
		</div>
	)
}