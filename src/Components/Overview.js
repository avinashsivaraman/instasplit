import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PaidSelect from './PaidSelect'

const ppl = {
  'Avinash': 0,
  'GK': 0,
  'Nivethan': 0
}

const useStyles = {
  card: {
    minWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

// function horizontalListView(overView) {
//   console.log(overView)
//   return ()
// }

export default class Overview extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      overViewData: ppl,
      selected: ''
    }
    this.classes = useStyles
  }

  componentWillMount() {
    const reducer = (acc, curr) => acc + Number(curr['rate'])
    this.sum = this.props.data.reduce(reducer, 0.0)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      const newOverView = Object.assign({}, ppl)
      for (let item of nextProps.data) {

        const count = Object.keys(item.people).filter(e => item.people[e])
        if (count.length) {
          for(let p of count) {
            newOverView[p] += Number(item.rate) / count.length
          }
        }
      }
      this.setState({overViewData: newOverView})
    }
  }

  handleSelect = event => {
    this.setState({selected: event.target.value})
  }

  getOverViewData = () => {
    return {
      'Paid': this.state.selected,
      'Owes': this.state.overViewData
    }
  }
  render() {
    const classes = this.classes
    const { selected } = this.state
    return(<div className='overview'>
    <div className='header'>
      <Typography variant="h5" color="primary" align="left">
          Total Amount
      </Typography>
      <Typography variant="h6" color="textPrimary" align="right">
          ${this.sum}
      </Typography>
    </div>
    <div className='overflow-list'>
      <div className='overflow-list-item'>
        <PaidSelect selected={this.state.selected} ppl={Object.keys(ppl)} onSelect={this.handleSelect}/>
      </div>
      {
        Object.keys(this.state.overViewData).map(item =>
          <Card style={classes.card}>
          <CardContent>
            <Typography style={classes.title} color="textSecondary" gutterBottom>
              {item}
            </Typography>
            {selected && <Typography style={classes.pos} color={selected !== item ? "secondary" : "primary"}>
              {selected !== item ? 'owes '+this.state.selected : 'Your contribution'}
            </Typography>}
            <Typography variant="h5" component="h2">
              {this.state.overViewData[item]}
            </Typography>
          </CardContent>
        </Card>
        )
      }

    </div>
  </div>)
  }
}
