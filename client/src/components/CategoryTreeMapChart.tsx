import React from "react";
import Chart from "react-apexcharts";
// import { Treemap } from "react-vis";
// import "react-vis/dist/style.css";

// import { Treemap, ResponsiveContainer } from "recharts";

// const data = [
//   {
//     name: "axis",
//     children: [
//       { name: "Axes", size: 1302 },
//       { name: "Axis", size: 24593 },
//       { name: "AxisGridLine", size: 652 },
//       { name: "AxisLabel", size: 636 },
//       { name: "CartesianAxes", size: 6703 },
//     ],
//   },
//   {
//     name: "controls",
//     children: [
//       { name: "AnchorControl", size: 2138 },
//       { name: "ClickControl", size: 3824 },
//       { name: "Control", size: 1353 },
//       { name: "ControlList", size: 4665 },
//       { name: "DragControl", size: 2649 },
//       { name: "ExpandControl", size: 2832 },
//       { name: "HoverControl", size: 4896 },
//       { name: "IControl", size: 763 },
//       { name: "PanZoomControl", size: 5222 },
//       { name: "SelectionControl", size: 7862 },
//       { name: "TooltipControl", size: 8435 },
//     ],
//   },
// ];
// const TreeMapChart = (props: any) => {
//   return (
//     <>
//       <div style={{ width: 600, height: 400 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <Treemap
//             width={600}
//             height={400}
//             data={data}
//             dataKey="size"
//             // ratio={4 / 3}
//             stroke="#fff"
//             fill="#8884d8"
//           />
//         </ResponsiveContainer>
//       </div>
//     </>
//   );
// };

// const myData = {
//   title: "analytics",
//   color: "#12939A",
//   children: [
//     {
//       title: "cluster",
//       children: [
//         { title: "AgglomerativeCluster", color: "#12939A", size: 3938 },
//         { title: "CommunityStructure", color: "#12939A", size: 3812 },
//         { title: "HierarchicalCluster", color: "#12939A", size: 6714 },
//         { title: "MergeEdge", color: "#12939A", size: 743 },
//       ],
//     },
//     {
//       title: "graph",
//       children: [
//         { title: "BetweennessCentrality", color: "#12939A", size: 3534 },
//         { title: "LinkDistance", color: "#12939A", size: 5731 },
//         { title: "MaxFlowMinCut", color: "#12939A", size: 7840 },
//         { title: "ShortestPaths", color: "#12939A", size: 5914 },
//         { title: "SpanningTree", color: "#12939A", size: 3416 },
//       ],
//     },
//     {
//       title: "optimization",
//       children: [{ title: "AspectRatioBanker", color: "#12939A", size: 7074 }],
//     },
//   ],
// };
// const TreeMapChart = (props: any) => {
//   return (
//     <>
//       <Treemap
//         title={"My New Treemap"}
//         width={500}
//         height={500}
//         data={myData}
//       />
//     </>
//   );
// };
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
  },
  title: {
    text: "Basic Treemap",
  },
};

const TreeMapChart = () => {
  return (
    <Chart options={options} series={series} type="treemap" height={350} />
  );
};

export default TreeMapChart;
