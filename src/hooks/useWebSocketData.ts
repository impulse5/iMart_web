import { useEffect, useState } from "react";
import cable from "@/cable";

const useWebSocketData = (MartketChannel: string, marketId: string, dataKey: string) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const subscription = cable.subscriptions.create(
            { channel: MartketChannel, market_id: marketId },
            {
                received(data: any) {
                    const receivedData = data[dataKey];
                    const formattedData = Object.keys(receivedData).map((key) => ({
                        name: key,
                        value: receivedData[key],
                        fill: getRandomColor(),
                    }));
                    setData(formattedData as never);
                },
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [MartketChannel, marketId, dataKey]);

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return data;
};

export default useWebSocketData;
