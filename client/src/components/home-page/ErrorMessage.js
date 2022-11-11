import './AuthMessages.css';

export const ErrorMessage = ({message}) => {
    return (
        <div className="error">
            <h3>{message}</h3>
        </div>
    )
}