import "./App.css";
import Navigator from "./navigations/Navigator";

import React, { useState } from "react";
import Login from "./views/Login";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const setStateLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className="App">
      {isLogin && <Navigator />}

      {!isLogin && <Login setStateLogin={setStateLogin} />}
    </div>
  );
};

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoggin: false,
//     };
//   }

//   render() {
//     return (
//       <div className="App">
//         {this.state.isLoggin && <Navigator />}

//         {!this.state.isLoggin && <Login />}
//       </div>
//     );
//   }
// }

// export default App;
