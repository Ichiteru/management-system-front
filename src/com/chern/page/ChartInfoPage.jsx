import React, {useEffect, useState} from 'react';
import {CanvasJSChart} from "canvasjs-react-charts";
import {useFetching} from "../hook/useFetching";
import CompanyService from "../service/CompanyService";
import VacancyService from "../service/VacancyService";

const ChartInfoPage = () => {

    const [chartData, setChartData] = useState([])
    const [opts, setOpts] = useState({})
    const [fetchChart, isLoading, error] = useFetching(async ()  => {
        let response = await VacancyService.getChart();
        setOpts({
            exportEnabled: true,
            title: {
                text: "Заявки на вакансии"
            },
            data: [
                {
                    type: "column",
                    dataPoints: fullChartData(response.data)
                }
            ]
        })
    })

    function fullChartData(opts){
        let temp = [];
        for (let vacancy in opts){
            temp = [...temp, {label: vacancy, y: opts[vacancy]}]
        }
        return temp
    }

    useEffect(() => {
        fetchChart();
    }, [])

    return (
        <div className='container m-lg-4'>
            <div>
                <CanvasJSChart options = {opts}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        </div>
    );
};

export default ChartInfoPage;