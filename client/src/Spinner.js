import styles from './Spinner.module.css'

export const Spinner = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.span}>
                    <div className={styles.coffee_cup}></div>
                </div>
            </div>
        </>
    )
}