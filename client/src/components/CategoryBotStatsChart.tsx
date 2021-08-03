import Chart from "react-apexcharts";

const options: ApexCharts.ApexOptions = {
  chart: {
    events: {
      dataPointSelection: (event, chartContext, config) => {
        // console.log(config);
        const { dataPointIndex } = config;
        console.log(dataPointIndex);
        // TODO: anything happens when clicking item in chart?
      },
    },
    zoom: {
      enabled: false,
    },
  },

  xaxis: {
    tickAmount: 2,
    min: 0,
    max: 4,
    title: {
      text: "Political inclination",
    },
  },
  yaxis: {
    min: 0,
    max: 1,
    tickAmount: 1,
    labels: {
      show: true,
      formatter: (value: any) => {
        return value === 1.0 ? "Male" : "Female";
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    show: false,
  },
  title: {
    text: "Correlation between categories and bot properties",
  },
  legend: {
    position: "right",
    show: true,
    onItemHover: {
      highlightDataSeries: true,
    },
  },
};

interface CategoryDataItem {
  id?: number | string;
  label: string;
  avgGender: number;
  avgPolitical: number;
}
type CategoryBotStatsChartProps = {
  data: Array<CategoryDataItem>;
  height?: number;
};
const CategoryBotStatsChart = (props: CategoryBotStatsChartProps) => {
  const { data, height } = props;
  // const chartData = data.map((dataPoint) => ({
  //   id: dataPoint.id,
  //   x: dataPoint.label,
  //   y: dataPoint.count,
  // }));
  //const chartSeries = [{ data: chartData }];

  const chartSeries = data.map((point) => ({
    name: point.label,
    data: [[point.avgPolitical, point.avgGender]],
  }));
  // const chartSeries = [
  //   {
  //     name: "tech",
  //     data: [[3, 0.9]],
  //   },
  //   {
  //     name: "uncategorised",
  //     data: [[1, 0.3]],
  //   },
  // ];
  return (
    <Chart
      options={options}
      series={chartSeries}
      type="scatter"
      height={height ? height : 400}
    />
  );
};

export default CategoryBotStatsChart;
