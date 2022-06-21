import React from 'react'
import HomePresenter from './home-presenter'

type Props = {
  t: (key: string) => string
}

const HomeWrapper: React.FC<Props> = (props) => {
  console.log('props: ', props)

  return <HomePresenter />
}

export default HomeWrapper
