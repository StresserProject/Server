import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

function getUniqueColor(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var c = (hash & 0x00ffffff).toString(16).toUpperCase();

    return '#' + '00000'.substring(0, 6 - c.length) + c;
}

/**
 * @param {{
 * data: any[]
 * labelKey: string
 * dataKey: string
 * onClick: (attribute:string) => void
 * onRightClick: () => void
 * }} props
 */
function CustomPieChart({ data, labelKey, dataKey, onClick, onRightClick }) {
    const getLabelToShow = ({ index, x, y, textAnchor }) => (
        <text x={x} y={y} textAnchor={textAnchor} fill="black">
            {data[index][dataKey]}
        </text>
    );

    return (
        <ResponsiveContainer width="50%">
            <PieChart>
                <Pie
                    data={data}
                    fill="#8884d8"
                    outerRadius={100}
                    dataKey={dataKey}
                    label={getLabelToShow}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={getUniqueColor(entry[labelKey])}
                            onClick={() => onClick(entry[labelKey])}
                            onContextMenu={(event) => {
                                event.preventDefault();
                                onRightClick();
                            }}
                        />
                    ))}
                </Pie>
                <Legend
                    align="left"
                    layout="vertical"
                    verticalAlign="middle"
                    payload={data.map((obj) => ({
                        value: obj[labelKey],
                        color: getUniqueColor(obj[labelKey]),
                    }))}
                    wrapperStyle={{ left: 100 }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default CustomPieChart;
