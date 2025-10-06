import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    // 检查API密钥是否存在
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured. Please set OPENROUTER_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "https://www.aiworkeditprotips.net",
        "X-Title": "AI Work Editprotips",
      },
    });

    const { imageUrl, prompt, mode } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (mode === 'photo-edit' && !imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required for photo edit mode' },
        { status: 400 }
      );
    }

    // 构建消息内容
    const messageContent: any[] = [
      {
        type: "text",
        text: mode === 'text-to-photo'
          ? `Generate an image based on this description: ${prompt}`
          : `Edit this image according to the following instructions: ${prompt}`
      }
    ];

    // 如果是 photo-edit 模式，添加图片
    if (mode === 'photo-edit' && imageUrl) {
      messageContent.push({
        type: "image_url",
        image_url: {
          url: imageUrl
        }
      });
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        {
          role: "user",
          content: messageContent
        }
      ],
    });

    console.log('API Response:', JSON.stringify(completion, null, 2));

    const message = completion.choices[0]?.message;

    if (!message) {
      console.error('No message in response');
      return NextResponse.json(
        { error: 'No response from AI model' },
        { status: 500 }
      );
    }

    // 检查响应中是否包含图片
    if ((message as any).images && (message as any).images.length > 0) {
      const imageUrl = (message as any).images[0].image_url.url;
      return NextResponse.json({
        success: true,
        result: imageUrl,
        type: 'image'
      });
    }

    // 如果没有图片，返回文字内容
    if (message.content) {
      return NextResponse.json({
        success: true,
        result: message.content,
        type: 'text'
      });
    }

    return NextResponse.json({
      success: true,
      result: 'Image generated successfully',
      type: 'text'
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', JSON.stringify(error.response.data, null, 2));
    }

    const errorMessage = error.response?.data?.error?.message
      || error.message
      || 'Failed to generate image';

    return NextResponse.json(
      {
        error: errorMessage,
        success: false
      },
      { status: error.response?.status || 500 }
    );
  }
}
