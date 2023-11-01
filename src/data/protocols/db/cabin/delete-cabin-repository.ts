export interface DeleteCabinRepository {
  delete: (cabinId: string) => Promise<boolean>
}
