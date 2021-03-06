import React from "react";
import Chart from "react-apexcharts";

interface BotAlignmentDataItem {
  label: string;
  count: number;
}
type BotAlignmentPieChartProps = {
  /**
   * Data to display in the chart
   */
  data: Array<BotAlignmentDataItem>;
  /**
   * Height of the chart
   */
  height?: number;
  /**
   * Title of the chart
   */
  title?: string;
};

/**
 * Pie chart component for bot alignment
 */
const BotAlignmentPieChart = (props: BotAlignmentPieChartProps) => {
  const { data, height, title } = props;
  const labels = data?.map((dataPoint) => dataPoint.label.toString());
  const values = data?.map((dataPoint) => dataPoint.count);

  const options: ApexCharts.ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
    },
    chart: {
      events: {
        // dataPointSelection: (event, chartContext, config) => {
        //   const { dataPointIndex } = config;
        //   console.log(dataPointIndex);
        //   // TODO: anything happens when clicking item in chart?
        // },
      },
      toolbar: {
        show: true,
      },
    },
    labels: labels,
    title: {
      text: title ? title : "Bot alignment",
    },
  };

  return (
    <Chart
      options={options}
      series={values}
      type="pie"
      height={height ? height : 400}
    />
  );
};

export default BotAlignmentPieChart;
