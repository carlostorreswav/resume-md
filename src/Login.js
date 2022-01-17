// import firebase from 'firebase/app'
// import { firebaseHandler } from './Firebase'

import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import 'firebase/auth'
import { FirebaseContext } from './FirebaseContext'
import { getAuth } from "firebase/auth";
import { useContext, useEffect } from 'react'
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {

    const Fire = useContext(FirebaseContext)

    const getUiConfig = provider => ({
        signInSuccessUrl: '/',
        signInFlow: 'popup',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          provider.PROVIDER_ID,
        //   fireAuth.EmailAuthProvider.PROVIDER_ID,
        //   fireAuth.PhoneAuthProvider.PROVIDER_ID        
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: 'ToS',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
          window.location.assign('');
        }
      })

      const setElse = async () => {
        console.log('setElse')
        const fireAuth = await getAuth()
        // console.log('fireAuth', fireAuth)
        const ui = new firebaseui.auth.AuthUI(fireAuth)
        const provider = await new GoogleAuthProvider();
        console.log('provider', provider.PROVIDER_ID)
        console.log('fireAuth', fireAuth.GoogleAuthProvider)
        const uiConfig = getUiConfig(provider)
        console.log('uiConfig', uiConfig)
        ui.start('#firebaseui-auth-container', uiConfig)
      }

    useEffect(() => {
        // if(firebaseui.auth.AuthUI.getInstance()) {
        //     const ui = firebaseui.auth.AuthUI.getInstance()
        //     const fireAuth = getAuth()
        //     const uiConfig = getUiConfig(fireAuth)
        //     ui.start('#firebaseui-auth-container', uiConfig)
        //   } else {
        console.log('useEffect!')
            setElse()
        //   }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <><br/><br/><br/><br/><br/><br/><br/><div id="firebaseui-auth-container"></div></>
}
export default Login