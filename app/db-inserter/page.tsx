import React from 'react'
import Button from '@/components/client/Button'
import Input from '@/components/client/Input'
import { inputStyle, buttonStyle } from '@/public/styles'

type Props = {}

export default function DBInserterPage({ }: Props) {
	return (
		<div className='flex gap-2'>
			<form action="" className='flex flex-col gap-2 p-2 border border-neutral-200 rounded items-start w-fit'>
				<h1 className='text-xl font-bold'>Dodaj produkt</h1>
				<label htmlFor="" className='flex flex-col gap-1'>
					Tytuł
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Cena
					<input type="number" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Kategoria
					<select name="" id="" className='border border-neutral-200 rounded'>
						<option value="logistyk">Logistyk</option>
						<option value="eksploatacja">Eksploatacja</option>
						<option value="handlowiec">Handlowiec</option>
					</select>
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Opis
					<textarea name="" id="" cols={30} rows={3} className='border border-neutral-200 rounded'></textarea>
				</label>
				<button className='bg-blue-600 hover:bg-blue-500 text-white p-2 rounded cursor-pointer'>Wyślij do bazy danych</button>
			</form>
			<form action="" className='flex flex-col gap-2 p-2 border border-neutral-200 rounded items-start w-fit'>
				<h1 className='text-xl font-bold'>Dodaj użytkownika</h1>
				<label htmlFor="" className='flex flex-col gap-1'>
					Nazwa użytkownika
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Email
					<input type="email" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Telefon
					<input type="tel" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Hasło
					<input type="password" className='border border-neutral-200 rounded' />
				</label>
				<button className='bg-blue-600 hover:bg-blue-500 text-white p-2 rounded cursor-pointer'>Wyślij do bazy danych</button>
			</form>
			<form action="" className='flex flex-col gap-2 p-2 border border-neutral-200 rounded items-start w-fit'>
				<h1 className='text-xl font-bold'>Dodaj adres rozliczeniowy</h1>
				<label htmlFor="" className='flex flex-col gap-1'>
					Imię
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Nazwisko
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Ulica
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Numer budynku
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Numer mieszkania (opcjonalnie)
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Kod pocztowy
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Miasto
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<label htmlFor="" className='flex flex-col gap-1'>
					Kraj
					<input type="text" className='border border-neutral-200 rounded' />
				</label>
				<button className='bg-blue-600 hover:bg-blue-500 text-white p-2 rounded cursor-pointer'>Wyślij do bazy danych</button>
			</form>
		</div>
	)
}