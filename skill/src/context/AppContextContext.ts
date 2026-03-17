import { createContext } from "react"
import { AppState } from "../types/app"

export const AppContext = createContext<AppState | null>(null)
