import React from 'react'
import Button from '@/components/client/Button'
import Input from '@/components/client/Input'
import { inputStyle, buttonStyle } from '@/public/styles'
import Select from '@/components/client/Select'
import SelectOption from '@/components/client/SelectOption'
import Link from 'next/link'

type Props = {}

export default function DBInserterPage({ }: Props) {
    return (
        <div className='flex gap-2'>
            <form action="" className='flex flex-col gap-2 p-2 border border-neutral-200 rounded-lg items-start w-fit'>
                <h1 className='text-xl font-bold'>Dodaj produkt</h1>
                    <Input type={'text'} style={'default'} placeholder={'Nazwa produktu'}/>
                    <Input type={'number'} style={'default'} placeholder={'Cena'}/>
                    <Select name="Kategoria" id="" style={'default'}>
                        <SelectOption value="" title="Wybierz kategorie" disabled selected={true}/>
                        <SelectOption value="logistyk" title="Logistyk" disabled={false} selected={false}/>
                        <SelectOption value="eksploatacja" title="Eksploatacja" disabled={false} selected={false}/>
                        <SelectOption value="handlowiec" title="Handlowiec" disabled={false} selected={false}/>
                    </Select>
                    <textarea placeholder='Opis' name="" id="" cols={30} rows={3} className='border border-neutral-200 rounded-lg focus:border-primary focus:text-text-primary transition-colors duration-200 ease-in-out'></textarea>
                <Button style='default' type='submit'><Link href="/">Wyślij do bazy danych</Link></Button>
            </form>
            <form action="" className='flex flex-col gap-2 p-2 border border-neutral-200 rounded-lg items-start w-fit'>
                <h1 className='text-xl font-bold'>Dodaj użytkownika</h1>
                    <Input type={'text'} style={'default'} placeholder={'Nazwa użytkownika'}/>
                    <Input type={'email'} style={'default'} placeholder={'Email'}/>
                    <Input type={'tel'} style={'default'} placeholder={'Telefon'}/>
                    <Input type={'password'} style={'default'} placeholder={'Hasło'}/>
                <Button style='default' type='submit'><Link href="/">Wyślij do bazy danych</Link></Button>
            </form>
            <form action="" className='flex flex-col gap-2 p-2 border border-neutral-200 rounded-lg items-start w-fit'>
                <h1 className='text-xl font-bold'>Dodaj adres rozliczeniowy</h1>
                    <Input type={'text'} style={'default'} placeholder={'Imię'}/>
                    <Input type={'text'} style={'default'} placeholder={'Nazwisko'}/>
                    <Input type={'text'} style={'default'} placeholder={'Ulica'}/>
                    <Input type={'number'} style={'default'} placeholder={'Numer budynku'}/>
                    <Input type={'number'} style={'default'} placeholder={'Numer mieszkania'}/>
                    <Input type={'text'} style={'default'} placeholder={'Kod pocztowy'}/>
                    <Input type={'text'} style={'default'} placeholder={'Miasto'}/>
                    <Input type={'text'} style={'default'} placeholder={'Kraj'}/>
                <Button style='default' type='submit'><Link href="/">Wyślij do bazy danych</Link></Button>
            </form>
        </div>
    )
}