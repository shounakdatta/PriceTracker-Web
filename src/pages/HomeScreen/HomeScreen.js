import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List } from "immutable";
import withStyles from "@material-ui/core/styles/withStyles";
import { PageWrapper, Snackbar, LineTrendChart } from "../../components";
import { fetchLastMonthPrices } from "../../actions/ProductActions";
import { styles } from "./HomeStyles";

const tempData = [
  {
    id: "Serie 1",
    data: [
      {
        x: 2000,
        y: 9
      },
      {
        x: 2001,
        y: 4
      },
      {
        x: 2002,
        y: 2
      },
      {
        x: 2003,
        y: 12
      },
      {
        x: 2004,
        y: 10
      }
    ]
  },
  {
    id: "Serie 2",
    data: [
      {
        x: 2000,
        y: 12
      },
      {
        x: 2001,
        y: 9
      },
      {
        x: 2002,
        y: 8
      },
      {
        x: 2003,
        y: 10
      },
      {
        x: 2004,
        y: 8
      }
    ]
  },
  {
    id: "Serie 3",
    data: [
      {
        x: 2000,
        y: 7
      },
      {
        x: 2001,
        y: 6
      },
      {
        x: 2002,
        y: 4
      },
      {
        x: 2003,
        y: 7
      },
      {
        x: 2004,
        y: 5
      }
    ]
  },
  {
    id: "Serie 4",
    data: [
      {
        x: 2000,
        y: 8
      },
      {
        x: 2001,
        y: 8
      },
      {
        x: 2002,
        y: 12
      },
      {
        x: 2003,
        y: 11
      },
      {
        x: 2004,
        y: 12
      }
    ]
  },
  {
    id: "Serie 5",
    data: [
      {
        x: 2000,
        y: 5
      },
      {
        x: 2001,
        y: 12
      },
      {
        x: 2002,
        y: 5
      },
      {
        x: 2003,
        y: 3
      },
      {
        x: 2004,
        y: 60
      }
    ]
  },
  {
    id: "Serie 6",
    data: [
      {
        x: 2000,
        y: 2
      },
      {
        x: 2001,
        y: 5
      },
      {
        x: 2002,
        y: 7
      },
      {
        x: 2003,
        y: 2
      },
      {
        x: 2004,
        y: 3
      }
    ]
  },
  {
    id: "Serie 7",
    data: [
      {
        x: 2000,
        y: 4
      },
      {
        x: 2001,
        y: 3
      },
      {
        x: 2002,
        y: 6
      },
      {
        x: 2003,
        y: 4
      },
      {
        x: 2004,
        y: 7
      }
    ]
  },
  {
    id: "Serie 8",
    data: [
      {
        x: 2000,
        y: 1
      },
      {
        x: 2001,
        y: 7
      },
      {
        x: 2002,
        y: 1
      },
      {
        x: 2003,
        y: 9
      },
      {
        x: 2004,
        y: 9
      }
    ]
  },
  {
    id: "Serie 9",
    data: [
      {
        x: 2000,
        y: 6
      },
      {
        x: 2001,
        y: 10
      },
      {
        x: 2002,
        y: 3
      },
      {
        x: 2003,
        y: 8
      },
      {
        x: 2004,
        y: 11
      }
    ]
  },
  {
    id: "Serie 10",
    data: [
      {
        x: 2000,
        y: 10
      },
      {
        x: 2001,
        y: 11
      },
      {
        x: 2002,
        y: 10
      },
      {
        x: 2003,
        y: 1
      },
      {
        x: 2004,
        y: 4
      }
    ]
  },
  {
    id: "Serie 11",
    data: [
      {
        x: 2000,
        y: 3
      },
      {
        x: 2001,
        y: 1
      },
      {
        x: 2002,
        y: 11
      },
      {
        x: 2003,
        y: 5
      },
      {
        x: 2004,
        y: 1
      }
    ]
  },
  {
    id: "Serie 12",
    data: [
      {
        x: 2000,
        y: 11
      },
      {
        x: 2001,
        y: 2
      },
      {
        x: 2002,
        y: 9
      },
      {
        x: 2003,
        y: 6
      },
      {
        x: 2004,
        y: 2
      }
    ]
  }
];

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
        <LineTrendChart data={List.isList(data) ? [] : data} />
        <Snackbar
          snackbarOpen={snackbarOpen}
          message={snackbarText}
          handleSnackbarClose={() => this.handleSnackbarClose()}
        />
      </PageWrapper>
    );
  }
}

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
