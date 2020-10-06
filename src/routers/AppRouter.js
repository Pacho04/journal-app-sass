import React, { useEffect, useState } from 'react';
import { firebase} from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import AuthRouter from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PrivateRouter } from './PrivateRouter';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [cheking, setCheking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }

            setCheking(false);
            
        });

    }, [dispatch, setCheking, setIsLoggedIn])

    if(cheking){
        return(
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRouter path="/auth" isAuthenticated={isLoggedIn} component={AuthRouter} />

                    <PrivateRouter exact path="/" isAuthenticated={isLoggedIn} component={JournalScreen} />

                    <Redirect to="/auth/login"/>
                </Switch>
            </div>


        </Router>
    )
}
