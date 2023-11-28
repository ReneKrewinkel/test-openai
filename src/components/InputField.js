const InputField = ({ value, handler }) => {

  return(
    <div className="InputField">
      <input type='text' placeholder='add prompt'
             value={value} onChange={handler} />
    </div>
  )

}

export default InputField