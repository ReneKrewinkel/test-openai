import { useState } from 'react'
import Button from "./Button";
import InputField from "./InputField";
import Error from "./Error";
import executePrompt from '../lib/API'
import TextResult from "./TextResult";
import ImageResult from "./ImageResult";
import Spinner from "./Spinner";


const Form = () => {

  const [prompt, setPrompt] = useState('')
  const [isError, setError] = useState(false)
  const [hasResult, setHasResult] = useState(true)
  const [type, setType] = useState('')
  const [result, setGeneratedResult] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)

  const changePrompt = (event) => {
    setPrompt(event.target.value)
  }

  const generate = async (type) => {
    setShowSpinner(true);
    setType(type)
    const [result, error] = await executePrompt(type, prompt)
    setGeneratedResult(result)
    setShowSpinner(false)
    if(error) {
      setError(error)
      setHasResult(false)
    } else {
      setError(false)
      setHasResult(true)
    }
  }



  return(
    <div className="Form">
      <InputField value={prompt} handler={changePrompt} />
      { !showSpinner &&
        <div className="button-row">
             <Button text={"Image"} action={()=> generate('image')} />
              <Button text={"Text"} action={()=> generate('text')}  />
         </div>
      }
      <div className="output">
        { showSpinner && <Spinner /> }
        { isError && <Error err={isError} /> }
        { (hasResult && !showSpinner && type === 'text') && <TextResult text={result} /> }
        { (hasResult && !showSpinner && type === 'image') && <ImageResult url={result} /> }
      </div>
    </div>
  )
}

export default Form