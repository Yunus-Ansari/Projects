import './App.css'
import config from './config/config';

function App() {
  console.log(config.appwriteUrl);
  return (
    <>
    <div className=' flex justify-center items-center bg-slate-800 font-bold text-6xl h-screen '>Greetings!</div>
    </>
  )
}

export default App
