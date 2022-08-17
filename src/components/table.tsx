import React, { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumns,
  GridToolbar,
  ptBR
} from '@mui/x-data-grid'
import { useTableSettings } from 'core/contexts/table-context'

type TableActionProps = {
  icon: React.ReactElement
  label: string
  showInMenu: boolean
  onClick: (params: any) => any
}

type Props = {
  rows: any[]
  loading?: boolean
  columns: GridColDef[]
  actions?: TableActionProps[]
}

export default function Table ({
  rows = [],
  columns,
  actions,
  loading = false
}: Props): React.ReactElement {
  const { density, rowsPerPage, handleChangeRowsPerPage } = useTableSettings()

  const tableColumns = useMemo<GridColumns>(() => {
    if (!actions) return columns

    const columnsWithActions: GridColumns<any> = columns

    columnsWithActions.push({
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) =>
        actions.map((action) => {
          return (
            <GridActionsCellItem
              key={action.label}
              icon={action.icon}
              label={action.label}
              onClick={() => action.onClick(params)}
              id={`table-action-btn-${action.label}`}
            />
          )
        })
    })

    return columnsWithActions
  }, [actions])

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={tableColumns}
        loading={loading}
        autoHeight
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        pageSize={rowsPerPage}
        onPageSizeChange={(newPageSize) => handleChangeRowsPerPage(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        sx={{
          '.MuiDataGrid-toolbarContainer': {
            padding: 3
          }
        }}
        disableDensitySelector
        density={density}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  )
}
