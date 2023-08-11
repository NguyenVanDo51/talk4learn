import { AIModels } from '@/types/cha/models'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(AIModels)
}
