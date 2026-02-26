import Portfolio from './Portfolio';
import './index.css';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="App">
        <Portfolio />
      </div>
    </ThemeProvider>
  );
}

export default App;
