import { useEffect } from 'react'
import 'tailwindcss/tailwind.css'
import Cookies from 'js-cookie'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
      if (typeof window === 'undefined' && !Boxever) {
        console.warn("Can't fire off ident event, either SSR or no Boxever.")
        return;
      }
      let email = Cookies.get('email');
      if (email) {
        console.log("Sending ident for email: " + email + " with browser ID: " + Boxever.getID());
        _boxeverq.push(function() { 
          var identEvent = {
              "type": "IDENTITY",
              "email": email,
              "browser_id": Boxever.getID(),
              "channel": "WEB",
              "language": "EN",
              "currency": "USD",
              "page": window.location.pathname,
              "pos": "cdp-red"
          };

          console.log(identEvent)
          identEvent = Boxever.addUTMParams(identEvent);
          Boxever.eventCreate(identEvent, function(data){}, 'json');
      });
      }
      }, []);
  return <Component {...pageProps} />
}

export default MyApp
