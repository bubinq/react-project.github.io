import styles from "../Dashboard.module.css"
import { useEffect, useState, useContext } from "react";
import CalendarContext from "../../../contexts/CalendarContext";
import Month from "./Month";
import { Header } from "./Header";
import { displayMonth } from "./Utils";
import { SideBar } from "./SideBar";
import { EventPopUp } from "./EventPopUp";
import { Navigation } from "../../Navigation";

export const Calendar = () => {
    const { monthIdx, popModal } = useContext(CalendarContext);
    const [month, setMonth] = useState(displayMonth());

    useEffect(() => {
        setMonth(displayMonth(monthIdx))
    }, [monthIdx])

    return (
        <div className={styles.calendarWrapper}>  
            <header className={styles.mainHeader}>
                <Header></Header>
                <Navigation></Navigation>
            </header>
            <main className={styles.mainWrapper}>
                <SideBar></SideBar>
                <div className={styles.monthWrapper}>
                    <Month month={month}></Month>
                </div>
                {popModal &&
                    <EventPopUp></EventPopUp>
                }

            </main>
        </div>
    )
}