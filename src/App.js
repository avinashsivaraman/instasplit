import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import NavBar from './Components/NavBar'
// import ProTip from './ProTip';
import Main from './Components/Main'
import './App.scss'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         InstaSplit
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

export default function App() {
  return (
    <div>
      <NavBar/>
      <div className='main-app'>
        <Main />
      </div>
      {/* <footer>
        <Copyright />
      </footer> */}
    </div>
  );
}
