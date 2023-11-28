import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY
})

const openai = new OpenAIApi(configuration)


const generateText = async(prompt) => {
  let result, error
  try {

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 500
    })

    result = completion.data.choices[0].text

  } catch(e) {
    error = e
  }

  return [result, error]
}

const generateImage = async(prompt) => {
  let result, error

  try {
    const completion = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '512x512'
    })

    result = completion.data.data[0].url
  } catch (e) {
    error = e
  }

  return [result, error]
}

const executePrompt = async (type, prompt) => {
  if( type === 'text' ) return await generateText(prompt)
  if( type === 'image') return await generateImage(prompt)
}

export default executePrompt