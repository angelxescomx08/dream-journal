import type { PropsWithChildren } from 'react'
import { useUsers } from '../../hooks/useUsers'
import { Redirect } from 'react-router'

export const PublicRoute = ({ children }:PropsWithChildren) => {

  const { users } = useUsers()

  if (users.isLoading) {
    return <div>Loading...</div>
  }

  if (users.isError) {
    return <div>Error</div>
  }

  if ((users.data?.length || 0) > 0) {
    return <Redirect to="/home" />
  }

  return children
}
