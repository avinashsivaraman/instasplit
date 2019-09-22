import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PaidSelect({ppl, selected, onSelect}) {
  const classes = useStyles()
  return (
    <form className={classes.root} autoComplete="off">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-simple">
          Paid By
        </InputLabel>
        <Select
          value={selected}
          onChange={onSelect}
          labelWidth={50}
          inputProps={{
            name: 'ppl',
            id: 'outlined-age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {ppl.map(each => <MenuItem value={each}>{each}</MenuItem>)}
        </Select>
      </FormControl>

    </form>
  );
}
