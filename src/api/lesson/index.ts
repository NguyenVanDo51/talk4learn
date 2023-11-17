import { ILesson } from "@/types/lesson/type"

export const lessons: ILesson[] = []

export const generateLessonPrompt = (
  lesson: ILesson,
  isReverse: boolean = false
): string => {
  const { assistantInstruction } = lesson

  const prompt = `Your task is practice english with the user through a role-playing game.
Situation: ${assistantInstruction}.
The Rules:
- Provide concise answers.
- Using simple words and sentences.
- Maximum 50 words in 1 response.
- In case the user responds with unrelated questions or statements, let them know.
- Only focus on the current situation.
`

  console.log("prompt", prompt)
  return prompt
}
