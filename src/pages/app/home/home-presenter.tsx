import React from 'react'
import { Box } from '@mui/material'
import Table from 'components/table'

import mockRickandMortyApi from 'mock/rickandmorty.json'
import { GridColDef } from '@mui/x-data-grid'

type Props = {}

const HomePresenter: React.FC<Props> = () => {
  const columns: GridColDef[] = [
    { field: 'name', flex: 1, headerName: 'Nome' },
    { field: 'status', flex: 1 },
    { field: 'gender', flex: 1 }
  ]

  return (
    <Box>
      <h1>Home page</h1>

      <Table rows={mockRickandMortyApi.results} columns={columns} />
    </Box>
  )
}

export default HomePresenter
