import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
// routing
import routes from '../../routes';
// configuration mocks
import { navigation } from './config';
// application shell components
import Header from 'modules/header';
import Footer from 'modules/footer';
// global application styles
import './styles.css';

function App() {
    return (
        <div>
            <Helmet
                titleTemplate="%s - CNN.com"
                defaultTitle="CNN React Starter Kit"
            >
                <meta name="description" content="A simple starter kit for building React applications." />
            </Helmet>
            <Header links={navigation} />
            <Switch>
                {routes.map((route, i) => (
                    <Route key={i} {...route} />
                ))}
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
