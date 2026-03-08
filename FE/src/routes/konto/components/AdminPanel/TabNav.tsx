interface Tab {
  id: string;
  label: string;
}

interface TabNavProps {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (id: any) => void;
}

export function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="flex p-1 bg-bg-secondary/50 rounded-2xl w-fit border border-border-secondary/50 backdrop-blur-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-out cursor-pointer
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
  );
}
