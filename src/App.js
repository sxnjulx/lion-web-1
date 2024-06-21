import './App.css';
import { ServiceProvider } from './services/ServiceContext';
import AppRouting from './Routing';

const App = () => {
  return (
    <ServiceProvider>
      <AppRouting/>
    </ServiceProvider>
  );
};


export default App;

