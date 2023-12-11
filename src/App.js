import './App.css';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';
function App() {
   const [bmi , setBmi] = useState(0)
   const [height,setHeight] = useState(0)
   const [weight,setWeight] = useState(0)
   
   const [isHeight,setIsHeight] = useState(true)
   const [isWeight , setIsWeight] = useState(true)
   const getvalidate = (e)=>{
    const{name,value} = e.target

   
    if(!!value.match(/^[0-9]+$/)){ 
     if(name==='height')
     {setHeight(value)
      setIsHeight(true)}
      else if(name==='weight'){
        setWeight(value)
        setIsWeight(true)
      }
    }
    else{
      if(name==='height'){setHeight(value)
      setIsHeight(false)}
    else if(name==='weight'){
      setWeight(value)
      setIsWeight(false)
    }
    }
   }
   const handleCalculate = (e)=>{
    e.preventDefault()
    if(!height || !weight){
      alert('Please fill the form')
    }
    else{
      const calculatedBmi = weight / (height* height);
      setBmi(calculatedBmi*10000)
    }
  }

  const getBmiCategory = () => {
    if (!bmi) {
       return null;   
       } 
       else if (bmi < 18.5) {
       return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
       return 'Normal Weight';
    } else if (bmi >= 25 && bmi < 29.9) {
       return 'Overweight';
    } else {
       return 'Obesity';
    }
 };

 const getWeightRangeColor = () => {
  const category = getBmiCategory();

  switch (category) {
     case 'Underweight':
        return 'blue';
     case 'Normal Weight':
        return 'green';
     case 'Overweight':
        return 'orange';
     case 'Obesity':
        return 'red';
     default:
        return 'black';
  }
};

  const handleReset = (e)=>{
    setBmi(0)
    setHeight(0)
    setWeight(0)
    setIsHeight(true)
    setIsWeight(true)
  }
  return (
<div style={{height:'100vh'}} id='bgbmi' className="d-flex justify-content-center align-items-center w-100 bg-dark">
   <div className='bg-light p-5 rounded' style={{width:'500px'}}>      
      <h1>BMI Calculator</h1>
      <h6>Calculate Your BMI Easily</h6>
      <div className='bg-info d-flex justify-content-center align-items-center w-100 p-4 rounded flex-column'>
        <h1>Your BMI is : {' '} {bmi.toFixed(1)}</h1>
        <h6 style={{ color: getWeightRangeColor() }}>Weight Range : {getBmiCategory()}</h6>
      </div>
      <form className='mt-5' onSubmit={handleCalculate}>
          <div className='mb-3'>
          <TextField name='height' value={height || ""}    onChange={(e)=>getvalidate(e)} className='w-100' id="outlined-basic" label="Enter Your Height (cm)" variant="outlined" />
          </div>
        { !isHeight &&

          <div>
            <p className='text-danger'>Invalid Input</p>
          </div>
        }
          <div className='mb-3'>
          <TextField  name='weight' value={weight || ""} onChange={(e)=>getvalidate(e)} className='w-100' id="outlined-basic" label="Enter Your Weight (Kg) " variant="outlined" />
          </div>
          { !isWeight &&

            <div>
              <p className='text-danger'>Invalid Input</p>
            </div>
          }

          <Stack className='mt-3' direction="row" spacing={2}>
          <Button type='submit' disabled={isHeight && isWeight?false:true} style={{width:'200px',height:'50px'}} variant="contained" className='bg-success'>Calculate</Button>
          <Button onClick={handleReset} style={{width:'200px',height:'50px'}} variant="outlined">Reset</Button>
          </Stack>

      </form>
   </div>
</div>
  );
}

export default App;
