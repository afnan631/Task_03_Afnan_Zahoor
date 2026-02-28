import { useState, useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [password,setpass]=useState("");
  const [length,setlength]=useState(8);
  const [number,setnumber]=useState(false);
  const [character,setcharacter]=useState(false);
let passwordgenerator=useCallback(()=>{
 let pass="";
  let set="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(number){
    set +="0123456789";
  }
  if(character){
set +="@#$%^&*!";
  }
  for(let i=0;i<length;i++){
    let char=Math.floor(Math.random()*set.length+1);
    pass += set.charAt(char);
  }
  setpass(pass);
},[number,length,character,password])
useEffect(()=>{passwordgenerator()},[length,number,character]);
const passwordref=useRef(null);
let copytoclipboard=useCallback(()=>{
   passwordref.current?.select();
  passwordref.current?.setSelectionRange(0);
   
  window.navigator.clipboard.writeText(password);
},[password])
  return (
    <>
      <div class="body">
        <div class="box">
          <h1>Password Generator</h1>

          <div class="input1">
            <input  class="sizing" type='text' value={password} ref={passwordref} readOnly placeholder='enter password' />
            <button class="sizing" onClick={copytoclipboard}>copy</button>
          </div>


          <div class="input2">
            <span class="space"> 
            <input type="range" max={50} min={6} value={length}  onChange={(e)=>{setlength(e.target.value)}}  />
            <label>Length:{length}</label>
            </span>
           
           <span class="space"> 
            <input type="checkbox" checked={number} onChange={()=>{setnumber(prev=>!prev)}} />
            <label>Number</label>
            </span>

          
          <span class="space"> 
            <input type="checkbox" checked={character} onChange={()=>{setcharacter(prev=>!prev)}} />
            <label>Character</label>
            </span>
          </div>

        </div>

      </div>
    </>
  )
}

export default App;

