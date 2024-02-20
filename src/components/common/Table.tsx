import { Fragment } from "react";
import Text from "./Text";

interface TableProps {
    data: any[];
    config: {
        label: string;
        render: (data: any) => string | JSX.Element;
        header?: () => string | JSX.Element;
    }[];
    keyFn: (data: any) => string;
    className?: string;
}

function Table({ data, config, keyFn, ...rest }: TableProps) {
    const renderedHeaders = config.map((column) => {
        if (column.header) {
            return <Fragment key={column.label}>{column.header()}</Fragment>;
        }

        return (
            <th key={column.label} className="p-2 text-left">
                <Text primary bold>
                    {column.label}
                </Text>
            </th>
        );
    });

    const renderedRows = data.map((rowData) => {
        const renderedCells = config.map((column) => {
            return (
                <td className="p-2 text-left" key={column.label}>
                    <Text primary>{column.render(rowData)}</Text>
                </td>
            );
        });

        return (
            <tr className="border-b" key={keyFn(rowData)}>
                {renderedCells}
            </tr>
        );
    });

    return (
        <table className={`table-auto border-spacing-2 ` + rest.className}>
            <thead>
                <tr className="border-b-2">{renderedHeaders}</tr>
            </thead>
            <tbody>{renderedRows}</tbody>
        </table>
    );
}

export default Table;
