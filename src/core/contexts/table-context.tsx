import { LocalStorage } from 'core/infra'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

type DensityProps = 'comfortable' | 'compact' | 'standard'

type TableSettingsContextProps = {
  density: DensityProps
  rowsPerPage: number
  handleChangeTableDensity: (d: DensityProps) => void
  handleChangeRowsPerPage: (r: number) => void
}

export const TableSettingsContext = createContext<TableSettingsContextProps>({
  density: 'comfortable',
  rowsPerPage: 5,
  handleChangeTableDensity: () => {},
  handleChangeRowsPerPage: () => {}
})

type TableSettingsContextProviderProps = {
  children: ReactNode
}

export const TableSettingsContextProvider: React.FC<
TableSettingsContextProviderProps
> = ({ children }) => {
  const storage = new LocalStorage()

  const [density, setDensity] = useState<DensityProps>('comfortable')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  const handleChangeTableDensity = (density: DensityProps): void => {
    void storage.set('tableDensity', density)
    setDensity(density)
  }

  const handleChangeRowsPerPage = (rowsPerPage: number): void => {
    void storage.set('rowsPerPage', rowsPerPage)
    setRowsPerPage(rowsPerPage)
  }

  useEffect(() => {
    const sessionTableDensity = storage.get('tableDensity') as DensityProps
    if (!sessionTableDensity) return
    setDensity(sessionTableDensity)

    const sessionRowsPerPage = storage.get('rowsPerPage') as number
    if (!sessionRowsPerPage) return
    setRowsPerPage(sessionRowsPerPage)
  }, [])

  return (
    <TableSettingsContext.Provider
      value={{
        density,
        rowsPerPage,
        handleChangeRowsPerPage,
        handleChangeTableDensity
      }}
    >
      {children}
    </TableSettingsContext.Provider>
  )
}

export const useTableSettings = (): TableSettingsContextProps =>
  useContext(TableSettingsContext)
