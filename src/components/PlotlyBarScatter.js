import Plot from 'react-plotly.js';
import './PlotlyBarScatter.css';

// src/components/Grafico.jsx
import { useEffect, useState } from 'react';


const BarScatter = () => {

    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'geojson/IGP_1.geojson')
            .then((res) => res.json())
            .then((data) => setGeoData(data));
    }, []);

    if (!geoData) return <div>Cargando datos...</div>;

    const valores = geoData.features.map((f) => f.properties.magnitud); // Ajusta según tus atributos

    return (
        <div className='PlotlyBarScatter'>
            <Plot
                data={[
                    {
                        x: valores,
                        y: valores,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                    {
                        type: 'bar',
                        x: valores,
                        y: valores,
                    },
                ]}
                layout={{
                    title: 'Gráfico combinado',
                    autosize: true,
                    margin: { t: 40, l: 40, r: 20, b: 40 },
                }}
                style={{ width: '100%', height: '100%' }}
                useResizeHandler={true}
                config={{ responsive: true }}
            />
        </div>
    );
};

export default BarScatter;
