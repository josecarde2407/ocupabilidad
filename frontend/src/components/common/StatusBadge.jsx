export default function StatusBadge({ status }) {

    const safeStatus = (status || "healthy").toLowerCase();

    return (
        <span className={`status-badge ${safeStatus}`}>
            {safeStatus}
        </span>
    );
}