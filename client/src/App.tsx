import React from 'react'
import CreateOfferForm from './components/createOffer/CreateOfferForm'
import { useLoadScript } from '@react-google-maps/api'
import Map from './components/map/Map'
import Messenger from './components/messenger/Messenger'
import Box from '@material-ui/core/Box';
import Header from './components/header/Header';
import { Switch, Route } from "react-router-dom";

const libraries = ["places"] as unknown as undefined;

const App: React.FC = () => {

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey,
      libraries
    })

    return (
      <Box>
        <Header />
        <Switch>
          <Route path="/create-offer" render={() => isLoaded ? <CreateOfferForm /> : <div>Loading maps...</div>} />
          <Route path="/messages" render={() => <Messenger />} />
          <Route path="/" render={() => isLoaded ? <Map /> : <div>Loading maps...</div>} />
        </Switch>
     </Box>
    );
  }

  export default App;
