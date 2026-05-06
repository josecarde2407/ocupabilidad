import StatusBadge from "../common/StatusBadge";

export default function OccupancyTable({
    data = [],
}) {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Sede</th>
                        <th>Familia</th>
                        <th>Pallets</th>
                        <th>Capacidad</th>
                        <th>Ocupación</th>
                        <th>Estado</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item.sede}
                            </td>

                            <td>
                                {item.familia}
                            </td>

                            <td>
                                {item.pallets}
                            </td>

                            <td>
                                {item.capacity}
                            </td>

                            <td>
                                {
                                    item.occupancy
                                }
                                %
                            </td>

                            <td>
                                <StatusBadge
                                    status={
                                        item.status
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}