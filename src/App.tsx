import AnimatedRectangle from './components/AnimatedRectangle'
import MovingBackground from './components/MovingBackground'
import BackgroundImage from './assets/images/background.png'

const App: React.FC = () => {
  return (
    <div >
      <MovingBackground imageUrl={BackgroundImage} />
      <AnimatedRectangle x={0} y={0} width={100} height={100} />
    </div>
    
  )
}

export default App;