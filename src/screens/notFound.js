import {useNavigate} from 'react-router-dom'
export default function Found(){
  const navigate = useNavigate()
  const handleBack =()=>{
    navigate(-1)
  }
  return(
    <>
    <h1>Page not found</h1>
   <button onClick ={handleBack}> go back</button> 
    </>
    )
}