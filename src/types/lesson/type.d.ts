export interface ILesson {
  id: string
  name: string // tên của tình huống
  modelContext: string // câu prompt để system ra lệnh cho assistant theo cấu trúc: you are ..., the user wants ...
  userContext: { //  hoàn cảnh cụ thể của user trong tình huống, cần nêu ra việc user cần làm
    en: string
    vi: string
  }
  level: 'A1' | 'A2' | 'B2' | 'B1' // đánh giá độ khó của tình huống
}