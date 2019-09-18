import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { ResponsiveLine } from "@nivo/line";
import { styles } from "./style";

class LineTrendChart extends Component {
  render() {
    const { data, classes } = this.props;
    return (
      <div className={classes.parentContainer}>
        <Paper>
          <div className={classes.container}>
            <ResponsiveLine
              data={data}
              margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
              yScale={{ type: "linear", stacked: false, min: "0", max: "auto" }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Date",
                legendOffset: 36,
                legendPosition: "middle"
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Price",
                legendOffset: -40,
                legendPosition: "middle"
              }}
              colors={{ scheme: "nivo" }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 130,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 100,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

LineTrendChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LineTrendChart);
