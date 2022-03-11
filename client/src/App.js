import { createContext, useEffect, useState } from "react"
import './App.css';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Components/Homepage';
import SellScrap from './Components/SellProduct';
import { HashRouter as Router, Route, Link, Switch, useHistory, Redirect } from 'react-router-dom';
import DonateScrap from './Components/DonateScrap';
import Userprofile from './Components/UserProfile';
import Login from './Components/Login';
import Register from './Components/Register';
import Products from "./Components/Products";

const userContext = createContext(null);
export { userContext }

function App() {
  const [userExist, setUserExist] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('userExist') === "true") {
      setUserExist(true)
    }
    if (localStorage.getItem('userDetails')) {
      setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
    }
  }, [])

  return (
    <div>
      <Router>
        <userContext.Provider value={{ userExist, setUserExist, userDetails, setUserDetails }}>
          <Navbar />
          {userExist ?
            <Switch>
              <div className="main-container" style={{ paddingTop: '5rem', overflowX: 'hidden' }} >

                <Route exact path="/" component={Homepage} />
                <Route exact path="/sell-product" component={SellScrap} />
                <Route exact path='/donate-scrap' component={DonateScrap} />
                <Route exact path='/profile' component={Userprofile} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/products' component={Products} />
              </div>
            </Switch>
            :
            <Switch>
              <div className="main-container" style={{ paddingTop: '5rem', overflowX: 'hidden' }} >
                <Route exact path="/" component={Homepage} />
                <Route exact path="/sell-product" component={Login} />
                <Route exact path='/donate-scrap' component={Login} />
                <Route exact path='/profile' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/products' component={Login} />
                <Route exact path='/register' component={Register} />
              </div>
            </Switch>
          }

        </userContext.Provider>
      </Router>
    </div>
  );
}

export default App;
