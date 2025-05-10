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
    const { prompt, numberOfFacts } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt." }, { status: 400 });
    }

    let modifiedPrompt = `${prompt}  Image text lines should have a maximum of four words, matching highlighted text with relevant facts and descriptions. They should be meaningful and visually appealing. need ${numberOfFacts} facts. Organize this data like this pattern :
                          1.Fact-
Description:
image text line one:
image text line two:
image text line three: `;

    // First get the text response from GPT-4
    const textResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: modifiedPrompt
        }
      ],
      max_tokens: 1000 // Added to limit response size
    });

    if (!textResponse.choices?.[0]?.message?.content) {
      throw new Error("No content returned from GPT-4");
    }

    const gptResponseContent = textResponse.choices[0].message.content;
    const contentArr = parseFacts(gptResponseContent);


    // Generate images for each fact if content exists
    let imageUrls = [];
    if (contentArr.length > 0) {
      // Process images in parallel for better performance
      const imagePromises = contentArr.map(async (fact) => {
        let factPrompt = `${fact.description}, Generate an image based on this description. `;
        try {
          const imageResponse = await openai.images.generate({
            model: "dall-e-2", // Specify the model
            prompt: factPrompt,
            n: 1,
            size: "1024x1024",
            // quality: "standard" // or "hd" for higher quality
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
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:', text);

  const cleanedText = text.replace(/\n/g, ' ');

  // Match each fact starting with a number (e.g., "1.", "2.", etc.)
  const matches = cleanedText.match(/(?:\d+\.\s)(?:(?!\d+\.\s).)+/g);

  // Trim whitespace from each match
  return matches ? matches.map(fact => fact.trim()) : [];
}

function parseFacts(text) {
  const entries = text.split(/\n(?=\d+\.\sFact-)/); // Split each fact block
  const factObjects = entries.map(entry => {
    const factMatch = entry.match(/Fact-\s*(.*)/);
    const descriptionMatch = entry.match(/Description:\s*([\s\S]*?)image text line one:/);
    const imageLineOneMatch = entry.match(/image text line one:\s*(.*)/);
    const imageLineTwoMatch = entry.match(/image text line two:\s*(.*)/);
    const imageLineThreeMatch = entry.match(/image text line three:\s*(.*)/);

    return {
      fact: factMatch ? factMatch[1].trim() : "",
      description: descriptionMatch ? descriptionMatch[1].trim() : "",
      imageTextLineOne: imageLineOneMatch ? imageLineOneMatch[1].trim() : "",
      imageTextLineTwo: imageLineTwoMatch ? imageLineTwoMatch[1].trim() : "",
      imageTextLineThree: imageLineThreeMatch ? imageLineThreeMatch[1].trim() : ""
    };
  });

  return factObjects;
}


