import * as React from "react";
import {ChangeEvent} from "react";
import {StyledTable} from "./styled";
import {Search} from "./search";

export type IValue = any;

export interface IColumn {
    key: string;
    title: string;
    render?: (value: IValue) => IValue;
}

interface IProps {

    columns: IColumn[];
    data: { [key: string]: IValue }[];
    setPageSize: (value: number) => void
}
type SortOrderType="asc"| "desc"
export const Table = React.memo((props: IProps) => {
    const [page, setPage] = React.useState(1)
    // const [pageSize, setPageSize] = React.useState(10)
    const [sortProperty, setSortProperty] = React.useState("firstName")
    const [sortOrder, setSortOrder] = React.useState<SortOrderType>("asc")//desс
    const [searchValue, setSearchValue] = React.useState("")//desс
    const handleSort = (property: string) => {
        sortOrder === "asc" ? setSortOrder("desc") : setSortOrder("asc")
        setSortProperty(property)
    }
    return (
        <div>
            <Search onSearch={setSearchValue}/>
            <select onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setPageSize(+e.currentTarget.value)}>

                <option value="5">5</option>
                <option value="15">15</option>
                <option value="25">25</option>
            </select>
            <StyledTable>
                <thead>
                <tr>
                    {props.columns.map(column => (
                        <th onClick={() => handleSort(column.key)}>
                            {column.title}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {[...props.data]
                    .sort((a, b) => {
                        const aValue = a[sortProperty]
                        const bValue = b[sortProperty]
                        if (aValue === bValue) return 0
                        if (a[sortProperty] > b[sortProperty]) {
                            return sortOrder === "asc" ? 1 : -1
                        } else {
                            return sortOrder === "asc" ? -1 : -1

                        }
                    })
                    .filter(item => item["firstName"].indexOf(searchValue) > -1)
                    // .filter((item, index) => index > 10 && index > 21)
                    .map(item => (
                        <tr key={item.id}>
                            {props.columns.map(column => (
                                <td>
                                    {column.render
                                        ? column.render(item[column.key])
                                        : item[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </div>
    );
});
