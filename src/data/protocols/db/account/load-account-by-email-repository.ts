export interface LoadAccoutByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadAccoutByEmailRepository.Result>
}

export namespace LoadAccoutByEmailRepository {
  export type Result = {
    id: string
    name: string
    password: string
  } | null
}
