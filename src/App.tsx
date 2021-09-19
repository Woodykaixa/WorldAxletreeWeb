import { Header } from '@/components';
import { BrowserRouter } from 'react-router-dom';

function App() {
  console.log(import.meta.env.WEB_TITLE);
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
      </BrowserRouter>
    </div>
  );
}

export default App;
