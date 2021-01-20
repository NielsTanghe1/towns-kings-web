import React from "react";
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import ServerList from "./pages/ServerList";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {CircularProgress, Grid, IconButton, Toolbar} from "@material-ui/core";
import NodePage from "./pages/Nodes";

function App() {

    const [world, setWorld] = React.useState("wereld");


    return (
    <div className="App">
        <Router>
            <Grid container direction="column" style={{height: "100vh"}}>
                <Navbar onWorldSelect={(v) => setWorld(v)}/>

                {!world ? <CircularProgress style={{marginTop: "10%" }} color="secondary"/> :
                    <Switch>
                        <Route path="/dashboard">
                            <ServerList/>
                        </Route>

                        <Route path="/nodes">
                            <NodePage/>
                        </Route>
                    </Switch>
                }
            </Grid>


        </Router>
    </div>
  );
}

export default App;
