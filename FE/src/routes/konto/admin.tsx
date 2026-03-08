import { createFileRoute } from '@tanstack/react-router'
import { useState, Activity } from 'react'
import { Heading } from '@/components/ui/Heading'
import { TabNav } from './components/AdminPanel/TabNav'
import { ProductManagement } from './components/AdminPanel/ProductManagement'

export const Route = createFileRoute('/konto/admin')({
  component: AdminPanel,
})

function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'accounts'>('products')
  
  const tabs = [
    { id: 'products', label: 'Produkty' },
    { id: 'orders', label: 'Zamówienia' },
    { id: 'accounts', label: 'Konta' },
  ] as const

  return (
    <div className="w-full xl:w-2/3 mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Heading size="xl">Panel Administratora</Heading>
          <p className="text-text-tertiary -mt-2">Zarządzaj sklepem, zamówieniami i użytkownikami</p>
        </div>
      </div>

      <TabNav 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <div className="bg-bg-secondary rounded-3xl p-8 border border-border-secondary shadow-sm min-h-125 transition-all duration-300">
        <Activity mode={activeTab === 'products' ? 'visible' : 'hidden'}>
          <ProductManagement />
        </Activity>
        
        <Activity mode={activeTab === 'orders' ? 'visible' : 'hidden'}>
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">Zarządzanie Zamówieniami</h2>
            <div className="bg-bg-primary rounded-2xl p-8 text-center border border-border-secondary border-dashed">
              <p className="text-text-tertiary">Lista zamówień pojawi się tutaj</p>
            </div>
          </div>
        </Activity>

        <Activity mode={activeTab === 'accounts' ? 'visible' : 'hidden'}>
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">Zarządzanie Kontami</h2>
            <div className="bg-bg-primary rounded-2xl p-8 text-center border border-border-secondary border-dashed">
              <p className="text-text-tertiary">Lista użytkowników pojawi się tutaj</p>
            </div>
          </div>
        </Activity>
      </div>
    </div>
  )
}