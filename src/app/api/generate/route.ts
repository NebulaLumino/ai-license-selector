import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

function getDeepSeekClient() {
  return new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: process.env.OPENAI_API_KEY || '',
  });
}

export async function POST(req: NextRequest) {
  try {
    const { projectType, commercial, distribution, attribution } = await req.json();

    const prompt = `You are an expert in open source licensing and intellectual property law. Based on the following project details, recommend the most appropriate open source license:

- **Project Type:** ${projectType || 'Open Source Library / Framework'}
- **Commercial Use:** ${commercial || 'Permitted — I may commercialize or sell this'}
- **Distribution Type:** ${distribution || 'Public open source (GitHub, PyPI, npm, etc.)'}
- **Attribution Requirement:** ${attribution || 'Required — users must credit my work'}

For your recommendation, provide:

1. **Primary Recommendation** (license name with SPDX identifier)
   - Why this license fits your specific situation
   - Key permissions, conditions, and limitations
2. **Alternative #1** (if primary doesn't fit perfectly)
   - Why it might be better in certain scenarios
3. **Alternative #2** (for edge cases)
   - When to consider this option
4. **License Comparison Summary** (table comparing key terms of top 3 options)
5. **Step-by-Step Implementation Guide**
   - How to apply the license (LICENSE file, NOTICE file, headers)
   - What files need license headers
   - If using a package manager, how to configure licensing metadata
6. **Things to Watch Out For**
   - License compatibility gotchas
   - Patent clauses to be aware of
   - Trademark considerations
   - Contribution agreements (DCO vs CLA)

Format with clear markdown sections, bullet points, and tables. Be specific and practical.`;

    const completion = await getDeepSeekClient().chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return NextResponse.json({ result: completion.choices[0]?.message?.content || 'No response.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
