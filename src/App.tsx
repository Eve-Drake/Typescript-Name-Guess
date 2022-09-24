import axios from 'axios';
import {useState} from 'react';
import './index.css';

interface ageify {
  age : number,
  count : number,
  name : string
}

function App() {
  const [name, setName] =  useState<string>('')
  const [respData, setRespData] = useState<ageify>()
  const [display, setDisplay] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [statement, setStatement] = useState<string>('Enter a name')
  

  //Gets data
  const getNameData = async () =>{
    setLoading(true)
    setDisplay(true)
    if(name){
      try{
        const response = await axios.get('https://api.agify.io/?name=' + name)
        setRespData(response.data)
        setLoading(false)
        setStatement(`Ageify guesses that people named ${name} are...`)
      }
      catch(err){
        console.log(err)
        setLoading(false)
      }
    } 
    else{
      setDisplay(false)
      setStatement('Please enter a Name First')
    }

  }
  
  return (
    <div className="app">
      <div className='nameInput'>
        {/*Simple Input */}
        <input 
          placeholder='Enter a name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <button onClick={getNameData}>Enter</button>
      </div>

      <div className='nameGuessDisplay'>
        <h1>{statement}</h1>
        {/*Only shows if loading is false */}
        {display && 
        <div>
          
          <h1>{respData?.age} Years Old!</h1>
        </div>}
      </div>

      {/*Credit for API */}
          <div className='footer'>
            <p>For more infomation, please visit <a href='https://agify.io/'>Ageify.io</a></p>
          </div>
    </div>
  );
}

export default App;
