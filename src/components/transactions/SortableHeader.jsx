function SortableHeader({
    label,
    column,
    sortColumn,
    sortDirection,
    onSort,
}) {

    let icon = "↕";

    if (sortColumn === column) {
        icon = sortDirection === "asc"
            ? "▲"
            : "▼";
    }

    return (
        <th
            className="sortable-header"
            onClick={() => onSort(column)}
        >
            {label} {icon}
        </th>
    );
}

export default SortableHeader;