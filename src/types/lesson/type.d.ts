export interface ILesson {
  id: string 
  name: string
  modelContext: string
  modelRole: string
  userRole: string
  userContext: string
  level: 'A1' | 'A2' | 'B2' | 'B1'
}
