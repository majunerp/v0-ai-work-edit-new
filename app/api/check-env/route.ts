import { NextResponse } from 'next/server';

export async function GET() {
  const hasApiKey = !!process.env.OPENROUTER_API_KEY;
  const apiKeyPrefix = process.env.OPENROUTER_API_KEY?.substring(0, 10);

  return NextResponse.json({
    hasApiKey,
    apiKeyPrefix: hasApiKey ? apiKeyPrefix + '...' : 'Not set',
    envVars: Object.keys(process.env).filter(key => key.includes('OPENROUTER'))
  });
}
