"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../component/Navbar';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const TaiPerformance = () => {
    const [currentTopic, setCurrentTopic] = useState('');
    const [averagedData, setAveragedData] = useState([]);
    const [lowestAveragedData, setLowestAveragedData] = useState([]);
    const [noDataAvailable, setNoDataAvailable] = useState(false);
    const [chatSummary, setChatSummary] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const topic = searchParams.get('code');
        if (topic) {
            setCurrentTopic(topic);
            fetchData(topic);
        }
    }, [searchParams]);

    const fetchData = async (topic) => {
        const q = query(collection(firestore, 'teaching_assistants'));
        const querySnapshot = await getDocs(q);
        let scoreMap = {};

        querySnapshot.forEach((doc) => {
            if (doc.data().title === topic) {
                const emotionData = doc.data().emotionData;
                const summary = doc.data().chatSummary || '';
                setChatSummary(summary);

                if (emotionData === undefined) {
                    setNoDataAvailable(true);
                    return;
                }
                emotionData.forEach(({ name, score }) => {
                    if (scoreMap[name]) {
                        scoreMap[name].push(score);
                    } else {
                        scoreMap[name] = [score];
                    }
                });
            }
        });

        const sortedAverages = Object.keys(scoreMap).map(name => ({
            name,
            averageScore: scoreMap[name].reduce((a, b) => a + b, 0) / scoreMap[name].length
        })).sort((a, b) => b.averageScore - a.averageScore);

        setAveragedData(sortedAverages.slice(0, 10));
        setLowestAveragedData(sortedAverages.slice(-10).reverse()); // Take the last 10 and reverse to get ascending order
    };

    const chartData = (dataSet, label) => ({
        labels: dataSet.map(item => item.name),
        datasets: [{
            label: `${currentTopic} ${label}`,
            data: dataSet.map(item => item.averageScore),
            backgroundColor: 'rgba(30, 64, 175, 0.2)',
            borderColor: 'rgba(30, 64, 175, 1)',
            pointBackgroundColor: 'rgba(30, 64, 175, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(30, 64, 175, 1)'
        }]
    });

    const chartData2 = (dataSet, label) => ({
        labels: dataSet.map(item => item.name),
        datasets: [{
            label: `${currentTopic} ${label}`,
            data: dataSet.map(item => item.averageScore),
            backgroundColor: 'rgba(17, 94, 89, 0.2)',
            borderColor: 'rgba(17, 94, 89, 1)',
            pointBackgroundColor: 'rgba(17, 94, 89, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(17, 94, 89, 1)'
        }]
    });

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 0.9
            }
        },
        elements: {
            line: {
                borderWidth: 3
            }
        }
    };

    const optionsMin = {
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 0.1
            }
        },
        elements: {
            line: {
                borderWidth: 3
            }
        }
    };

    return (
        <div className='h-screen w-full items-center justify-center flex flex-col bg-sky-100'>
            <div className="w-full">
                <Navbar student={false} />
            </div>
            <div className="h-5/6 w-11/12 flex flex-col justify-center items-center p-4">
                <div className="h-full flex-grow bg-white rounded-3xl items-center justify-center shadow-lg ">
                <div className="flex-grow flex-wrap flex bg-four rounded-3xl justify-center items-center">
                    <h1 className="text-xl font-bold text-blue-700 text-center">{currentTopic} Student Performance Analytics</h1>
                    <h3 className="text-med text-black text-center">{chatSummary}</h3>
                    {!noDataAvailable && 
                        <div className="flex-grow flex rounded-3xl mx-auto bg-white justify-center items-center flex-wrap">
                            <div className="p-4">
                                <p>{currentTopic} - Top 10 Avg Emotional Response</p>
                                <div style={{ width: 475, height: 475 }}>
                                    <Radar data={chartData(averagedData, ': Emotional Scores based on Audio & Video')} options={options} />
                                </div>
                            </div>
                            <div className="p-4">
                                <p>{currentTopic} - Lowest 10 Avg Emotional Responses</p>
                                <div style={{ width: 475, height: 475 }}>
                                    <Radar data={chartData2(lowestAveragedData, ': Emotional Scores based on Audio & Video')} options={optionsMin} />
                                </div>
                            </div>
                        </div>
                    }
                    <div>
                    </div>
                    {noDataAvailable && <p className='text-med text-center'>No students have worked with this TA yet! Please wait for students to interact with the module for more feedback and recommendations.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaiPerformance;