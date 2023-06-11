type ActiveUser = {
  id: string
  status: string
}

export type Room = {
  id: string
  name: string
  activeUsers: ActiveUser[]
}
