import React, { useEffect, useRef, useState } from 'react';
import styles from './graph.css'


interface BarChartData {
    labels: string[];
    values: number[];
}

interface BarChartProps {
    data: BarChartData;
}

type ComputeRange<
    N extends number,
    Result extends Array<unknown> = [],
> =
    (Result['length'] extends N
        ? Result
        : ComputeRange<N, [...Result, Result['length']]>
    )

type Octal = ComputeRange<256>[number] // 0 - 255


type RGB = {
    red: Octal,
    green: Octal,
    blue: Octal,
}

const hovercolor: RGB = {
    red: 220,
    green: 62,
    blue: 34
}

const defaultColor: RGB = {
    red: 234,
    green: 137,
    blue: 121
}


const Graph: React.FC<BarChartProps> = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartWidthRef = useRef<number>(0);
    const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
    const animationFrameRef = useRef<number>(0);

    const [usualcolor, setUsualColor] = useState({
        red: 234,
        green: 137,
        blue: 121
    });

    const animate = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Define chart dimensions and margins
        chartWidthRef.current = canvas.width - 40
        const chartHeight = canvas.height - 50;
        const barWidth = chartWidthRef.current / data.labels.length;
        const maxValue = Math.max(...data.values);


        ctx.clearRect(0, 0, canvas.width, canvas.height);


        // Draw bars
        data.values.forEach((value, index) => {
            const x = index * barWidth + 20;
            const barHeight = (value / maxValue) * chartHeight;
            const y = chartHeight - barHeight + 20;

            if (hoveredBarIndex !== null && hoveredBarIndex == hoveredBarIndex) {
                console.log('HovIndex:', hoveredBarIndex, 'index:', index)
                if (usualcolor.green != hovercolor.green || usualcolor.red != hovercolor.red || usualcolor.blue != hovercolor.blue) {
                    setUsualColor((usualcolor) => {
                        return {
                            red: usualcolor.red != hovercolor.red && usualcolor.red > hovercolor.red ? usualcolor.red - (Math.abs(defaultColor.red - hovercolor.red) / 200) : hovercolor.red,
                            green: usualcolor.green != hovercolor.green && usualcolor.green > hovercolor.green ? usualcolor.green - (Math.abs(defaultColor.green - hovercolor.green) / 200) : hovercolor.green,
                            blue: usualcolor.blue != hovercolor.blue && usualcolor.blue < hovercolor.blue ? usualcolor.blue + (Math.abs(defaultColor.blue - hovercolor.blue) / 200) : hovercolor.blue,
                        }
                    })
                }
            } else {
                if (usualcolor.green != defaultColor.green || usualcolor.red != defaultColor.red || usualcolor.blue != defaultColor.blue) {
                    setUsualColor((usualcolor) => {
                        return {
                            red: usualcolor.red != defaultColor.red && usualcolor.red < defaultColor.red ? usualcolor.red + (Math.abs(defaultColor.red - hovercolor.red) / 200) : defaultColor.red,
                            green: usualcolor.green != defaultColor.green && usualcolor.green < defaultColor.green ? usualcolor.green + (Math.abs(defaultColor.green - hovercolor.green) / 200) : defaultColor.green,
                            blue: usualcolor.blue != defaultColor.blue && usualcolor.blue > defaultColor.blue ? usualcolor.blue - (Math.abs(defaultColor.blue - hovercolor.blue) / 200) : defaultColor.blue,
                        }
                    })
                }
            }

            if (index === hoveredBarIndex || value === 0) {
                if (value === 0) {
                    // Render a different bar for zero values
                    ctx.fillStyle = '#C4C4C4'; // Gray color for zero values
                    ctx.fillRect(x, chartHeight + 15, barWidth - 32, 5);
                } else {

                    ctx.fillStyle = `rgb(${usualcolor.red},${usualcolor.green},${usualcolor.blue})`;


                }
            } else {
                // Apply regular style for non-hovered non-zero bars
                ctx.fillStyle = `rgb(${defaultColor.red},${defaultColor.green},${defaultColor.blue})`;
            }


            ctx.fillRect(x, y, barWidth - 32, barHeight);

            // Draw bar label
            const labelColor = index === hoveredBarIndex ? `rgb(${usualcolor.red},${usualcolor.green},${usualcolor.blue} )` : '#999';


            // Draw x-axis label
            ctx.fillStyle = labelColor;

            ctx.font = '200 24px "SF UI Display"'
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[index], x + (barWidth - 32) / 2, chartHeight + 50);
        });

    }


    useEffect(() => {
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            // Clean up animation frame
            cancelAnimationFrame(animationFrameRef.current);
        };

    }, [hoveredBarIndex, usualcolor]);


    useEffect(() => {
        setUsualColor({
            red: 234, green: 137, blue: 121
        })
    }, [hoveredBarIndex])

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;

        const barWidth = chartWidthRef.current / data.labels.length;
        const index = Math.floor((x - 20) / barWidth);

        setHoveredBarIndex(index >= 0 && index < data.labels.length ? index : null);

    };

    const handleMouseLeave = () => {

        setHoveredBarIndex(null);

    };

    return (
        <div className={styles.wrap} >
            <canvas ref={canvasRef} width={730} height={458} onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave} />
            <div className={styles.timelines}>
                <span className={styles.timeline}>1 ч 40 мин</span>
                <span className={styles.timeline}>1 ч 15 мин</span>
                <span className={styles.timeline}>50 мин</span>
                <span className={styles.timeline}>25 мин</span>
            </div>
        </div>
    );
};

export default Graph;