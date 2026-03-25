import { useContext } from "react"
import { AppContext } from "../context/AppContextContext"
import { AppState } from "../types/app"

export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
