import Chart from "react-apexcharts";

const options: ApexCharts.ApexOptions = {
  legend: {
    show: false,
  },
  chart: {
    events: {
      dataPointSelection: (event, chartContext, config) => {
        // console.log(config);
        const { dataPointIndex } = config;
        console.log(dataPointIndex);
        // TODO: anything happens when clicking item in chart?
      },
    },
  },
  title: {
    text: "Categories",
  },
};

interface CategoryDataItem {
  id?: number | string;
  label: string;
  count: number;
}
type CategoryTreeMapChartProps = {
  /**
   * Data for category treemap chart
   */
  data: Array<CategoryDataItem>;
  /**
   * Height of chart
   */
  height?: number;
};

/**
 * Category treemap chart to be displayed on Stats page
 */
const CategoryTreeMapChart = (props: CategoryTreeMapChartProps) => {
  const { data, height } = props;
  const chartData = data.map((dataPoint) => ({
    id: dataPoint.id,
    x: dataPoint.label,
    y: dataPoint.count,
  }));
  const chartSeries = [{ data: chartData }];
  return (
    <Chart
      options={options}
      series={chartSeries}
      type="treemap"
      height={height ? height : 400}
    />
  );
};

export default CategoryTreeMapChart;
