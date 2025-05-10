import { NextResponse } from "next/server";
import OpenAI from "openai";

// Use Node.js runtime
export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt." }, { status: 400 });
    }

    // First get the text response from GPT-4
    const textResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000 // Added to limit response size
    });

    if (!textResponse.choices?.[0]?.message?.content) {
      throw new Error("No content returned from GPT-4");
    }

    const gptResponseContent = textResponse.choices[0].message.content;
    const contentArr = splitNumberedFacts(gptResponseContent);

    // Generate images for each fact if content exists
    let imageUrls = [];
    if (contentArr.length > 0) {
      // Process images in parallel for better performance
      const imagePromises = contentArr.map(async (fact) => {
        let factPrompt = `fact: ${fact}, Generate an image based on this description. also add the text to the bottom of the image. add this text in a gradient black box. add the page name "Strange And Interesting Things" to the bottom of the post with small font . create this image with  Hyper realistic natural look.  text should be in center aligned in the photo. center the text on the image. also highlight important words with bright yellow color and bright pink color`;
        try {
          const imageResponse = await openai.images.generate({
            model: "dall-e-3", // Specify the model
            prompt: factPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard" // or "hd" for higher quality
          });
          return imageResponse.data[0]?.url;
        } catch (error) {
          console.error(`Error generating image for fact: ${fact}`, error);
          return null;
        }
      });

      imageUrls = (await Promise.all(imagePromises)).filter(url => url !== null);
    }

    return NextResponse.json({ 
      content: contentArr,
      images: imageUrls 
    }, { status: 200 });

  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { 
        error: "An error occurred, please try again later!",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

function splitNumberedFacts(text) {
  // Remove all newline characters
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:',text);
  
  const cleanedText = text.replace(/\n/g, ' ');

  // Match each fact starting with a number (e.g., "1.", "2.", etc.)
  const matches = cleanedText.match(/(?:\d+\.\s)(?:(?!\d+\.\s).)+/g);

  // Trim whitespace from each match
  return matches ? matches.map(fact => fact.trim()) : [];
}

