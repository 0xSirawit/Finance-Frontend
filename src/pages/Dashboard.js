import { Doughnut, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
} from "chart.js";

import { useContext } from "react";
import { TransactionContext } from "../components/TransactionContext";
import { Col, Row } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, BarElement);

function Dashboard() {
    const { transactionData } = useContext(TransactionContext);
    const aggregateDataByCategory = (data, type) => {
        const filteredData = data.filter((item) => item.type === type);
        const categoryMap = {};

        filteredData.forEach((item) => {
            if (categoryMap[item.category]) {
                categoryMap[item.category] += item.amount;
            } else {
                categoryMap[item.category] = item.amount;
            }
        });

        return {
            labels: Object.keys(categoryMap),
            amounts: Object.values(categoryMap),
        };
    };
    const aggregateDataByDate = (data, type) => {
        const filteredData = data.filter((item) => item.type === type);
        const dateMap = {};

        filteredData.forEach((item) => {
            const date = new Date(item.action_datetime).toLocaleDateString();
            if (dateMap[date]) {
                dateMap[date] += item.amount;
            } else {
                dateMap[date] = item.amount;
            }
        });
        const sortedDates = Object.keys(dateMap).sort((a, b) => new Date(a) - new Date(b));
        return {
            dates: sortedDates,
            amounts: sortedDates.map((date) => dateMap[date]),
        };
    };

    const expenseData = aggregateDataByCategory(transactionData, "expense");
    const expenseByDate = aggregateDataByDate(transactionData, "expense");
    const incomeByDate = aggregateDataByDate(transactionData, "income");
    const chartContainerStyle = {
        borderRadius: "8px",
        padding: "15px",
        border: "2px solid #F5F5F5",
        justifyItems: "center",
    };
    return (
        <>
            <Row justify="space-between">
                <Col span={8} style={chartContainerStyle}>
                    <h3>Spending Categories Overview</h3>
                    <Doughnut
                        data={{
                            labels: expenseData.labels,
                            datasets: [
                                {
                                    label: "Total Expense",
                                    data: expenseData.amounts,
                                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                                },
                            ],
                        }}
                    />
                </Col>
                <Col span={15} style={chartContainerStyle}>
                    <h3>Tracking Daily Income and Expenses</h3>
                    <Bar
                        data={{
                            labels: expenseByDate.dates,
                            datasets: [
                                {
                                    label: "Expense",
                                    data: expenseByDate.amounts,
                                    borderColor: "#FF6384",
                                    backgroundColor: "rgba(255, 99, 132, 0.8)",
                                    tension: 0.3,
                                },
                                {
                                    label: "Income",
                                    data: incomeByDate.amounts,
                                    borderColor: "#36A2EB",
                                    backgroundColor: "rgba(54, 162, 235, 0.8)",
                                    tension: 0.3,
                                },
                            ],
                        }}
                        options={{
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: "Date",
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: "Amount",
                                    },
                                },
                            },
                        }}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;
