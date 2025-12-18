import React from 'react'

export default function AdminPanelPage() {
  return (
    <>
    <section id="container" className='grid'>
        <section>
            <ul class="sidebar-menu">
                <li className='
                bg-blue-400 p-2 w-30 duration-75 text-cyan-50 
                hover:text-blue-100 hover:text-shadow-blue-200 hover:border-l-3 hover:border-l-blue-900'><a href="#" data-section="dashboard">Dashboard</a></li>
                <li><a href="#" data-section="users">Użytkownicy</a></li>
                <li><a href="#" data-section="content">Zawartość</a></li>
                <li><a href="#" data-section="settings">Ustawienia</a></li>
                <li><a href="#" data-section="reports">Raporty</a></li>
                <li><a href="#" data-section="logs">Logi</a></li>
            </ul>
        </section>
        <section id="dashboard">

        </section>
        <section id="users">

        </section>
        <section id="content"></section>
        <section id="settings"></section>
        <section id="reports"></section>
        <section id="logs"></section>
    </section>
    </>
  )
}
