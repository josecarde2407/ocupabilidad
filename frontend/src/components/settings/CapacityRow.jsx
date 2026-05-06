export default function CapacityRow({ row, onChange }) {
    return (
        <tr>
            <td>{row.sede}</td>
            <td>{row.familia}</td>
            <td>
                <input
                    type="number"
                    value={row.capacity}
                    onChange={(e) => onChange(e.target.value)}
                />
            </td>
        </tr>
    );
}