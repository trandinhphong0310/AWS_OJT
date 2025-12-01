import { useSelector } from 'react-redux';
// import './App.css';
import { increaseCounter, decreaseCounter } from './action/actions';
import countSelector from './redux/selector'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import Home from './components/Home';

function App() {
  const dispatch = useDispatch()
  const count = useSelector(countSelector)

  const handleIncreaseCounter = () => {
    dispatch(increaseCounter())
  }

  const handleDecreaseCounter = () => {
    dispatch(decreaseCounter())
  }

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users/all')
      return res && res.data ? res.data : []
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    // <div className="App">
    //   <div>Count: {count}</div>
    //   <button onClick={handleIncreaseCounter}>Increase Count</button>
    //   <button onClick={handleDecreaseCounter}>Decrease Count</button>
    // </div>
    <Home />
  );
}

export default App