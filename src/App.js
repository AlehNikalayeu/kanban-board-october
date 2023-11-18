import './App.css';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'
import Column from "./components/Column";
import CreateModalWindow from "./components/CreateModalWindow";

function App(props) {
  return (
      <div className="App">
        <h1>{props.appHeader}</h1>

        <CreateModalWindow/>

        <div className="container text-center">
          <div className="row align-items-start">
            {props.statuses.map(status =>
                <Column
                    key={status.id}
                    status={status}

                />)}

          </div>
        </div>

      </div>
  );
}

const mapStateToProps = (state) => ({
  appHeader: state.appName,
  statuses: state.boardStatuses,

})

export default connect(mapStateToProps)(App);