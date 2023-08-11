import { AIModels } from '@/types/chat/models'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(AIModels)
}
