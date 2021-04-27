import Chart from "react-apexcharts";
const series = [
  {
    data: [
      {
        x: "New Delhi",
        y: 218,
      },
      {
        x: "Kolkata",
        y: 149,
      },
      {
        x: "Mumbai",
        y: 184,
      },
      {
        x: "Ahmedabad",
        y: 55,
      },
      {
        x: "Bangaluru",
        y: 84,
      },
      {
        x: "Pune",
        y: 31,
      },
      {
        x: "Chennai",
        y: 70,
      },
      {
        x: "Jaipur",
        y: 30,
      },
      {
        x: "Surat",
        y: 44,
      },
      {
        x: "Hyderabad",
        y: 68,
      },
      {
        x: "Lucknow",
        y: 28,
      },
      {
        x: "Indore",
        y: 19,
      },
      {
        x: "Kanpur",
        y: 29,
      },
    ],
  },
];

const options: ApexCharts.ApexOptions = {
  legend: {
    show: false,
  },
  chart: {
    height: 350,
    type: "treemap",
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
  id: number | string;
  name: string;
  count: number;
}
type CategoryTreeMapChartProps = {
  data: Array<CategoryDataItem>;
  height?: number;
};
const CategoryTreeMapChart = (props: CategoryTreeMapChartProps) => {
  const { data, height } = props;
  const chartData = data.map((dataPoint) => ({
    id: dataPoint.id,
    x: dataPoint.name,
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
