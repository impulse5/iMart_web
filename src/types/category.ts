export interface CategoryAttributes {
  id: string;
  name: string;
}

export type CategoryResponse = {
  id: string
  attributes: CategoryAttributes
}

export type CategoryRequest = {
  category: CategoryAttributes
}