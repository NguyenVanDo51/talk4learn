import { AIModels } from '@/types/chat'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(AIModels)
}
