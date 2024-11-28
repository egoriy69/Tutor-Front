


type Dataset = {
  data: number[]
}

export type Graph = {
  labels: string[]
  datasets: Dataset[]
}

export type Category = {
  id?: number,
  name: string,
  status: boolean,
  resultSum?: number
}
export type Transaction = {
  id?: number,
  name: string,
  cost:number
  categoryId?:number
  categoryName?: string,
  categoryStatus?:string
  createdAt:Date|null
}
