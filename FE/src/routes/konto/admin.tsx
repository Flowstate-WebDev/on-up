import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button/Button'

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
    <div className="w-2/3 mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Heading size="xl">Panel Administratora</Heading>
          <p className="text-text-tertiary -mt-2">Zarządzaj sklepem, zamówieniami i użytkownikami</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex p-1 bg-bg-secondary/50 rounded-2xl w-fit border border-border-secondary/50 backdrop-blur-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-out
              ${activeTab === tab.id
                ? 'bg-primary text-text-obj shadow-lg shadow-primary/20 scale-[1.02]'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary/50'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="
        bg-bg-secondary rounded-3xl p-8 
        border border-border-secondary shadow-sm 
        min-h-125 transition-all duration-300
      ">
        {activeTab === 'products' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-text-primary">Zarządzanie Produktami</h2>
              <Button style="default" type="button">
                + Dodaj Produkt
              </Button>
            </div>
            <div className="bg-bg-primary rounded-2xl p-8 text-center border border-border-secondary border-dashed">
              <p className="text-text-tertiary">Lista produktów pojawi się tutaj</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-text-primary">Zarządzanie Zamówieniami</h2>
            </div>
            <div className="bg-bg-primary rounded-2xl p-8 text-center border border-border-secondary border-dashed">
              <p className="text-text-tertiary">Lista zamówień pojawi się tutaj</p>
            </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-text-primary">Zarządzanie Kontami</h2>
            </div>
            <div className="bg-bg-primary rounded-2xl p-8 text-center border border-border-secondary border-dashed">
              <p className="text-text-tertiary">Lista użytkowników pojawi się tutaj</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}