import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { List } from "immutable";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  PageWrapper,
  Snackbar,
  LineTrendChart,
  AddProductPanel
} from "../../components";
import { fetchLastMonthPrices } from "../../actions/ProductActions";
import { styles } from "./HomeStyles";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      snackbarOpen: false,
      snackbarText: ""
    };
  }

  componentDidMount() {
    this.props.actions.fetchLastMonthPrices();
  }

  handleSnackbarOpen = text => {
    this.setState({
      snackbarText: text,
      snackbarOpen: true
    });
  };

  handleSnackbarClose() {
    this.setState({
      snackbarText: "",
      snackbarOpen: false
    });
  }

  render() {
    const { classes } = this.props;
    const { snackbarOpen, snackbarText } = this.state;
    const products = this.props.prodStore.get("products");
    const data =
      !!products &&
      products.map(({ name, prices }) => ({
        id: name,
        data: prices.map(({ date, price }) => ({
          x: date.toDate().toLocaleDateString("en-us"),
          y: price
        }))
      }));

    return (
      <PageWrapper pageHeader="Dashboard">
        <div className={classes.container}>
          <LineTrendChart data={List.isList(data) ? [] : data} />
          <AddProductPanel onAdd={url => console.log(url)} />
        </div>
        <Snackbar
          snackbarOpen={snackbarOpen}
          message={snackbarText}
          handleSnackbarClose={() => this.handleSnackbarClose()}
        />
      </PageWrapper>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userStore: state.UserStore,
    prodStore: state.ProductStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchLastMonthPrices
      },
      dispatch
    )
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
