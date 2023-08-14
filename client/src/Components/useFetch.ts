import { useEffect, useState } from "react"

export const useFetch = <T>(url: string): [T[], React.Dispatch<React.SetStateAction<T[]>>, boolean] => {
    const [request, setRequest] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchReq = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data: T[] = await response.json();
            if (data) {
                setRequest(data);
                setLoading(false);
            }
        } catch (error) {
            return error;
        }

    }
    useEffect(() => {
        fetchReq();
    }, []);

    return [request, setRequest, loading];
}