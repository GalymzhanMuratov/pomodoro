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
    blue: 255
}

const usualcolor: RGB = {
    red: 234,
    green: 137,
    blue: 121
}


const Graph: React.FC<BarChartProps> = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartWidthRef = useRef<number>(0);
    const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
    const animationFrameRef = useRef<number>(0);

    const currentRed = useRef<number>(0)
    const currentGreen = useRef<number>(0)
    const currentBlue = useRef<number>(0)


    // function smoothHover() {
    //     currentRed.current = usualcolor.red
    //     currentGreen.current = usualcolor.green
    //     currentBlue.current = usualcolor.blue

    //     if (currentRed.current === hovercolor.red) {

    //     } else if (currentRed.current < hovercolor.red) {
    //         currentRed.current++

    //     } if (currentRed.current > hovercolor.red) {
    //         currentRed.current--

    //     }

    //     if (currentGreen.current === hovercolor.green) {

    //     } else if (currentGreen.current < hovercolor.green) {
    //         currentGreen.current++

    //     } if (currentGreen.current > hovercolor.green) {
    //         currentGreen.current--

    //     }

    //     if (currentBlue.current === hovercolor.blue) {

    //     } else if (currentBlue.current < hovercolor.blue) {
    //         currentBlue.current++

    //     } if (currentBlue.current > hovercolor.blue) {
    //         currentBlue.current--

    //     }

    //     // requestAnimationFrame(smoothHover)
    //     return `rgb(${currentRed.current},${currentGreen.current},${currentBlue.current} )`
    // }

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

            if (index === hoveredBarIndex || value === 0) {
                if (value === 0) {
                    // Render a different bar for zero values
                    ctx.fillStyle = '#C4C4C4'; // Gray color for zero values
                    ctx.fillRect(x, chartHeight + 15, barWidth - 32, 5);
                } else {

                    ctx.fillStyle = `rgb(${currentRed.current},${currentGreen.current},${currentBlue.current})`;


                }
            } else {
                // Apply regular style for non-hovered non-zero bars
                ctx.fillStyle = `rgb(${usualcolor.red},${usualcolor.green},${usualcolor.blue})`;
            }


            ctx.fillRect(x, y, barWidth - 32, barHeight);

            // Draw bar label
            const labelColor = index === hoveredBarIndex ? `rgb(${hovercolor.red},${hovercolor.green},${hovercolor.blue} )` : '#999';


            // Draw x-axis label
            ctx.fillStyle = labelColor;

            ctx.font = '200 24px "SF UI Display"'
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[index], x + (barWidth - 32) / 2, chartHeight + 50);

            if (hoveredBarIndex !== null) {
                // Update colors for smooth transition
                if (currentRed.current !== hovercolor.red) {
                    currentRed.current = currentRed.current < hovercolor.red ? Math.min(currentRed.current + 1, hovercolor.red) : Math.max(currentRed.current - 1, hovercolor.red);
                }
                if (currentGreen.current !== hovercolor.green) {
                    currentGreen.current = currentGreen.current < hovercolor.green ? Math.min(currentGreen.current + 1, hovercolor.green) : Math.max(currentGreen.current - 1, hovercolor.green);
                }
                if (currentBlue.current !== hovercolor.blue) {
                    currentBlue.current = currentBlue.current < hovercolor.blue ? Math.min(currentBlue.current + 1, hovercolor.blue) : Math.max(currentBlue.current - 1, hovercolor.blue);
                }
                // Request next frame
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        });

    }


    useEffect(() => {

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            // Clean up animation frame
            cancelAnimationFrame(animationFrameRef.current);
        };

    }, []);

    useEffect(() => {

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