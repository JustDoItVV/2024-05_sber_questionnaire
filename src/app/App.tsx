import './App.css';

import CardQuestion from './components/card-question/card-question';
import FormQuestion from './components/form-question/form-question';
import FormStart from './components/form-start/form-start';
import Results from './components/results/results';

function App() {
  return (
    <>
      <FormStart />
      <br />
      <FormQuestion />
      <br />
      <CardQuestion />
      <br />
      <Results />
    </>
  )
}

export default App
