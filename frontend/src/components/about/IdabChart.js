import React, {useState} from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

const IdabChart = () => {

  const [dataDoughnut, setDataDoughnut] = useState({
    labels: ["Высшее экономическое", "Инженерно-техническое и естественнонаучное", "Гуманитарное"],
    datasets: [
      {
        data: [60, 35, 5],
        backgroundColor: ["#5b2732", "#7099AD", "#BBD6DC"],
        hoverBackgroundColor: [
          "#803747",
          "#91b0bf",
          "#bad5db"
        ]
      }
    ]
  })

  return (
    <MDBContainer className='py-5'>
      <h4 className="text-center">Образование слушателей&nbsp;(%)</h4>
      <Doughnut data={dataDoughnut} options={{ responsive: true }} />
    </MDBContainer>
    );

}

export default IdabChart;