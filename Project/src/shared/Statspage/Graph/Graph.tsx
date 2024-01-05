import React, { useEffect, useRef, useState } from 'react';
import styles from './graph.css'


interface BarChartData {
    labels: string[];
    values: number[];
}

interface BarChartProps {
    data: BarChartData;
}

const Graph: React.FC<BarChartProps> = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartWidthRef = useRef<number>(0);
    const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

    useEffect(() => {
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

        // Draw bars
        data.values.forEach((value, index) => {
            const x = index * barWidth + 20;
            const barHeight = (value / maxValue) * chartHeight;
            const y = chartHeight - barHeight + 20;

            if (index === hoveredBarIndex || value === 0) {
                if (value === 0) {
                    // Render a different bar for zero values
                    ctx.fillStyle = '#C4C4C4'; // Gray color for zero values
                    ctx.fillRect(x, chartHeight + 15, barWidth - 32, 5);
                } else {
                    ctx.fillStyle = '#DC3E22'; // Red color for hovered non-zero values
                }
            } else {
                // Apply regular style for non-hovered non-zero bars
                ctx.fillStyle = '#EA8979';
            }


            ctx.fillRect(x, y, barWidth - 32, barHeight);

            // Draw bar label
            // ctx.fillStyle = '#999';
            // ctx.fillText(value.toString(), x, y - 32);

            // Draw bar label
            const labelColor = index === hoveredBarIndex ? '#DC3E22' : '#999'; // Change label color on hover


            // Draw x-axis label
            ctx.fillStyle = labelColor;
            const xAxis = index * barWidth + barWidth / 2 + 8;
            ctx.font = '200 24px "SF UI Display"'
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[index], x + (barWidth - 32) / 2, chartHeight + 50);


        });

        // Draw x-axis labels
        // ctx.fillStyle = '#999';
        // data.labels.forEach((label, index) => {
        //     const x = index * barWidth + barWidth / 2 + 8;
        //     const y = chartHeight + 50;
        //     ctx.fillText(label, x, y);
        // });


    }, [data, hoveredBarIndex]);

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;

        const barWidth = chartWidthRef.current / data.labels.length;
        const index = Math.floor((x - 20) / barWidth); // Calculate the index of the hovered bar

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