export interface ILesson {
  id: string
  name: string // tên của tình huống
  assistantInstruction: string // hướng dẫn chi tiết cho chatbot trong tình huống (hoàn cảnh, câu truyện, nhiệm vụ,...)
  userInstruction: string //  hướng dẫn nhiệm vụ của user trong tình huống
  botImage: string // ảnh minh họa cho tình huống
  assistantFirstMessage?: string // câu đầu tiên của assistant
  public: boolean // có public hay không
  tags: string[] // các tags mô tả về tình huống. vd: work, school,...
}