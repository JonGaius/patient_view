import React from "react"
import {WebRoutes} from "./routes/WebRoutes";
import {AuthContext} from "./context/AuthContext";
function App() {
  return (
      <AuthContext>
          <div className={"app"}>
              <WebRoutes/>
          </div>
      </AuthContext>
  );
}

export default App;
