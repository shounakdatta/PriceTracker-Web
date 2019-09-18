import React, { Component } from "react";
import { TextField, Paper, Button, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { styles } from "./style";

class AddProductPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: undefined
    };
  }
  render() {
    const { classes, onAdd } = this.props;
    const { url } = this.state;
    return (
      <Paper>
        <div className={classes.container}>
          <TextField
            id="standard-full-width"
            label="New Product"
            style={{ margin: 8 }}
            placeholder="Enter product URL"
            onChange={e => this.setState({ url: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => onAdd(url)}
            >
              Add
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

AddProductPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default withStyles(styles)(AddProductPanel);
