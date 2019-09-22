import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from './Menu'
import Overview from './Overview'

import ShoppingIcon from './shopping.svg'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    margin: 10
  }
}));

const ppl = [
  'Avinash',
  'GK',
  'Nivethan'
]

// const splitData = [
//   {
//     id: 1,
//     name: 'Tomato',
//     rate: '9.00',
//     people: {
//       'Avinash': false,
//       'GK': false,
//       'Nivethan': false
//     }
//   },
//   {
//     id: 2,
//     name: 'Chocolate',
//     rate: '3.00',
//     people: {
//       'Avinash': false,
//       'GK': false,
//       'Nivethan': false
//     }
//   },
//   {
//     id: 3,
//     name: 'Oreo',
//     rate: '5.0',
//     people: {
//       'Avinash': false,
//       'GK': false,
//       'Nivethan': false
//     }
//   },
//   {
//     id: 4,
//     name: 'Coke',
//     rate: '2.0',
//     people: {
//       'Avinash': false,
//       'GK': false,
//       'Nivethan': false
//     }
//   }
// ]

export default function SplitList({data: propsData}) {
  const classes = useStyles();
  const overViewRef = useRef(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [splitMenu, setSplitMenu] = React.useState(null)
  const [data, setData] = React.useState(propsData)
  function handleClick (event) {
    setAnchorEl(event.currentTarget);
    setSplitMenu(Number(event.currentTarget.id))
  }

  async function handleSettle () {
    const data = overViewRef.current.getOverViewData()
    const response = await fetch('http://localhost:5000/splitwise', {
      method: 'POST',
      mode:'cors',
      body: JSON.stringify(data),
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    console.log(await response.json())
  }

  function handleOptionChange(ppl, id) {
    const index = data.findIndex(each => each.id === id)
    const newData = data.slice()
    if(index !== -1) {
      newData[index]['people'][ppl] = !data[index]['people'][ppl]
    }
    setData(newData)
  }

  return (
    <div>
      <Overview data={data} ppl={ppl} ref={overViewRef}/>
      <List className={classes.root}>
          {
            data.map((item) =>
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <img src={ShoppingIcon} alt="shopping-cart" width="60%"/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.rate} />
                <ListItemSecondaryAction>
                      <Button
                          aria-controls="customized-menu"
                          aria-haspopup="true"
                          variant="contained"
                          color="primary"
                          id={item.id}
                          onClick={handleClick}
                        >
                          Split
                        </Button>
                        {splitMenu === item.id &&
                        <Menu
                          people = {item.people}
                          anchorEl = {anchorEl}
                          onClose = {() => setAnchorEl(null)}
                          onOptionChange={(ppl) => handleOptionChange(ppl, item.id)}
                        />}
                    </ListItemSecondaryAction>
              </ListItem>
        )
          }
      </List>
      <div className='settle-up'>
        <Button color='primary' size='large' variant='outlined' onClick={handleSettle}>Settle Up</Button>
      </div>
    </div>
  );
}
