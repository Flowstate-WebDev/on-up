import { useState, useEffect } from "react";

type Role = "ADMIN" | "USER";

interface Account {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role: Role;
  createdAt: string;
}

import { API_BASE_URL } from "@/api/apiClient";

export function AccountManagement() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<Role>("USER");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/all`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch accounts");
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      setErrorMsg("Wystąpił błąd podczas pobierania kont.");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (account: Account) => {
    setEditingId(account.id);
    setEditRole(account.role);
    setErrorMsg(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveRole = async (accountId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${accountId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: editRole }),
        credentials: "include",
      },
      );

      if (!response.ok) throw new Error("Failed to update role");

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId ? { ...acc, role: editRole } : acc,
        ),
      );
      setEditingId(null);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Wystąpił błąd podczas aktualizacji roli.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-text-tertiary">
        Ładowanie kont...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">
          Zarządzanie Kontami
        </h2>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 border border-red-200">
          {errorMsg}
        </div>
      )}

      <div className="bg-bg-primary rounded-2xl overflow-hidden border border-border-secondary shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-secondary border-b border-border-secondary text-text-secondary text-sm">
                <th className="p-4 font-medium min-w-37.5">Użytkownik</th>
                <th className="p-4 font-medium min-w-50">Email</th>
                <th className="p-4 font-medium">Telefon</th>
                <th className="p-4 font-medium">Typ konta</th>
                <th className="p-4 font-medium text-right">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-secondary">
              {accounts.map((account) => (
                <tr
                  key={account.id}
                  className="hover:bg-bg-secondary/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent-primary/10 rounded-xl text-accent-primary">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold text-text-primary">
                        {account.username}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary text-sm">
                    {account.email}
                  </td>
                  <td className="p-4 text-text-secondary text-sm">
                    {account.phone ? (
                      <span className="font-mono">{account.phone}</span>
                    ) : (
                      <span className="italic text-text-tertiary">Brak</span>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === account.id ? (
                      <select
                        className="bg-bg-secondary border border-border-secondary text-text-primary rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value as Role)}
                      >
                        <option value="USER">Użytkownik</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-flex items-center text-[10px] font-bold tracking-widest uppercase ${account.role.toUpperCase() === "ADMIN"
                            ? "text-purple-600 px-3 py-1"
                            : "text-text-tertiary"
                          }`}
                      >
                        {account.role.toUpperCase() === "ADMIN"
                          ? "ADMIN"
                          : "Użytkownik"}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingId === account.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => saveRole(account.id)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Zapisz"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Anuluj"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(account)}
                        className="p-1.5 text-text-tertiary hover:text-accent-primary hover:bg-accent-primary/10 rounded-lg transition-colors"
                        title="Edytuj typ konta"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {accounts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-text-tertiary"
                  >
                    Brak kont do wyświetlenia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
