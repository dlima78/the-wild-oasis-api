export interface DeleteCabin {
  delete: (cabinId: string) => Promise<boolean>
}
