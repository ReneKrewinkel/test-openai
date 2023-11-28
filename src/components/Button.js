const Button = ({ text, action }) => {

  return(
    <button style={{ backgroundColor: "#F00", padding: 20 }} onClick={action}>
      { text }
    </button>
  )

}

export default Button