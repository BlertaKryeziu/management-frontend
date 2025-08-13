import './App.css'
import Mbeshtjellesi from './components/Mbeshtjellesi'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <Navbar titulli="Projekti ne React" nentitulli="Mire se vini"/>
    <Navbar titulli="contenti 2" nentitulli="Mire se vini 2"/>

    <Mbeshtjellesi>
     <h1 className='text-4xl font-bold uppercase' >Hello from React</h1>
     <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, possimus.</p>
     </Mbeshtjellesi>
    </>
  )
}

export default App
