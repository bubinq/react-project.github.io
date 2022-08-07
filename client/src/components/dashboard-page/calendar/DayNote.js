export const DayNote = ({ goal }) => {
    return (
        <div className={goal.labelColor}>
            <span>{goal.goal}</span>
        </div>
    )
} 