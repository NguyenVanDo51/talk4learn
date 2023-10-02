import { ILesson } from "@/types/lesson/type"

export const Introductionlessons: ILesson[] = [
  {
    id: "lesson_002",
    name: "Ngày đầu ở trường mới",
    modelContext: `You are a teacher. The user is a new student who wants to introduce themselves to the class. Ask the user about your name, old, hobbies, and why you are excited to be at the new school`,
    userContext: {
      en: "You are a new student wanting to introduce yourself on your first day at a new school.",
      vi: "Bạn là một học sinh mới và muốn tự giới thiệu vào ngày đầu đến trường mới.",
    },
    endCondition: {
      assistant:
        "When the user has introduced themselves to the class and no longer needs your help.",
    },
    level: "A1",
    image: "https://img.icons8.com/color/96/school.png",
    assistantFirstMessage:
      "Hello, I am your teacher. Please introduce yourself to the class.",
  },
  {
    id: "lesson_003",
    name: "Cuộc phỏng vấn ứng viên tiềm năng",
    modelContext: `You are an interviewer. The user is an applicant for the "Chief Fun Officer" position at a company that organizes fun events. Ask the user to introduce themselves and explain why they are the perfect fit for this unique role.`,
    userContext: {
      en: 'You are an applicant for the "Chief Fun Officer" position at a company known for organizing wild and wacky events.',
      vi: 'Bạn là ứng viên cho vị trí "Chief Fun Officer" tại một công ty nổi tiếng tổ chức các sự kiện vui nhộn.',
    },
    endCondition: {
      assistant:
        "When the user has convinced you that they are the perfect candidate for the job.",
    },
    level: "B1",
    image: "https://img.icons8.com/color/96/job.png",
    assistantFirstMessage:
      "Hello, I am your interviewer. Please introduce yourself and explain why you are the perfect fit for this unique role.",
  },
  {
    id: "lesson_004",
    name: "Cuộc phỏng vấn cho vị trí người hùng thế giới",
    modelContext: `You are a talk show host interviewing the user, who claims to be a superhero with unique powers. Ask the user to introduce themselves and describe their superhero persona and abilities.`,
    userContext: {
      en: `You are a self-proclaimed superhero with extraordinary powers and you're being interviewed on a talk show.`,
      vi: "Bạn tự xưng là một siêu anh hùng với sức mạnh phi thường và bạn đang được phỏng vấn trên một chương trình trò chuyện.",
    },
    endCondition: {
      assistant:
        "When the user has described their superhero persona and powers in a fun and convincing way.",
    },
    level: "A2",
    image: "https://img.icons8.com/color/96/superhero.png",
    assistantFirstMessage:
      "Hello, I am your interviewer. Please introduce yourself and describe your superhero persona and abilities.",
  },
  {
    id: "lesson_005",
    name: "Tại sự kiện kết nối xã hội",
    modelContext: `You are a party organizer. The user is attending a social networking event for the first time and wants to make a memorable introduction. Encourage the user to be creative.`,
    userContext: {
      en: "You are at a social networking event for the first time and want to make a memorable introduction to potential new friends.",
      vi: "Bạn đến một sự kiện kết nối xã hội lần đầu và muốn tự giới thiệu một cách đáng nhớ đối với những người bạn mới tiềm năng.",
    },
    endCondition: {
      assistant:
        "When the user has made an introduction that stands out and leaves a positive impression.",
    },
    level: "B2",
    image: "https://img.icons8.com/color/96/party.png",
    assistantFirstMessage:
      "Hello, I am the party organizer. Please introduce yourself to the other guests.",
  },
  {
    id: "lesson_006",
    name: "Gặp người ngoài hành tinh",
    modelContext: `You are an astronaut who has just made contact with an alien civilization. The user is representing humanity and needs to introduce themselves in a way that represents Earth. Encourage the user to be humorous and creative.`,
    userContext: {
      en: "You are representing humanity as the first astronaut to make contact with an alien civilization. Introduce yourself and Earth to the aliens in a unique and memorable way.",
      vi: "Bạn đang đại diện cho nhân loại là người du hành vũ trụ đầu tiên tiếp xúc với một nền văn hóa ngoài hành tinh. Giới thiệu bản thân và Trái Đất cho người ngoài hành tinh một cách độc đáo và đáng nhớ.",
    },
    endCondition: {
      assistant:
        "When the user has introduced themselves and Earth in a creative and humorous manner.",
    },
    level: "B2",
    image: "https://img.icons8.com/color/96/astronaut.png",
    assistantFirstMessage:
      "Hello, I am an astronaut. Please introduce yourself and Earth to the aliens in a creative and humorous manner.",
  },
]

export const lessons: ILesson[] = [...Introductionlessons]

export const generateLessonPrompt = (
  lesson: ILesson,
  isReverse: boolean = false
): string => {
  const { modelContext, userContext, endCondition } = lesson

  const prompt = `Your task is practice english with the user through a role-playing game.
Situation: ${isReverse ? userContext.en : modelContext}.
The Rules:
- Provide concise answers.
- Using simple words and sentences.
- Maximum 50 words in 1 response.
- In case the user responds with unrelated questions or statements, let them know.
- Only focus on the current situation.
- ${endCondition.assistant.replaceAll(
    ".",
    ""
  )}, reply with 'done_message' to conclude the situation.`

  console.log("prompt", prompt)
  return prompt
}
