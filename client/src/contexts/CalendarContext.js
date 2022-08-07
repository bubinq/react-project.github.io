import dayjs from "dayjs";
import { createContext, useState } from "react";

const CalendarContext = createContext();


export const CalendarProvider = ({ children }) => {
    const [monthIdx, setMonthIdx] = useState(dayjs().month())
    const [dayTarget, setDayTarget] = useState(null)
    const [popModal, setPopModal] = useState(false)

    const popModalHandler = () => {
        setPopModal(!popModal)
    }

    return (
        <CalendarContext.Provider
            value={{
                monthIdx,
                setMonthIdx,
                dayTarget,
                setDayTarget,
                popModal,
                setPopModal,
                popModalHandler
            }}>{children}</CalendarContext.Provider>
    )

}

export default CalendarContext;
